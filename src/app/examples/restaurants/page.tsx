
// src/app/examples/restaurants/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Section } from '@/app/demo-2/page';
import Demo2Page from '@/app/demo-2/page';
import { BotFrame } from '@/components/landing/bot-frame';
import { VerticalNav } from '@/components/layout/vertical-nav';
import { restaurantBotpageData } from '@/lib/botpage-data-restaurant';

export default function RestaurantPage() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isChatFocused, setIsChatFocused] = useState(false);
  const { appearance } = restaurantBotpageData;

  // We need a wrapper component to pass the data, or modify Demo2Page to accept it
  // For now, this is a simplified version. We'll need to refactor Demo2Page later.
  
  const PageContent = () => (
     <div className="lg:col-span-7 flex gap-8 transition-all duration-300">
        <div className="hidden lg:block">
            <VerticalNav
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                navItems={restaurantBotpageData.navItems}
            />
        </div>
        <div className="flex-1 min-h-[450px] bg-card/40 backdrop-blur-lg rounded-xl p-8 border border-white/10 shadow-2xl">
            {/* This is a temporary solution. We should make Demo2Page reusable */}
            <div key={activeSection} className="flex flex-col justify-center space-y-6 animate-in fade-in-50 duration-500 min-h-[450px]">
                <div className="space-y-4">
                    <div className="lg:hidden mb-8">
                        <VerticalNav
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        navItems={restaurantBotpageData.navItems}
                        isMobile={true}
                        />
                    </div>
                    <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                        {restaurantBotpageData.home.title}
                    </h1>
                    <div className="font-body">
                         <p className="max-w-[600px] text-muted-foreground md:text-xl font-normal">
                           {restaurantBotpageData.home.description}
                         </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )


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
                data-ai-hint="pizzeria restaurant"
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
                  navItems={restaurantBotpageData.navItems}
                />
              </div>
              <div className="flex-1 min-h-[450px] bg-card/40 backdrop-blur-lg rounded-xl p-8 border border-white/10 shadow-2xl">
                 <Demo2Page activeSection={activeSection} setActiveSection={setActiveSection} botData={restaurantBotpageData} />
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
