
// src/app/page.tsx
"use client";

import { HomePage } from '@/components/landing/home-page';
import { defaultBotpageData } from '@/lib/botpage-data-default';

export default function Home() {
  // We are now re-using the Home Page component, which contains all the logic.
  // We just pass the default data as a prop.
  return (
      <HomePage botpageData={defaultBotpageData} />
  );
}
