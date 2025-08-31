
// src/components/layout/header-demo-2.tsx
'use client';

import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Bot, Home, Users, Briefcase, HelpCircle, Menu, DollarSign, GalleryHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import type { Section } from '@/app/demo-2/page';
import { botpageData } from '@/lib/botpage-data';

interface HeaderDemo2Props {
  activeSection: Section;
  setActiveSection: Dispatch<SetStateAction<Section>>;
}

export function HeaderDemo2({ activeSection, setActiveSection }: HeaderDemo2Props) {
  const { navItems, customSections = [] } = botpageData;
  const allNavItems = [...navItems, ...(customSections || [])];

   const getIcon = (name: string) => {
    const Icon = (
        { Home, Bot, Briefcase, DollarSign, HelpCircle, GalleryHorizontal } as Record<string, React.ElementType>
    )[name];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ '--header-height': '64px' } as React.CSSProperties}>
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {allNavItems.map(({ key, label, icon }) => (
                <DropdownMenuItem key={key} onClick={() => setActiveSection(key)} className="gap-2">
                  {getIcon(icon)}
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="flex items-center gap-2">
                 {botpageData.appearance.logoUrl && (
                    <Link href="/" className="md:hidden">
                      <Image src={botpageData.appearance.logoUrl} alt="Logo" width={120} height={30} />
                    </Link>
                 )}
                 <Button asChild>
                    <Link href="https://form.jotform.com/252408899499076" target="_blank">
                        Empezar ahora
                    </Link>
                 </Button>
            </div>
        </div>
      </div>
    </header>
  );
}
