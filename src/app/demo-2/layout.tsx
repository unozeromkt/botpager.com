
// src/app/demo-2/layout.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { Section } from './page';
import Demo2Page from './page';
import { BotFrame } from '@/components/landing/bot-frame';
import { VerticalNav } from '@/components/layout/vertical-nav';
import { botpageData } from '@/lib/botpage-data';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { UseCasesGallery } from '@/components/landing/use-cases-gallery';
import { Footer } from '@/components/layout/footer';

export default function Demo2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isChatFocused, setIsChatFocused] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { appearance, navItems, customSections = [] } = botpageData;

  const allNavItems = [...navItems, ...(customSections || [])];

  const handleNavItemClick = (section: Section) => {
    if (section === 'use-cases') {
      setIsGalleryOpen(true);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
         <main className="flex-1 w-full relative">
           {appearance.backgroundType === 'image' && appearance.heroImageUrl && (
              <>
                <Image
                  src={appearance.heroImageUrl}
                  alt="Background"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="absolute inset-0 z-0"
                  data-ai-hint="personal finance"
                />
                <div className="absolute inset-0 z-10 bg-background/70 backdrop-blur-sm"></div>
              </>
           )}
           
          <section className="container mx-auto py-12 md:py-20 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              
              {/* Columna de Navegación y Contenido */}
              <div 
                className={cn(
                  "flex gap-8 transition-all duration-300",
                  activeSection === 'plans' ? "lg:col-span-12" : "lg:col-span-7",
                  isChatFocused && "lg:opacity-50 lg:blur-sm"
                )}
              >
                <div className="hidden lg:block w-64">
                   {botpageData.appearance.logoUrl && (
                    <div className="mb-8 pl-4">
                      <Link href="/">
                        <Image
                            src={botpageData.appearance.logoUrl}
                            alt="Logo"
                            width={180}
                            height={44}
                        />
                      </Link>
                    </div>
                  )}
                   <VerticalNav
                    activeSection={activeSection}
                    setActiveSection={handleNavItemClick}
                    navItems={allNavItems}
                  />
                </div>
                <div className={cn(
                    "flex-1 min-h-[688px] rounded-xl p-8",
                    activeSection !== 'plans' && "bg-card/40 backdrop-blur-lg border border-white/10 shadow-2xl"
                )}>
                   <Demo2Page activeSection={activeSection} setActiveSection={handleNavItemClick} />
                </div>
              </div>

              {/* Columna del Chatbot */}
              <div 
                className={cn(
                  "lg:col-span-5 flex items-center justify-center sticky top-24 h-[688px] transition-all duration-300",
                  activeSection === 'plans' && "hidden"
                )}
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
      <UseCasesGallery isOpen={isGalleryOpen} onOpenChange={setIsGalleryOpen} />
    </>
  );
}
