// src/components/landing/bot-frame.tsx
"use client";

import { Card } from "@/components/ui/card";
import { botpageData } from "@/lib/botpage-data";

function parseIframe(iframeString: string): Record<string, string> {
  const match = iframeString.match(/<iframe\s+(.*?)><\/iframe>/);
  if (!match) return {};

  const attrsString = match[1];
  const attrs = (attrsString.match(/([a-zA-Z-]+)="([^"]*)"/g) || []);

  return attrs.reduce((acc, attr) => {
    const [key, value] = attr.replace(/"/g, '').split('=');
    if (key === 'frameborder') {
      acc['frameBorder'] = value;
    } else if (key === 'allowfullscreen') {
      acc['allowFullScreen'] = value;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);
}

export function BotFrame() {
  const iframeProps = parseIframe(botpageData.appearance.iframeCode);

  return (
    <Card id="bot-frame-section" className="overflow-hidden shadow-2xl rounded-xl w-full h-[688px] border-2 border-primary/20 bg-card animate-border-pulse">
      <iframe
        {...iframeProps}
        style={{ minWidth: '100%', height: '100%', border: 'none', width: '100%' }}
        scrolling="no"
      ></iframe>
    </Card>
  );
}
