// src/components/landing/bot-frame.tsx
"use client";

import { Card } from "@/components/ui/card";
import { botpageData } from "@/lib/botpage-data";
import { useEffect, useState } from "react";

export function BotFrame() {
  const [key, setKey] = useState(0);

  // When the iframe code changes, we need to force a re-render of the component
  // to avoid issues with the external script that handles the embed.
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [botpageData.appearance.iframeCode]);

  return (
    <Card key={key} className="overflow-hidden shadow-2xl rounded-xl w-full h-[688px] border-2 border-primary/20 bg-card">
       <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: botpageData.appearance.iframeCode }} />
    </Card>
  );
}
