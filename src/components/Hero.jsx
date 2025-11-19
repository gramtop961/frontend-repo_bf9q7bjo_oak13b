import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-b from-zinc-50 to-zinc-100">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/M4yE7MTeWshitQbr/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
        <span className="inline-flex items-center rounded-full bg-black/80 text-white px-3 py-1 text-xs tracking-wider uppercase mb-4">Netra • OSINT Suite</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 tracking-tight max-w-3xl">
          AI-Driven Fugitive Localization & Digital Footprint Scanner
        </h1>
        <p className="mt-4 text-zinc-700 max-w-2xl">
          Upload a suspect photo and let the Digital Dragnet scan public social posts, open cameras, and image metadata.
          See live detections on a unified map, and simulate telecom triangulation — all in one dashboard.
        </p>
        <div className="mt-8 flex gap-3">
          <a href="#uploader" className="rounded-lg bg-black text-white px-5 py-3 text-sm font-medium shadow hover:bg-zinc-800 transition-colors">Get Started</a>
          <a href="#demo" className="rounded-lg bg-white text-black px-5 py-3 text-sm font-medium shadow border border-zinc-200 hover:bg-zinc-50 transition-colors">View Demo</a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 to-transparent"></div>
    </section>
  )
}

export default Hero
