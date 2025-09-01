// src/components/landing/bot-frame.tsx
"use client";

import { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { botpageData } from "@/lib/botpage-data";

function parseIframe(iframeString: string): { props: Record<string, string> } {
  const iframeMatch = iframeString.match(/<iframe\s+(.*?)><\/iframe>/s);
  if (!iframeMatch) return { props: {} };

  const attrsString = iframeMatch[1];
  const attrs = (attrsString.match(/([a-zA-Z-]+)\s*=\s*"([^"]*)"/g) || []);
  
  const props = attrs.reduce((acc, attr) => {
    const parts = attr.split('=');
    const key = parts[0];
    const value = parts.slice(1).join('=').replace(/"/g, '');

    if (key === 'frameborder') acc['frameBorder'] = value;
    else if (key === 'allowfullscreen') acc['allowFullScreen'] = value;
    else if (key === 'style') {
       const styleObject = value.split(';').reduce((styleAcc, styleRule) => {
           const [prop, val] = styleRule.split(':');
           if (prop && val) {
              const camelProp = prop.trim().replace(/-(\w)/g, (_, c) => c.toUpperCase());
              (styleAcc as any)[camelProp] = val.trim();
           }
           return styleAcc;
       }, {});
       acc[key] = styleObject;
    }
    else {
        const camelKey = key.replace(/-(\w)/g, (_, c) => c.toUpperCase());
        acc[camelKey] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  return { props };
}


export function BotFrame() {
    const { props } = parseIframe(botpageData.appearance.iframeCode);
    const iframeId = props.id;

    useEffect(() => {
        if (!iframeId) return;

        const existingScript = document.querySelector(`script[src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js']`);
        if (existingScript) {
            if (window.jotformEmbedHandler) {
                window.jotformEmbedHandler(`iframe[id='${iframeId}']`, "https://www.jotform.com");
            }
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.jotformEmbedHandler) {
                window.jotformEmbedHandler(`iframe[id='${iframeId}']`, "https://www.jotform.com");
            }
        };

        return () => {
            const scriptTag = document.querySelector(`script[src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js']`);
            if (scriptTag) {
                document.body.removeChild(scriptTag);
            }
        };
    }, [iframeId]);

    return (
        <Card id="bot-frame-section" className="overflow-hidden shadow-2xl rounded-xl w-full h-full border-2 border-primary/20 bg-card animate-border-pulse">
            <iframe {...props}></iframe>
        </Card>
    );
}

declare global {
  interface Window {
    jotformEmbedHandler?: (iframeSelector: string, jotformUrl: string) => void;
  }
}
