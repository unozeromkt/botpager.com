
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
import { useIsMobile } from '@/hooks/use-mobile';

export default function Demo2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { appearance, navItems, customSections = [] } = botpageData;
  const isMobile = useIsMobile();

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
           
          <div className="container mx-auto py-12 md:py-20 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              
              {/* Columna de Navegación y Contenido (Escritorio) */}
              <div className="hidden lg:block lg:col-span-7">
                <div className="flex gap-8">
                   <div className="w-64">
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
                      "flex-1 min-h-[688px] rounded-xl",
                      activeSection !== 'plans' && "bg-card/40 backdrop-blur-lg border border-white/10 shadow-2xl"
                  )}>
                     <div className="p-8">
                       <Demo2Page activeSection={activeSection} setActiveSection={handleNavItemClick} />
                     </div>
                  </div>
                </div>
              </div>

              {/* Contenido Móvil */}
              <div className="lg:hidden lg:col-span-12">
                <Demo2Page activeSection={activeSection} setActiveSection={handleNavItemClick} />
              </div>


              {/* Columna del Chatbot (Escritorio) */}
              <div 
                className={cn(
                  "hidden lg:flex lg:col-span-5 items-center justify-center sticky top-24 h-[688px] transition-all duration-300",
                   activeSection === 'plans' && "lg:hidden"
                )}
              >
                 <BotFrame />
              </div>

            </div>
          </div>
        </main>
        <Footer />
      </div>
      <UseCasesGallery isOpen={isGalleryOpen} onOpenChange={setIsGalleryOpen} />
    </>
  );
}
