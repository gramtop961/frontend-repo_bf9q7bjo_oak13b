import { useState } from 'react'

function ControlBar({ suspectId, onScanSocial, onScanCameras, onTriangulate, lastStatus }) {
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const call = async (path, body) => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      return data
    } finally {
      setLoading(false)
    }
  }

  const handleSocial = async () => {
    if (!suspectId) return
    const data = await call('/api/scan/social', { suspect_id: suspectId })
    onScanSocial?.(data)
  }

  const handleCameras = async () => {
    if (!suspectId) return
    const data = await call('/api/scan/cameras', { suspect_id: suspectId })
    onScanCameras?.(data)
  }

  const handleTriangulate = async () => {
    if (!suspectId) return
    // Demo with three simulated nodes around Connaught Place
    const payload = {
      nodes: [
        { name: 'Node A', latitude: 28.6315, longitude: 77.2167, radius_m: 800 },
        { name: 'Node B', latitude: 28.6322, longitude: 77.2202, radius_m: 600 },
        { name: 'Node C', latitude: 28.6290, longitude: 77.2185, radius_m: 700 }
      ]
    }
    const data = await call('/api/triangulate', payload)
    onTriangulate?.(data)
  }

  return (
    <section className="bg-white/70 backdrop-blur border-y border-zinc-200 sticky top-0 z-20">
      <div className="mx-auto max-w-5xl px-6 py-4 flex flex-wrap items-center gap-3">
        <button onClick={handleSocial} disabled={!suspectId || loading} className="px-4 py-2 rounded-lg bg-black text-white text-sm disabled:opacity-50">Scan Social</button>
        <button onClick={handleCameras} disabled={!suspectId || loading} className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm disabled:opacity-50">Scan Public Cams</button>
        <button onClick={handleTriangulate} disabled={!suspectId || loading} className="px-4 py-2 rounded-lg bg-white border border-zinc-300 text-sm disabled:opacity-50">Simulate Telecom</button>
        <span className="text-xs text-zinc-600 ml-auto">{lastStatus}</span>
      </div>
    </section>
  )
}

export default ControlBar
