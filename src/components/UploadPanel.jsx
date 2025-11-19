import { useState } from 'react'

function UploadPanel({ onUpload }) {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
      setPreview(reader.result)
      onUpload?.(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <section id="uploader" className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-zinc-900">1) Upload suspect photo</h2>
        <p className="text-sm text-zinc-600 mt-1">This image stays in your session and is used to simulate face matching on public sources.</p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <label className="md:col-span-2 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-zinc-200 rounded-xl p-8 hover:border-zinc-300 transition-colors cursor-pointer">
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            <span className="text-zinc-700">Click to choose a photo (JPG/PNG)</span>
            <span className="text-xs text-zinc-500">We will also parse EXIF GPS if present</span>
          </label>
          <div className="aspect-video bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-zinc-400 text-sm">Preview</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UploadPanel
