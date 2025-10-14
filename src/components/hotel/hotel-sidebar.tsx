// src/components/hotel/hotel-sidebar.tsx
"use client";

import { useEffect } from 'react';

function parseIframe(iframeString: string): { props: Record<string, string> } {
  const props: Record<string, string> = {};
  
  // Extract all attributes using regex
  const attributeRegex = /(\w+)="([^"]*)"/g;
  let match;
  
  while ((match = attributeRegex.exec(iframeString)) !== null) {
    const [, key, value] = match;
    props[key] = value;
  }
  
  return { props };
}

interface HotelSidebarProps {
  iframeCode: string;
}

export function HotelSidebar({ iframeCode }: HotelSidebarProps) {
  useEffect(() => {
    // Load JotForm embed handler script if not already loaded
    if (!document.querySelector('script[src*="for-form-embed-handler.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
      script.onload = () => {
        // Initialize JotForm handler after script loads
        if (window.jotformEmbedHandler) {
          const { props } = parseIframe(iframeCode);
          if (props.id) {
            window.jotformEmbedHandler(`iframe[id='${props.id}']`, "https://agent.jotform.com/");
          }
        }
      };
      document.body.appendChild(script);
    } else {
      // Script already loaded, initialize handler
      if (window.jotformEmbedHandler) {
        const { props } = parseIframe(iframeCode);
        if (props.id) {
          window.jotformEmbedHandler(`iframe[id='${props.id}']`, "https://agent.jotform.com/");
        }
      }
    }
  }, [iframeCode]);

  const { props } = parseIframe(iframeCode);

  return (
    <div className="hidden lg:block fixed right-0 top-0 h-screen w-[525px] bg-background border-l border-border z-50">
      <div className="h-full w-full">
        <iframe
          id={props.id}
          title={props.title || "Hotel Assistant"}
          allow={props.allow}
          src={props.src}
          className="w-full h-full border-none"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'transparent'
          }}
          onLoad={() => {
            if (window.parent) {
              window.parent.scrollTo(0, 0);
            }
          }}
        />
      </div>
    </div>
  );
}

// Global type declarations
declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, url: string) => void;
  }
}