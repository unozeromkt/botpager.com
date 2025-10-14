// src/components/home/home-sidebar-jotform.tsx
"use client";

import React from 'react';

interface HomeSidebarJotFormProps {
  iframeCode: string;
}

export const HomeSidebarJotForm = React.memo(function HomeSidebarJotForm({ iframeCode }: HomeSidebarJotFormProps) {
  // Removed auto-refresh to maintain bot state between section changes
  
  return (
    <div className="fixed right-0 top-0 h-screen w-[500px] bg-white border-l border-gray-200 z-40 overflow-hidden">
      {/* Contenedor del bot sin header */}
      <div className="h-full flex flex-col">
        <div 
          className="flex-1 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: iframeCode }}
        />
      </div>

      {/* Estilos específicos para el iframe de JotForm */}
      <style jsx>{`
        iframe {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
          max-width: none !important;
        }
        
        /* Aseguramos que el iframe ocupe todo el espacio disponible */
        div[dangerouslySetInnerHTML] iframe {
          min-height: 100vh !important;
        }
      `}</style>
    </div>
  );
});