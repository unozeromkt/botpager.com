// src/components/layout/header-demo-2.tsx
'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Bot, Home, Users, Briefcase, HelpCircle, Menu } from 'lucide-react';
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
  const navItems: { key: Section; label: string; icon: React.ElementType }[] = [
    { key: 'home', label: 'Inicio', icon: Home },
    { key: 'services', label: botpageData.whatWeDo.title, icon: Briefcase },
    { key: 'about', label: botpageData.aboutUs.title, icon: Users },
    { key: 'faq', label: botpageData.faqs.title, icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ '--header-height': '64px' } as React.CSSProperties}>
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">FinanceFlow AI</span>
          </Link>
          <nav className="hidden items-center gap-2 text-sm md:flex">
            {navItems.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant="ghost"
                onClick={() => setActiveSection(key)}
                className={cn(
                  'gap-2 px-4 py-3 text-base font-medium transition-colors hover:text-foreground',
                  activeSection === key
                    ? 'font-semibold text-primary'
                    : 'font-normal text-muted-foreground'
                )}
              >
                {label}
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
           <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Menu className="mr-2" />
                  Menú
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navItems.map(({ key, label, icon: Icon }) => (
                  <DropdownMenuItem key={key} onClick={() => setActiveSection(key)} className="gap-2">
                    <Icon className="h-4 w-4" />
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button className="hidden md:flex">Empezar ahora</Button>
        </div>
      </div>
    </header>
  );
}
