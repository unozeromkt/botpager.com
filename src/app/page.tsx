
// src/app/page.tsx
"use client";

import { HomePage } from '@/components/landing/home-page';
import { defaultBotpageData } from '@/lib/botpage-data-default';
import { HomeSidebarJotForm } from '@/components/home/home-sidebar-jotform';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Home() {
  const isMobile = useIsMobile();
  
  return (
    <>
      <HomePage botpageData={defaultBotpageData} />
      {/* Sidebar fijo de JotForm - completamente separado del HomePage */}
      {!isMobile && <HomeSidebarJotForm iframeCode={defaultBotpageData.appearance.iframeCode} />}
    </>
  );
}
