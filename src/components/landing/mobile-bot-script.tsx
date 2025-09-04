// src/components/landing/mobile-bot-script.tsx
"use client";

import { useEffect } from 'react';

export function MobileBotScript() {
  useEffect(() => {
    const scriptId = 'jotform-agent-embed';
    
    // Evita duplicar el script si ya existe
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/01989fe94cf47b0a8a67e225e6a31e7a1f07/embed.js';
    script.async = true;

    document.body.appendChild(script);

    // Función de limpieza para eliminar el script cuando el componente se desmonte
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      // Jotform también puede añadir otros elementos, como un div, que debemos limpiar
      const jotformContainer = document.querySelector('.jt-feedback-container');
      if (jotformContainer) {
        jotformContainer.remove();
      }
    };
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  return null; // Este componente no renderiza nada en el DOM
}
