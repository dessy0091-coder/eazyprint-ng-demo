import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './src/pages/Home'
import Kiosk from './src/pages/Kiosk'

import './src/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kiosk" element={<Kiosk />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
