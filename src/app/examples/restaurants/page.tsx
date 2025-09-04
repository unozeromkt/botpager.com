
// src/app/examples/restaurants/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Demo2Layout from '@/app/demo-2/layout';
import { restaurantBotpageData } from '@/lib/botpage-data-restaurant';

export default function RestaurantPage() {
  const { appearance } = restaurantBotpageData;

  // We are now re-using the Demo2Layout, which contains all the logic.
  // We just need to override the data source.
  // This is a temporary approach. A better solution would be to pass data via context or a higher-order component.
  
  // Monkey-patching the data for this specific view.
  const originalData = require('@/lib/botpage-data').botpageData;
  Object.assign(originalData, restaurantBotpageData);

  return (
    <>
       {appearance.backgroundType === 'image' && appearance.heroImageUrl && (
          <>
            <Image
              src={appearance.heroImageUrl}
              alt="Background"
              fill
              style={{ objectFit: 'cover' }}
              className="absolute inset-0 z-0"
              data-ai-hint="pizzeria restaurant"
            />
            <div className="absolute inset-0 z-10 bg-background/70 backdrop-blur-sm"></div>
          </>
       )}
      <div 
        className="relative z-20"
      >
        <Demo2Layout>
            <></>
        </Demo2Layout>
      </div>
    </>
  );
}
