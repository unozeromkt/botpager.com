// src/app/form/page.tsx
"use client"

import { useEffect } from 'react'

// Declaración de tipos para el window global
declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, url: string) => void
  }
}

export default function FormPage() {
  useEffect(() => {
    // Cargar el script de JotForm después de que el componente se monte
    const script = document.createElement('script')
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'
    script.onload = () => {
      // Inicializar el handler de JotForm
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler("iframe[id='JotFormIFrame-252655299961674']", "https://form.jotform.com/")
      }
    }
    document.body.appendChild(script)

    return () => {
      // Limpiar el script cuando el componente se desmonte
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleIframeLoad = () => {
    if (window.parent) {
      window.parent.scrollTo(0, 0)
    }
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <iframe
        id="JotFormIFrame-252655299961674"
        title="BotPager - Flujo Inicial"
        onLoad={handleIframeLoad}
        allow="geolocation; microphone; camera; fullscreen; payment"
        src="https://form.jotform.com/252655299961674"
        style={{ minWidth: '100%', maxWidth: '100%', height: '100%', border: 'none' }}
        scrolling="no"
      />
    </div>
  )
}
