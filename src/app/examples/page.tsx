
// src/app/examples/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from "react";
import type { Section } from '@/app/demo-2/page';
import Demo2Page from '@/app/demo-2/page';
import { BotFrame } from '@/components/landing/bot-frame';
import { VerticalNav } from '@/components/layout/vertical-nav';
import { botpageData } from '@/lib/botpage-data';
import { cn } from '@/lib/utils';

export default function ExamplesPage() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isChatFocused, setIsChatFocused] = useState(false);
  const { appearance } = botpageData;

  return (
      <>
        {appearance.backgroundType === 'image' && appearance.heroImageUrl && (
            <>
              <Image
                src={appearance.heroImageUrl}
                alt="Background"
                fill
                objectFit="cover"
                className="absolute inset-0 z-0"
                data-ai-hint="personal finance"
              />
              <div className="absolute inset-0 z-10 bg-background/70 backdrop-blur-sm"></div>
            </>
         )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative z-20">
            <div
                className={cn(
                "lg:col-span-7 flex gap-8 transition-all duration-300",
                isChatFocused && "lg:opacity-50 lg:blur-sm"
                )}
            >
                <div className="hidden lg:block">
                <VerticalNav
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    navItems={botpageData.navItems}
                />
                </div>
                <div className="flex-1 min-h-[450px] bg-card/40 backdrop-blur-lg rounded-xl p-8 border border-white/10 shadow-2xl">
                <Demo2Page activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>
            </div>

            <div
                className="lg:col-span-5 flex items-center justify-center sticky top-24 h-[688px] transition-all duration-300"
                onMouseEnter={() => setIsChatFocused(true)}
                onMouseLeave={() => setIsChatFocused(false)}
            >
                <BotFrame />
            </div>
        </div>
    </>
  );
}
