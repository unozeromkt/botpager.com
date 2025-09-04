
// src/app/examples/restaurants/page.tsx
"use client";

import Demo2Layout from '@/app/demo-2/layout';
import { restaurantBotpageData } from '@/lib/botpage-data-restaurant';

export default function RestaurantPage() {

  // We are now re-using the Demo2Layout, which contains all the logic.
  // We just pass the restaurant-specific data as a prop.
  return (
      <Demo2Layout botpageData={restaurantBotpageData}>
          <></>
      </Demo2Layout>
  );
}
