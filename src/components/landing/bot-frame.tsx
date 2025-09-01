// src/components/landing/bot-frame.tsx
"use client";

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { botpageData } from "@/lib/botpage-data";
import { useIsMobile } from '@/hooks/use-mobile';

function parseIframe(iframeString: string): { props: Record<string, string>, scriptSrc?: string, scriptContent?: string } {
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

const floatingBotScriptSrc = 'https://cdn.jotfor.ms/agent/embedjs/01989fe94cf47b0a8a67e225e6a31e7a1f07/embed.js';


export function BotFrame() {
  const isMobile = useIsMobile();
  const [isScriptInjected, setIsScriptInjected] = useState(false);
  const { props } = parseIframe(botpageData.appearance.iframeCode);
  const iframeId = props.id;

  useEffect(() => {
    // Only run this effect on the client side after isMobile has been determined.
    if (typeof isMobile === 'undefined') {
      return;
    }

    if (isMobile) {
      // Inject floating bot script on mobile
      if(isScriptInjected) return;

      const existingScript = document.querySelector(`script[src='${floatingBotScriptSrc}']`);
      if (existingScript) {
        setIsScriptInjected(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = floatingBotScriptSrc;
      script.async = true;
      document.body.appendChild(script);
      setIsScriptInjected(true);
      
    } else {
      // Logic for embedded iframe on desktop
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
    }
  }, [isMobile, iframeId, isScriptInjected]);

  if (isMobile) {
    return null; // Don't render anything on mobile, the script will handle the floating button
  }

  // Render the embedded iframe for desktop
  return (
    <Card id="bot-frame-section" className="overflow-hidden shadow-2xl rounded-xl w-full h-full border-2 border-primary/20 bg-card animate-border-pulse">
      <iframe
        {...props}
      ></iframe>
    </Card>
  );
}

declare global {
  interface Window {
    jotformEmbedHandler?: (iframeSelector: string, jotformUrl: string) => void;
  }
}
