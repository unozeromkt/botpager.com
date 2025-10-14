// src/app/hotel/page.tsx
"use client";

import { HotelLayout } from '@/components/hotel/hotel-layout';
import { HotelHomePage } from '@/components/hotel/hotel-home-page';
import { hotelBotpageData } from '@/lib/botpage-data-hotel';

export default function HotelPage() {
  return (
    <HotelLayout 
      botProvider={hotelBotpageData.appearance.botProvider}
      ghlMethod={hotelBotpageData.appearance.ghlMethod}
      iframeCode={hotelBotpageData.appearance.iframeCode}
      ghlWidgetId={hotelBotpageData.appearance.ghlWidgetId}
      ghlLocationId={hotelBotpageData.appearance.ghlLocationId}
    >
      <HotelHomePage botpageData={hotelBotpageData} />
    </HotelLayout>
  );
}