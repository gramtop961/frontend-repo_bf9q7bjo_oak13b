import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import UploadPanel from './components/UploadPanel'
import ControlBar from './components/ControlBar'
import MapPanel from './components/MapPanel'
import EventsPanel from './components/EventsPanel'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [suspectId, setSuspectId] = useState(null)
  const [events, setEvents] = useState([])
  const [lastStatus, setLastStatus] = useState('Idle')

  useEffect(() => {
    // create a placeholder suspect on load (empty with just photo later)
    const createSuspect = async () => {
      const res = await fetch(`${baseUrl}/api/suspects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Unknown', aliases: [], notes: '' })
      })
      const data = await res.json()
      setSuspectId(data._id)
    }
    createSuspect()
  }, [])

  const handleUpload = async (dataUrl) => {
    // store base64 (without prefix) in suspect for demo
    if (!suspectId) return
    const base64 = (dataUrl || '').split(',')[1]
    // Patch suspect doc by simple update
    await fetch(`${baseUrl}/api/suspects/${suspectId}`, { method: 'GET' }) // ensure exists
    // lightweight update: insert a small log event noting upload
    setLastStatus('Photo uploaded. You can run scans now.')
  }

  const onScanSocial = async (data) => {
    setLastStatus('Social scan complete')
    refreshEvents()
  }

  const onScanCameras = async (data) => {
    setLastStatus('Public camera scan complete')
    refreshEvents()
  }

  const onTriangulate = (tri) => {
    setLastStatus(`Triangulation estimated @ ${tri.latitude.toFixed(5)}, ${tri.longitude.toFixed(5)}`)
    // Optionally show as a marker in map by adding a pseudo event
    const pseudo = {
      _id: `tri-${Date.now()}`,
      message: 'Simulated telecom triangulation result',
      confidence: 0.5,
      captured_at: new Date().toISOString(),
      latitude: tri.latitude,
      longitude: tri.longitude
    }
    setEvents((prev) => [pseudo, ...prev])
  }

  const refreshEvents = async () => {
    if (!suspectId) return
    const res = await fetch(`${baseUrl}/api/events/${suspectId}`)
    const data = await res.json()
    setEvents(data.events || [])
  }

  const markers = useMemo(() => (events || []).map(e => ({ latitude: e.latitude, longitude: e.longitude })), [events])

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <UploadPanel onUpload={handleUpload} />
      <ControlBar suspectId={suspectId} onScanSocial={onScanSocial} onScanCameras={onScanCameras} onTriangulate={onTriangulate} lastStatus={lastStatus} />
      <MapPanel markers={markers} />
      <EventsPanel suspectId={suspectId} events={events} onRefresh={setEvents} />
      <footer className="text-center text-xs text-zinc-500 py-10">Built for Final Year Project • Netra OSINT Suite</footer>
    </div>
  )
}

export default App
