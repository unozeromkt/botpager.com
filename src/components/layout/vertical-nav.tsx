// src/components/layout/vertical-nav.tsx
"use client";

import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Bot, Briefcase, DollarSign, HelpCircle, GalleryHorizontal, FileText } from 'lucide-react';

type Section = string;

interface NavItem {
  key: Section;
  label: string;
  icon: string;
}

interface VerticalNavProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  navItems: NavItem[];
  isMobile?: boolean;
}

const icons = {
  Home,
  Bot,
  Briefcase,
  DollarSign,
  HelpCircle,
  GalleryHorizontal,
  FileText
};


export function VerticalNav({
  activeSection,
  setActiveSection,
  navItems,
  isMobile = false
}: VerticalNavProps) {

  const getIcon = (name: string) => {
    const Icon = (icons as any)[name];
    return Icon ? <Icon /> : <FileText />;
  };
  
  if (isMobile) {
    return (
       <div className="w-full overflow-x-auto pb-2">
          <div className="flex gap-2 whitespace-nowrap">
            {navItems.map(({ key, label }) => (
              <Button
                key={key}
                variant={activeSection === key ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection(key)}
                className="shrink-0"
              >
                {label}
              </Button>
            ))}
          </div>
       </div>
    );
  }

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map(({ key, label, icon }) => (
        <Button
          key={key}
          variant="ghost"
          onClick={() => setActiveSection(key)}
          className={cn(
            "w-full justify-start text-base gap-3 px-4 py-6",
            activeSection === key && key !== 'use-cases'
              ? "font-bold bg-accent text-accent-foreground"
              : "font-normal text-muted-foreground"
          )}
        >
          {getIcon(icon)}
          {label}
        </Button>
      ))}
    </nav>
  );
}

    