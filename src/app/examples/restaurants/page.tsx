// src/app/examples/restaurants/page.tsx
"use client";

import HomePage from '@/app/page';
import { restaurantBotpageData } from '@/lib/botpage-data-restaurant';

export default function RestaurantPage() {

  // We are now re-using the Home Page, which contains all the logic.
  // We just pass the restaurant-specific data as a prop.
  return (
      <HomePage botpageData={restaurantBotpageData} />
  );
}
