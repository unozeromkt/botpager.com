// src/components/landing/bot-frame.tsx
"use client";

import { Card } from "@/components/ui/card";
import { botpageData } from "@/lib/botpage-data";

export function BotFrame() {
  return (
    <Card className="overflow-hidden shadow-2xl rounded-xl w-full h-[688px] border-2 border-primary/20 bg-card">
       <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: botpageData.appearance.iframeCode }} />
    </Card>
  );
}
