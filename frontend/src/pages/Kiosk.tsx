import React, { useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export default function Kiosk() {
  const [pin, setPin] = useState('EZ-')
  const [job, setJob] = useState<any>(null)
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)

  const fetchJob = async () => {
    try {
      const r = await axios.get(`${API_BASE}/jobs/pin/${pin}`)
      setJob(r.data)
      setStatus('ready')
    } catch (e) {
      alert('Job not found')
    }
  }

  const startPrinting = async () => {
    if (!job) return
    setStatus('printing')
    const pages = job.pages || 1
    let p = 0
    const iv = setInterval(() => {
      p++
      setProgress(Math.min(100, Math.round((p/pages)*100)))
      if (p>=pages) {
        clearInterval(iv)
        axios.post(`${API_BASE}/jobs/${job.id}/print`)
        setStatus('done')
      }
    }, 500)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Kiosk Simulator</h1>
      <div>
        <input value={pin} onChange={e=>setPin(e.target.value)} />
        <button onClick={fetchJob}>Fetch Job</button>
      </div>

      {status==='ready' && job && (
        <div style={{ marginTop: 20 }}>
          <div>Job PIN: {job.pin}</div>
          <div>Location: {job.location}</div>
          <div>Pages: {job.pages}</div>
          <div>Amount: ₦{job.amount}</div>
          <button onClick={startPrinting}>Start Printing</button>
        </div>
      )}

      {status==='printing' && (
        <div style={{ marginTop: 20 }}>
          <div>Printing... {progress}%</div>
          <div style={{ width: 200, height: 10, background:'#ddd', marginTop:6 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#22c55e' }} />
          </div>
        </div>
      )}

      {status==='done' && (
        <div style={{ marginTop: 20 }}>
          <h3>Printed!</h3>
          <div>Receipt: {job.pin} • ₦{job.amount}</div>
        </div>
      )}
    </div>
  )
}
