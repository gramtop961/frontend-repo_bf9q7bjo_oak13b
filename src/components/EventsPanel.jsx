import { useEffect } from 'react'

function EventsPanel({ suspectId, events, onRefresh }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    if (!suspectId) return
    ;(async () => {
      const res = await fetch(`${baseUrl}/api/events/${suspectId}`)
      const data = await res.json()
      onRefresh?.(data.events || [])
    })()
  }, [suspectId])

  return (
    <section id="events" className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-zinc-900">Detections</h2>
        <p className="text-sm text-zinc-600 mt-1">Newest first</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {(events || []).map((e) => (
            <div key={e._id} className="border border-zinc-200 rounded-xl p-4 bg-white">
              <div className="text-xs text-zinc-500">{new Date(e.captured_at).toLocaleString()}</div>
              <div className="font-medium mt-1">{e.message}</div>
              <div className="text-sm text-zinc-600 mt-1">Confidence: {(e.confidence * 100).toFixed(1)}%</div>
              {e.media_url && (
                <a className="text-xs text-blue-600 mt-2 inline-block" href={e.media_url} target="_blank" rel="noreferrer">View media</a>
              )}
            </div>
          ))}
          {(!events || events.length === 0) && (
            <div className="text-sm text-zinc-500">No detections yet. Run a scan to populate this feed.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default EventsPanel
