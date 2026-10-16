import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://eazyprint:eazyprint@localhost:5432/eazyprintdb' });

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id uuid PRIMARY KEY,
      pin varchar(16) UNIQUE NOT NULL,
      location varchar(255),
      amount integer,
      pages integer,
      status varchar(32) DEFAULT 'created',
      created_at timestamptz DEFAULT now(),
      paid_at timestamptz,
      printed_at timestamptz
    );
  `);
}

initDb().catch((e) => console.error('DB init error', e));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOAD_DIR));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const unique = `${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`;
    cb(null, unique);
  }
});
const upload = multer({ storage });

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Missing file' });
  // naive pages estimate: random for demo
  const pages = Math.max(1, Math.floor(Math.random() * 6));
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, pages, filename: req.file.originalname });
});

app.post('/api/jobs', async (req, res) => {
  const { files, location, copies = 1, color = 'bw', size = 'a4' } = req.body;
  const totalPages = (files || []).reduce((s: number, f: any) => s + (f.pages||1), 0) || 1;
  let rate = color === 'color' ? 200 : 50;
  if (size === 'a3') rate += 100;
  const serviceFee = 50;
  const amount = totalPages * rate * copies + serviceFee;

  const id = uuidv4();
  const pin = 'EZ-' + Math.floor(1000 + Math.random() * 9000);

  await pool.query('INSERT INTO jobs(id, pin, location, amount, pages, status) VALUES($1,$2,$3,$4,$5,$6)', [id, pin, location, amount, totalPages, 'created']);

  res.json({ jobId: id, pin, amount, pages: totalPages });
});

app.get('/api/jobs/pin/:pin', async (req, res) => {
  const pin = req.params.pin;
  const r = await pool.query('SELECT id, pin, location, amount, pages, status FROM jobs WHERE pin=$1', [pin]);
  if (r.rowCount === 0) return res.status(404).json({ error: 'Not found' });
  res.json(r.rows[0]);
});

app.post('/api/jobs/:id/print', async (req, res) => {
  const id = req.params.id;
  await pool.query('UPDATE jobs SET status=$1, printed_at=now() WHERE id=$2', ['printed', id]);
  res.json({ ok: true });
});

app.post('/api/payments/simulate', async (req, res) => {
  const { jobId } = req.body;
  await pool.query('UPDATE jobs SET status=$1, paid_at=now() WHERE id=$2', ['paid', jobId]);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
