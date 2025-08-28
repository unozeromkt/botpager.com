// src/app/demo-2/layout.tsx
"use client";

import { useState } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Section } from './page';
import Demo2Page from './page';
import { BotFrame } from '@/components/landing/bot-frame';
import { VerticalNav } from '@/components/layout/vertical-nav';
import { botpageData } from '@/lib/botpage-data';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Demo2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isChatFocused, setIsChatFocused] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
       <Header />
       <main className="flex-1 w-full relative">
         {botpageData.appearance.heroImageUrl && (
            <Image
              src={botpageData.appearance.heroImageUrl}
              alt="Background"
              fill
              objectFit="cover"
              className="absolute inset-0 z-0"
              data-ai-hint="personal finance"
            />
         )}
         <div className="absolute inset-0 z-10 bg-background/70 backdrop-blur-sm"></div>

        <section className="container mx-auto py-12 md:py-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Columna de Navegación y Contenido */}
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

            {/* Columna del Chatbot */}
            <div 
              className="lg:col-span-5 flex items-center justify-center sticky top-24 h-[688px] transition-all duration-300"
              onMouseEnter={() => setIsChatFocused(true)}
              onMouseLeave={() => setIsChatFocused(false)}
            >
              <BotFrame />
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
