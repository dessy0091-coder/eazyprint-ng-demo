import React, { useMemo, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

const locations = [
  { id: 'loc-1', name: 'UNILAG Library Hub', category: 'uni', detail: 'Main Library Entrance, Yaba, Lagos' },
  { id: 'loc-2', name: 'OAU Senate Building', category: 'uni', detail: 'Ground Floor Foyer, Ile-Ife' },
  { id: 'loc-3', name: 'UI Kenneth Dike Library', category: 'uni', detail: 'University of Ibadan, Ibadan' },
  { id: 'loc-4', name: 'MMA2 Departure Lounge Kiosk 1', category: 'airport', detail: 'Murtala Muhammed Airport 2, Ikeja, Lagos' },
  { id: 'loc-5', name: 'Abuja Airport Gate 3', category: 'airport', detail: 'Nnamdi Azikiwe Int\'l Airport, Abuja' },
  { id: 'loc-6', name: 'Transcorp Hilton Lobby', category: 'hotel', detail: 'Congress Hall Entrance, Maitama, Abuja' },
  { id: 'loc-7', name: 'Eko Hotels Business Wing', category: 'hotel', detail: 'Main Lobby, Victoria Island, Lagos' },
];

const defaultFiles = [
  { name: 'GST102_Assignment_Final.pdf', pages: 10 },
  { name: 'Research_Paper_Outline.pdf', pages: 8 }
];

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [files, setFiles] = useState<any[]>(defaultFiles);
  const [color, setColor] = useState('bw');
  const [size, setSize] = useState('a4');
  const [copies, setCopies] = useState(1);
  const [creating, setCreating] = useState(false);
  const [job, setJob] = useState<any | null>(null);
  const [error, setError] = useState('');

  const totalPages = useMemo(
    () => files.reduce((sum, file) => sum + (file.pages || 1), 0) || 1,
    [files]
  );

  const totalAmount = useMemo(() => {
    let rate = color === 'color' ? 200 : 50;
    if (size === 'a3') rate += 100;
    const serviceFee = 50;
    return totalPages * rate * copies + serviceFee;
  }, [color, copies, size, totalPages]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const form = new FormData();
      form.append('file', file);
      const res = await axios.post(`${API_BASE}/upload`, form);
      setFiles((prev) => [...prev, { name: file.name, pages: res.data.pages || 1, url: res.data.url }]);
      setError('');
    } catch (err) {
      setError('Upload failed. Please try again.');
    }
  };

  const handleCreateJob = async () => {
    try {
      setCreating(true);
      setError('');
      const response = await axios.post(`${API_BASE}/jobs`, {
        files,
        location: selectedLocation.name,
        copies,
        color,
        size,
      });
      setJob(response.data);
      localStorage.setItem('eazyprint-pass', JSON.stringify(response.data));
    } catch (err) {
      setError('Unable to create job right now. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const simulatePayment = async () => {
    if (!job) return;
    await axios.post(`${API_BASE}/payments/simulate`, { jobId: job.jobId });
    alert('Payment successful. Kiosk can now print your job.');
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">E</div>
          <div>
            <div className="brand-row">
              <h1>EazyPrint</h1>
              <span className="badge">NG 🇳🇬</span>
            </div>
            <small>Self-Service Cloud & On-Site Printing</small>
          </div>
        </div>

        <nav className="workflow-switcher" aria-label="Workflow switcher">
          <button className="active" type="button">Workflow 1: Pre-Order Away</button>
          <button type="button" onClick={() => (window.location.href = '/kiosk')}>Workflow 2: On-Site QR Scan</button>
        </nav>
      </header>

      <main className="main-wrap">
        <section className="hero card">
          <div>
            <span className="pill">Workflow 1: Remote Pre-Order</span>
            <h2>Prepare &amp; Pay Before You Reach the Kiosk</h2>
            <p>Choose your kiosk in Nigeria, upload files, pay online, and release print on arrival.</p>
          </div>
          <div className="step-pills" aria-label="Workflow stages">
            <span className="active">1. Venue</span>
            <span>2. File &amp; Print</span>
            <span>3. Pay &amp; Pass</span>
          </div>
        </section>

        <section className="card booking-panel">
          <div className="panel-header">
            <div>
              <h3>Step 1: Choose Pickup Kiosk</h3>
              <p>Select where you will collect your printout.</p>
            </div>
            <div className="filter-row">
              <button type="button" className="filter active">All</button>
              <button type="button" className="filter">🎓 Universities</button>
              <button type="button" className="filter">✈️ Airports</button>
              <button type="button" className="filter">🏨 Hotels</button>
            </div>
          </div>

          <div className="location-grid">
            {locations.map((location) => (
              <button
                key={location.id}
                type="button"
                className={`location-card ${selectedLocation.id === location.id ? 'selected' : ''}`}
                onClick={() => setSelectedLocation(location)}
              >
                <div className="location-topline">
                  <strong>{location.name}</strong>
                  <span>ONLINE</span>
                </div>
                <p>{location.detail}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="card upload-panel">
          <div className="panel-header">
            <div>
              <h3>Step 2: Upload Documents &amp; Customise Print Options</h3>
              <p>Targeting: <strong>{selectedLocation.name}</strong></p>
            </div>
          </div>

          <div className="upload-layout">
            <div className="upload-box-wrap">
              <label className="upload-box" htmlFor="file-upload">
                <input id="file-upload" type="file" onChange={handleUpload} />
                <i className="fa-solid fa-file-pdf" />
                <span>Click or drag documents here</span>
                <small>PDF, DOCX, JPG, PNG up to 50MB</small>
              </label>

              <div className="file-list-header">
                <span>Uploaded Files</span>
                <button type="button" onClick={() => setFiles((prev) => [...prev, { name: `Sample_Assignment_${prev.length + 1}.pdf`, pages: 5 }])}>+ Add Sample Assignment</button>
              </div>

              <div className="file-list">
                {files.map((file, idx) => (
                  <div className="file-item" key={`${file.name}-${idx}`}>
                    <div className="file-meta">
                      <i className="fa-solid fa-file-pdf" />
                      <div>
                        <strong>{file.name}</strong>
                        <small>{file.pages || 1} pages</small>
                      </div>
                    </div>
                    <button type="button" onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}>Remove</button>
                  </div>
                ))}
              </div>
            </div>

            <aside className="settings-box">
              <h4>Print Configuration</h4>

              <label>
                <span>Color Mode</span>
                <select value={color} onChange={(event) => setColor(event.target.value)}>
                  <option value="bw">Black &amp; White (₦50 / pg)</option>
                  <option value="color">Full Color (₦200 / pg)</option>
                </select>
              </label>

              <div className="dual-grid">
                <label>
                  <span>Print Sides</span>
                  <select value="double">
                    <option value="double">Double Sided</option>
                    <option value="single">Single Sided</option>
                  </select>
                </label>

                <label>
                  <span>Paper Size</span>
                  <select value={size} onChange={(event) => setSize(event.target.value)}>
                    <option value="a4">A4 Standard</option>
                    <option value="a3">A3 Poster (+₦100)</option>
                  </select>
                </label>
              </div>

              <label>
                <span>Copies</span>
                <div className="range-control">
                  <button type="button" onClick={() => setCopies((prev) => Math.max(1, prev - 1))}>-</button>
                  <input type="number" value={copies} readOnly />
                  <button type="button" onClick={() => setCopies((prev) => prev + 1)}>+</button>
                </div>
              </label>

              <div className="price-summary">
                <span>Total Payable</span>
                <strong>₦{totalAmount.toFixed(2)}</strong>
              </div>
            </aside>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <div className="cta-row">
            <button type="button" className="secondary">Back</button>
            <button type="button" className="primary" onClick={handleCreateJob} disabled={creating}>
              {creating ? 'Creating...' : 'Proceed to Online Payment'}
            </button>
          </div>
        </section>

        {job && (
          <section className="card pass-card">
            <div className="pass-header">
              <span className="pill success">PASS READY</span>
              <h3>Your EazyPrint Digital Pass</h3>
            </div>

            <div className="pass-body">
              <div className="qr-box">
                <canvas id="qr-canvas" width="120" height="120" />
              </div>
              <div className="pin-box">
                <span>Manual Keypad PIN</span>
                <strong>{job.pin}</strong>
              </div>
            </div>

            <button type="button" className="primary full" onClick={simulatePayment}>Simulate Successful Payment</button>
          </section>
        )}
      </main>
    </div>
  );
}
