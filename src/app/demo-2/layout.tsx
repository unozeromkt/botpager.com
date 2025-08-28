// src/app/demo-2/layout.tsx
"use client";

import { useState } from 'react';
import { HeaderDemo2 } from "@/components/layout/header-demo-2";
import { Footer } from "@/components/layout/footer";
import type { Section } from './page';

export default function Demo2Layout({
  children,
}: Readonly<{
  children: (activeSection: Section) => React.ReactNode;
}>) {
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderDemo2 activeSection={activeSection} setActiveSection={setActiveSection} />
      {children(activeSection)}
      <Footer />
    </div>
  );
}
