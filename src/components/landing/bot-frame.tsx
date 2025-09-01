// src/components/landing/bot-frame.tsx
"use client";

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { botpageData } from "@/lib/botpage-data";
import { useIsMobile } from '@/hooks/use-mobile';

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

const floatingBotScriptSrc = 'https://cdn.jotfor.ms/agent/embedjs/01989fe94cf47b0a8a67e225e6a31e7a1f07/embed.js';

function DesktopBot() {
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

function FloatingMobileBot() {
    useEffect(() => {
        const existingScript = document.querySelector(`script[src='${floatingBotScriptSrc}']`);
        if (existingScript) {
            return;
        }

        const script = document.createElement('script');
        script.src = floatingBotScriptSrc;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            const scriptTag = document.querySelector(`script[src='${floatingBotScriptSrc}']`);
            if (scriptTag) {
                document.body.removeChild(scriptTag);
            }
            const jotformButton = document.getElementById('jotform-feedback-button');
            if (jotformButton) {
                jotformButton.remove();
            }
             const jotformIframe = document.getElementById('jotform-iframe-container');
            if (jotformIframe) {
                jotformIframe.remove();
            }
        };
    }, []);

    return null; // This component doesn't render anything itself
}


export function BotFrame() {
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder or null on the server to avoid hydration mismatches
    return <div className="hidden lg:block lg:col-span-5 sticky top-24 h-[688px]"></div>;
  }
  
  return isMobile ? <FloatingMobileBot /> : <DesktopBot />;
}

declare global {
  interface Window {
    jotformEmbedHandler?: (iframeSelector: string, jotformUrl: string) => void;
  }
}