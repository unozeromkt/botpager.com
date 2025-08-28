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

export default function Demo2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <div className="flex flex-col min-h-screen">
       <Header />
       <main className="flex-1 w-full">
        <section className="container mx-auto py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Columna de Navegación y Contenido */}
            <div className="lg:col-span-7 flex gap-8">
              <div className="hidden lg:block">
                 <VerticalNav
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  navItems={botpageData.navItems}
                />
              </div>
              <div className="flex-1 min-h-[450px]">
                 <Demo2Page activeSection={activeSection} setActiveSection={setActiveSection} />
              </div>
            </div>

            {/* Columna del Chatbot */}
            <div className="lg:col-span-5 flex items-center justify-center sticky top-24 h-[688px]">
              <BotFrame />
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
