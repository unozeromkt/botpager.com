// src/app/demo-2/layout.tsx
"use client";

import { useState } from 'react';
import { HeaderDemo2 } from "@/components/layout/header-demo-2";
import { Footer } from "@/components/layout/footer";
import type { Section } from './page';
import Demo2Page from './page';
import { BotFrame } from '@/components/landing/bot-frame';

export default function Demo2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderDemo2 activeSection={activeSection} setActiveSection={setActiveSection} />
       <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">
              <div className="flex flex-col justify-start space-y-8">
                <div className="min-h-[400px]">
                   <Demo2Page activeSection={activeSection} />
                </div>
              </div>
              <div className="flex items-center justify-center sticky top-24 h-[688px]">
                <BotFrame />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
