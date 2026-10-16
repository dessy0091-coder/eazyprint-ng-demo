:root {
  font-family: Inter, 'Segoe UI', sans-serif;
  color: #e2e8f0;
  background: #020817;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --bg: #020817;
  --bg-soft: #0f172a;
  --card: rgba(15, 23, 42, 0.82);
  --card-alt: rgba(15, 23, 42, 0.95);
  --border: rgba(148, 163, 184, 0.18);
  --brand: #22c55e;
  --brand-strong: #16a34a;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --danger: #ef4444;
  --shadow: 0 20px 50px rgba(2, 8, 23, 0.55);
}

* { box-sizing: border-box; }
html, body, #root {
  margin: 0;
  min-height: 100%;
  min-width: 320px;
  background: radial-gradient(circle at top, rgba(34, 197, 94, 0.08), transparent 28%), #020817;
  color: var(--text);
}
body {
  min-height: 100vh;
}
button, input, select {
  font: inherit;
}
button {
  cursor: pointer;
}

.page-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, #020817 0%, #0f172a 100%);
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem clamp(1rem, 2vw, 2rem);
  border-bottom: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 20;
}
.brand-block {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.brand-mark {
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: 0.8rem;
  font-weight: 900;
  font-size: 1.2rem;
  color: #020617;
  background: linear-gradient(135deg, var(--brand), #4ade80, #86efac);
}
.brand-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.brand-row h1 {
  margin: 0;
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  letter-spacing: -0.05em;
}
.badge {
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: var(--brand);
  background: rgba(34, 197, 94, 0.08);
  border-radius: 0.5rem;
  padding: 0.15rem 0.4rem;
  font-size: 0.65rem;
  font-weight: 700;
}
.brand-block small {
  display: block;
  color: var(--muted);
  font-size: 0.72rem;
}
.workflow-switcher {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid var(--border);
  padding: 0.35rem;
  border-radius: 1rem;
}
.workflow-switcher button {
  border: none;
  background: transparent;
  color: var(--muted);
  border-radius: 0.8rem;
  padding: 0.75rem 1rem;
  font-size: 0.74rem;
  font-weight: 800;
}
.workflow-switcher .active {
  background: var(--brand);
  color: #020617;
  box-shadow: 0 8px 18px rgba(34, 197, 94, 0.35);
}
.main-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.25rem clamp(1rem, 2vw, 2rem) 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 1.6rem;
  box-shadow: var(--shadow);
}
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
}
.hero h2 {
  margin: 0.5rem 0 0.35rem;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.1;
}
.hero p {
  margin: 0;
  color: var(--muted);
  max-width: 42rem;
}
.pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(34, 197, 94, 0.28);
  background: rgba(34, 197, 94, 0.08);
  color: var(--brand);
  padding: 0.35rem 0.7rem;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 800;
}
.pill.success {
  background: rgba(34, 197, 94, 0.1);
}
.step-pills {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.step-pills span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.7rem;
  padding: 0.55rem 0.8rem;
  background: rgba(15, 23, 42, 0.8);
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 700;
}
.step-pills .active {
  background: var(--brand);
  color: #020617;
}
.booking-panel, .upload-panel, .pass-card, .kiosk-panel {
  padding: 1.5rem;
}
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.2rem;
}
.panel-header h3 {
  margin: 0 0 0.2rem;
  font-size: 1.08rem;
}
.panel-header p {
  margin: 0;
  color: var(--muted);
}
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.filter {
  border: none;
  border-radius: 0.7rem;
  background: rgba(15, 23, 42, 0.8);
  color: var(--text);
  padding: 0.52rem 0.8rem;
  font-size: 0.72rem;
  font-weight: 700;
}
.filter.active {
  background: var(--brand);
  color: #020617;
}
.location-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.location-card {
  width: 100%;
  text-align: left;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.68);
  color: var(--text);
  transition: 0.2s ease;
}
.location-card.selected {
  background: rgba(34, 197, 94, 0.09);
  border-color: rgba(34, 197, 94, 0.55);
}
.location-topline {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.location-topline strong {
  font-size: 0.87rem;
}
.location-topline span {
  font-size: 0.6rem;
  font-weight: 800;
  color: var(--brand);
  background: rgba(34, 197, 94, 0.12);
  border-radius: 0.4rem;
  padding: 0.2rem 0.35rem;
}
.location-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.72rem;
}
.upload-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.9fr);
  gap: 1.2rem;
}
.upload-box-wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.upload-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 220px;
  gap: 0.5rem;
  border: 2px dashed rgba(148, 163, 184, 0.35);
  background: rgba(2, 6, 23, 0.4);
  border-radius: 1.2rem;
  padding: 1.5rem;
  color: var(--text);
  cursor: pointer;
}
.upload-box input {
  display: none;
}
.upload-box i {
  font-size: 2.5rem;
  color: var(--brand);
}
.upload-box span {
  font-size: 0.8rem;
  font-weight: 800;
}
.upload-box small {
  color: var(--muted);
}
.file-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  color: var(--muted);
  font-size: 0.76rem;
  font-weight: 700;
}
.file-list-header button {
  border: 1px solid rgba(34, 197, 94, 0.34);
  background: rgba(34, 197, 94, 0.08);
  color: var(--brand);
  border-radius: 0.6rem;
  padding: 0.5rem 0.7rem;
  font-weight: 700;
}
.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.8rem;
  border-radius: 0.9rem;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.58);
}
.file-meta {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.file-meta i {
  color: var(--brand);
}
.file-meta div {
  display: flex;
  flex-direction: column;
}
.file-meta small {
  color: var(--muted);
}
.file-item button {
  border: none;
  background: transparent;
  color: var(--muted);
}
.settings-box {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid var(--border);
  border-radius: 1.1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.settings-box h4 {
  margin: 0;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.7rem;
}
.settings-box label {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  color: var(--muted);
  font-size: 0.75rem;
}
.settings-box select, .settings-box input, .kiosk-input-row input {
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(2, 6, 23, 0.85);
  color: var(--text);
  border-radius: 0.85rem;
  padding: 0.75rem 0.8rem;
}
.dual-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}
.range-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.range-control button {
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  border-radius: 0.7rem;
  background: rgba(15, 23, 42, 0.95);
  color: var(--text);
  font-size: 1.15rem;
}
.range-control input {
  text-align: center;
}
.price-summary {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
}
.price-summary strong {
  color: var(--brand);
  font-size: 1.6rem;
  font-family: 'SFMono-Regular', monospace;
}
.error-banner {
  background: rgba(239, 68, 68, 0.08);
  color: #fecaca;
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 0.8rem;
  padding: 0.8rem 1rem;
  font-size: 0.8rem;
}
.cta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}
.primary, .secondary, .link-btn {
  border: none;
  border-radius: 0.8rem;
  padding: 0.8rem 1.1rem;
  font-size: 0.8rem;
  font-weight: 800;
}
.primary {
  background: linear-gradient(135deg, var(--brand), #4ade80);
  color: #020617;
  box-shadow: 0 12px 28px rgba(34, 197, 94, 0.25);
}
.primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.secondary {
  background: rgba(15, 23, 42, 0.9);
  color: var(--text);
  border: 1px solid var(--border);
}
.full {
  width: 100%;
}
.pass-card {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
.pass-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
}
.pass-header h3 {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2.1rem);
}
.pass-body {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: minmax(150px, 200px) minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
}
.qr-box {
  display: grid;
  place-items: center;
  min-height: 180px;
  border-radius: 1rem;
  background: white;
  padding: 1rem;
}
.qr-box canvas {
  width: 120px !important;
  height: 120px !important;
}
.pin-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(2, 6, 23, 0.7);
  border: 1px solid var(--border);
}
.pin-box span {
  color: var(--muted);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.pin-box strong {
  font-family: 'SFMono-Regular', monospace;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  color: var(--brand);
}
.kiosk-page {
  display: flex;
  flex-direction: column;
}
.kiosk-topbar {
  justify-content: space-between;
}
.link-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}
.kiosk-wrap {
  min-height: calc(100vh - 94px);
  display: grid;
  place-items: center;
}
.kiosk-panel {
  width: min(100%, 760px);
}
.panel-header.center {
  justify-content: center;
  text-align: center;
}
.kiosk-input-row {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}
.kiosk-input-row input {
  flex: 1;
  font-size: 1rem;
}
.job-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.65);
}
.job-summary div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.job-summary span {
  color: var(--muted);
  font-size: 0.72rem;
}
.job-summary strong {
  font-size: 1.05rem;
}
.printing-box {
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  text-align: center;
}
.spinner {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 4px solid rgba(255,255,255,0.15);
  border-top: 4px solid var(--brand);
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.progress-track {
  width: min(100%, 420px);
  height: 0.8rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.9);
  overflow: hidden;
  border: 1px solid var(--border);
}
.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--brand), #34d399);
}
.success-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(34, 197, 94, 0.09);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: var(--text);
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
}
.success-box h4 {
  margin: 0;
  font-size: 1.2rem;
}
.success-box p, .success-box span {
  margin: 0;
  color: var(--muted);
}

@media (max-width: 800px) {
  .topbar,
  .hero,
  .panel-header,
  .cta-row,
  .kiosk-topbar {
    flex-direction: column;
    align-items: stretch;
  }
  .workflow-switcher {
    width: 100%;
  }
  .workflow-switcher button {
    flex: 1 1 100%;
  }
  .upload-layout,
  .pass-body,
  .job-summary,
  .dual-grid {
    grid-template-columns: 1fr;
  }
  .brand-row {
    justify-content: flex-start;
  }
  .cta-row {
    display: flex;
  }
  .cta-row button {
    width: 100%;
  }
}
