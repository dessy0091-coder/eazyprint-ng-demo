import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOAD_DIR));

type JobRecord = {
  id: string;
  pin: string;
  location: string;
  amount: number;
  pages: number;
  status: 'created' | 'paid' | 'printed';
  createdAt: string;
  paidAt?: string;
  printedAt?: string;
};

const jobs: JobRecord[] = [];

let dbPool: Pool | null = null;

if (process.env.DATABASE_URL) {
  dbPool = new Pool({ connectionString: process.env.DATABASE_URL });

  dbPool.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id UUID PRIMARY KEY,
      pin VARCHAR(20) UNIQUE NOT NULL,
      location VARCHAR(255) NOT NULL,
      amount INTEGER NOT NULL,
      pages INTEGER NOT NULL,
      status VARCHAR(32) NOT NULL DEFAULT 'created',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      paid_at TIMESTAMPTZ,
      printed_at TIMESTAMPTZ
    );
  `).catch((error) => {
    console.warn('Database init failed, using in-memory fallback:', error.message);
    dbPool = null;
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

function generatePin() {
  return `EZ-${Math.floor(1000 + Math.random() * 9000)}`;
}

async function saveJob(job: JobRecord) {
  if (dbPool) {
    await dbPool.query(
      `INSERT INTO jobs (id, pin, location, amount, pages, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [job.id, job.pin, job.location, job.amount, job.pages, job.status, new Date(job.createdAt)]
    );
    return;
  }
  jobs.push(job);
}

async function findJobByPin(pin: string) {
  if (dbPool) {
    const result = await dbPool.query(
      `SELECT id, pin, location, amount, pages, status FROM jobs WHERE pin = $1`,
      [pin]
    );
    if (result.rowCount === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      pin: row.pin,
      location: row.location,
      amount: Number(row.amount),
      pages: Number(row.pages),
      status: row.status,
    };
  }

  return jobs.find((item) => item.pin === pin) || null;
}

async function markPaid(jobId: string) {
  if (dbPool) {
    await dbPool.query('UPDATE jobs SET status = $1, paid_at = NOW() WHERE id = $2', ['paid', jobId]);
    return;
  }

  const job = jobs.find((item) => item.id === jobId);
  if (job) {
    job.status = 'paid';
    job.paidAt = new Date().toISOString();
  }
}

async function markPrinted(jobId: string) {
  if (dbPool) {
    await dbPool.query('UPDATE jobs SET status = $1, printed_at = NOW() WHERE id = $2', ['printed', jobId]);
    return;
  }

  const job = jobs.find((item) => item.id === jobId);
  if (job) {
    job.status = 'printed';
    job.printedAt = new Date().toISOString();
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mode: dbPool ? 'database' : 'memory' });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const estimatedPages = Math.max(1, Math.min(12, Math.floor(Math.random() * 9) + 2));
  return res.json({
    fileId: uuidv4(),
    name: req.file.originalname,
    url: `/uploads/${req.file.filename}`,
    pages: estimatedPages,
  });
});

app.post('/api/jobs', async (req, res) => {
  const { files = [], location = 'UNILAG Library Hub', copies = 1, color = 'bw', size = 'a4' } = req.body;

  const totalPages = files.reduce((sum: number, file: any) => sum + (Number(file.pages) || 1), 0) || 1;
  let rate = color === 'color' ? 200 : 50;
  if (size === 'a3') rate += 100;
  const amount = totalPages * rate * Number(copies) + 50;
  const pin = generatePin();

  const job: JobRecord = {
    id: uuidv4(),
    pin,
    location,
    amount,
    pages: totalPages,
    status: 'created',
    createdAt: new Date().toISOString(),
  };

  await saveJob(job);

  return res.json({
    jobId: job.id,
    pin: job.pin,
    amount,
    location,
    pages: totalPages,
    status: job.status,
  });
});

app.get('/api/jobs/pin/:pin', async (req, res) => {
  const job = await findJobByPin(req.params.pin);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  return res.json(job);
});

app.post('/api/jobs/:id/print', async (req, res) => {
  await markPrinted(req.params.id);
  return res.json({ ok: true });
});

app.post('/api/payments/simulate', async (req, res) => {
  const { jobId } = req.body;
  if (!jobId) {
    return res.status(400).json({ error: 'jobId required' });
  }

  await markPaid(jobId);
  return res.json({ ok: true, message: 'Payment successful' });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`EazyPrint API running on http://localhost:${port}`);
});
