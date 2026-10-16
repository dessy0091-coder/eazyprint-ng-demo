import React, { useState } from 'react'
import axios from 'axios'
import QRCode from 'qrcode'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export default function Home() {
  const [files, setFiles] = useState<any[]>([])
  const [location, setLocation] = useState('UNILAG Library Hub')
  const [pin, setPin] = useState('')
  const [job, setJob] = useState<any>(null)

  const handleFile = async (e: any) => {
    const f = e.target.files[0]
    if (!f) return
    const form = new FormData()
    form.append('file', f)
    const r = await axios.post(`${API_BASE}/upload`, form)
    setFiles((s) => [...s, r.data])
  }

  const createJob = async () => {
    const r = await axios.post(`${API_BASE}/jobs`, { files, location, copies: 1 })
    setJob(r.data)
    setPin(r.data.pin)
  }

  const simulatePay = async () => {
    if (!job) return
    await axios.post(`${API_BASE}/payments/simulate`, { jobId: job.jobId })
    alert('Payment simulated. You can now open kiosk and print.')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>EazyPrint Demo (Responsive)</h1>
      <p>Upload a file, create a job, simulate payment, then open /kiosk to print using PIN.</p>

      <div style={{ marginTop: 20 }}>
        <label>Choose file</label><br />
        <input type="file" onChange={handleFile} />
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={createJob} disabled={files.length===0}>Create Print Job</button>
        <button onClick={simulatePay} style={{ marginLeft: 8 }} disabled={!job}>Simulate Pay</button>
      </div>

      {job && (
        <div style={{ marginTop: 20 }}>
          <h3>Job</h3>
          <div>PIN: <strong>{job.pin}</strong></div>
          <div>Amount: <strong>₦{job.amount}</strong></div>
        </div>
      )}
    </div>
  )
}
