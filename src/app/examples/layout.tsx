
// src/app/examples/layout.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BotFrame } from '@/components/landing/bot-frame';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const exampleNavItems = [
  { name: 'Restaurantes', href: '/examples/restaurants' },
  { name: 'Servicios', href: '/examples/services' },
  { name: 'Clínicas y Spas', href: '/examples/clinics' },
  { name: 'Veterinarias', href: '/examples/vets' },
];

export default function ExamplesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full relative">
        <div className="border-b">
            <div className="container mx-auto flex items-center justify-center py-2">
                <nav className="flex items-center gap-2">
                {exampleNavItems.map((item) => (
                    <Button
                    key={item.name}
                    variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                    asChild
                    >
                    <Link href={item.href}>{item.name}</Link>
                    </Button>
                ))}
                </nav>
            </div>
        </div>

        <section className="container mx-auto py-12 md:py-20 relative z-20">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  );
}
