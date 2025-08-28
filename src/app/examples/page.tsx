
// src/app/examples/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from "react";
import type { Section } from '@/app/demo-2/page';
import Demo2Page from '@/app/demo-2/page';
import { BotFrame } from '@/components/landing/bot-frame';
import { VerticalNav } from '@/components/layout/vertical-nav';
import { botpageData } from '@/lib/botpage-data';
import { cn } from '@/lib/utils';

export default function ExamplesPage() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isChatFocused, setIsChatFocused] = useState(false);
  const { appearance } = botpageData;

  return (
      <>
        <div className="text-center">
            <h1 className="text-3xl font-bold">Selecciona una categoría de ejemplo</h1>
            <p className="text-muted-foreground mt-2">Usa el menú de navegación de arriba para explorar diferentes plantillas de Botpages.</p>
        </div>
    </>
  );
}
