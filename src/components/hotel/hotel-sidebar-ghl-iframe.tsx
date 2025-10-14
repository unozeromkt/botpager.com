// src/components/hotel/hotel-sidebar-ghl-iframe.tsx
"use client";

import { useEffect, useRef, useState } from 'react';

interface HotelSidebarGHLIframeProps {
  widgetId: string;
  locationId?: string;
  className?: string;
}

export function HotelSidebarGHLIframe({ widgetId, locationId = "t8gRxt7gwc25cXQi8kYp", className = "" }: HotelSidebarGHLIframeProps) {
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [alternativeUrls, setAlternativeUrls] = useState<string[]>([]);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('Preparando iframe...');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Try multiple possible GHL iframe URLs
    const possibleUrls = [
      // URL 1: Standard widget embed
      `https://widgets.leadconnectorhq.com/chat-widget?location_id=${locationId}&widget_id=${widgetId}&embedded=true&fullscreen=true&hide_launcher=true&auto_open=true`,
      
      // URL 2: msgsndr domain (GHL's main domain)
      `https://msgsndr.com/widget/form/${widgetId}?embedded=true&location_id=${locationId}&fullscreen=true`,
      
      // URL 3: Direct chat widget path
      `https://widgets.leadconnectorhq.com/chat-widget/${widgetId}?location_id=${locationId}&embedded=true&auto_open=true`,
      
      // URL 4: Alternative pattern
      `https://leadconnectorhq.com/widget/form/${widgetId}?location_id=${locationId}&embedded=true&hide_launcher=true`,
      
      // URL 5: Simplified approach
      `https://widgets.leadconnectorhq.com/chat?widget=${widgetId}&location=${locationId}&embedded=1`
    ];
    
    setAlternativeUrls(possibleUrls);
    setIframeUrl(possibleUrls[0]);
    setLoadingStatus('Intentando URL principal de GHL...');
  }, [widgetId, locationId]);

  const tryNextUrl = () => {
    if (currentUrlIndex < alternativeUrls.length - 1) {
      const nextIndex = currentUrlIndex + 1;
      setCurrentUrlIndex(nextIndex);
      setIframeUrl(alternativeUrls[nextIndex]);
      setLoadingStatus(`Probando URL alternativa ${nextIndex + 1}/${alternativeUrls.length}...`);
      console.log(`Trying alternative GHL URL ${nextIndex + 1}:`, alternativeUrls[nextIndex]);
    } else {
      setLoadingStatus('Todas las URLs fallaron - verifica configuración de GHL');
    }
  };

  const handleIframeLoad = () => {
    setLoadingStatus('Widget cargado exitosamente!');
    if (iframeRef.current) {
      try {
        // Try to send a message to the iframe to force it open
        const iframe = iframeRef.current;
        iframe.contentWindow?.postMessage({ action: 'openChat', embedded: true }, '*');
      } catch (error) {
        console.log('Cannot communicate with iframe due to cross-origin restrictions');
      }
    }
  };

  const handleIframeError = () => {
    console.error(`GHL iframe failed to load URL ${currentUrlIndex + 1}:`, iframeUrl);
    setLoadingStatus(`Error en URL ${currentUrlIndex + 1}, probando siguiente...`);
    setTimeout(tryNextUrl, 2000);
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className={`hidden lg:block fixed right-0 top-0 h-screen w-[525px] bg-background border-l border-border z-50 ${className}`}>
      <div className="h-full w-full relative overflow-hidden">
        {/* Header for the chat widget */}
        <div className="bg-primary text-primary-foreground p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Asistente del Hotel</h3>
              <p className="text-sm opacity-90">¿En qué podemos ayudarte?</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground px-3 py-1 rounded text-xs transition-colors"
                title="Recargar chat"
              >
                ↻
              </button>
              <div className="bg-primary-foreground/20 text-primary-foreground px-2 py-1 rounded text-xs">
                Iframe
              </div>
            </div>
          </div>
        </div>
        
        {/* Iframe container */}
        <div 
          className="h-full w-full relative bg-white"
          style={{
            height: 'calc(100% - 88px)', // Subtract header height
          }}
        >
          {iframeUrl ? (
            <iframe
              ref={iframeRef}
              src={iframeUrl}
              title="Go High Level Chat Widget"
              className="w-full h-full border-none"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              allow="microphone; camera; geolocation"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'white'
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-xs">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground font-medium">{loadingStatus}</p>
                <div className="mt-4 p-3 bg-muted rounded-lg text-left">
                  <p className="text-xs text-muted-foreground mb-2">
                    <strong>URL {currentUrlIndex + 1}/{alternativeUrls.length}:</strong> 
                  </p>
                  <p className="text-xs text-muted-foreground break-all">
                    {iframeUrl}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Widget:</strong> {widgetId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Location:</strong> {locationId}
                  </p>
                  {currentUrlIndex < alternativeUrls.length - 1 && (
                    <button
                      onClick={tryNextUrl}
                      className="mt-3 bg-primary text-primary-foreground px-3 py-1 rounded text-xs hover:bg-primary/90 transition-colors"
                    >
                      Probar Siguiente URL
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}