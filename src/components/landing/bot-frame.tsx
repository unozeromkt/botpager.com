"use client";

import Script from 'next/script';
import { Card } from "@/components/ui/card";

// Augment the window object
declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, host: string) => void;
  }
}

export function BotFrame() {
  return (
    <>
      <Script
        id="jotform-embed-handler"
        src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'
        onReady={() => {
          if (typeof window.jotformEmbedHandler === 'function') {
            window.jotformEmbedHandler("iframe[id='JotFormIFrame-01971cae816e73068d6b8e6f19ab11aa4dac']", "https://www.jotform.com");
          }
        }}
      />
      <Card className="overflow-hidden shadow-2xl rounded-xl w-full h-[688px] border-2 border-primary/20 bg-card">
        <iframe
          id="JotFormIFrame-01971cae816e73068d6b8e6f19ab11aa4dac"
          title="ISSA: Representante de ventas Online"
          onLoad={() => {
              if (typeof window !== 'undefined' && window.parent) {
                  window.parent.scrollTo(0, 0)
              }
            }
          }
          allowTransparency
          allow="geolocation; microphone; camera; fullscreen"
          src="https://agent.jotform.com/01971cae816e73068d6b8e6f19ab11aa4dac?embedMode=iframe&background=0&header=1&source=embed-next"
          frameBorder="0"
          style={{
            minWidth: '100%',
            height: '100%',
            border: 'none',
            width: '100%',
          }}
          scrolling="no"
        >
        </iframe>
      </Card>
    </>
  );
}
