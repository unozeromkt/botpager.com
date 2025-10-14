// src/components/hotel/hotel-layout.tsx
"use client";

import { ReactNode } from 'react';
import { HotelSidebar } from './hotel-sidebar';
import { HotelSidebarGHL } from './hotel-sidebar-ghl';
import { HotelSidebarGHLIframe } from './hotel-sidebar-ghl-iframe';
import { useIsMobile } from '@/hooks/use-mobile';

interface HotelLayoutProps {
  children: ReactNode;
  botProvider: "jotform" | "ghl";
  ghlMethod?: "gtm" | "iframe";
  iframeCode?: string;
  ghlWidgetId?: string;
  ghlLocationId?: string;
}

export function HotelLayout({ children, botProvider, ghlMethod = "gtm", iframeCode, ghlWidgetId, ghlLocationId }: HotelLayoutProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    // En móvil, mostrar contenido completo sin sidebar
    return (
      <div className="min-h-screen bg-background">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main content area - adjusted to account for sidebar on desktop only */}
      <div className="pr-[525px] min-h-screen">
        <div className="w-full">
          {children}
        </div>
      </div>
      
      {/* Fixed sidebar with bot - desktop only */}
      {botProvider === "jotform" && iframeCode && (
        <HotelSidebar iframeCode={iframeCode} />
      )}
      {botProvider === "ghl" && ghlWidgetId && ghlMethod === "gtm" && (
        <HotelSidebarGHL widgetId={ghlWidgetId} locationId={ghlLocationId} />
      )}
      {botProvider === "ghl" && ghlWidgetId && ghlMethod === "iframe" && (
        <HotelSidebarGHLIframe widgetId={ghlWidgetId} locationId={ghlLocationId} />
      )}
    </div>
  );
}