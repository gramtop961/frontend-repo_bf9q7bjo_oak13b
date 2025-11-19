import { useEffect, useRef } from 'react'

// Lightweight Leaflet-like map using MapLibre GL JS would require deps.
// To keep zero extra deps, we embed a map with Mapbox Static style via iframe using OpenStreetMap tiles through Leaflet CDN demo.
// For richer maps, we can add MapLibre later.

function MapPanel({ markers = [], center = { lat: 28.6315, lng: 77.2167 } }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    // The embedded mini map uses leaflet playground with URL parameters for markers
    // Build marker query string: lat,lng;lat,lng ...
    const params = new URLSearchParams()
    const m = markers.slice(0, 20).map(p => `${p.latitude},${p.longitude}`).join(';')
    if (m) params.set('markers', m)
    params.set('center', `${center.lat},${center.lng}`)
    params.set('zoom', '12')
    const url = `https://leaflet-extras.github.io/leaflet-providers/preview/#${encodeURIComponent(params.toString())}`
    if (iframeRef.current) {
      iframeRef.current.src = url
    }
  }, [markers, center])

  return (
    <section id="map" className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-zinc-900">Live Map</h2>
        <p className="text-sm text-zinc-600 mt-1">Detections and simulated triangulation appear here.</p>
        <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
          <iframe ref={iframeRef} title="Map" className="w-full h-full" src="about:blank" />
        </div>
      </div>
    </section>
  )
}

export default MapPanel
