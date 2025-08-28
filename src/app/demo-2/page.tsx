// src/app/demo-2/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, HelpCircle, Home, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { botpageData as defaultBotData } from "@/lib/botpage-data";
import * as LucideIcons from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { VerticalNav } from "@/components/layout/vertical-nav";
import Link from 'next/link';
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";


export type Section = "home" | "about" | "services" | "faq" | string;

export default function Demo2Page({
  activeSection,
  setActiveSection,
  botData = defaultBotData,
}: {
  activeSection: Section;
  setActiveSection: Dispatch<SetStateAction<Section>>;
  botData?: any;
}) {

  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name];
    return Icon ? <Icon className="h-8 w-8 text-primary" /> : <Briefcase className="h-8 w-8 text-primary" />;
  };
  
  const sections = {
    home: {
      icon: Home,
      title: botData.home?.title || botData.whatWeDo?.title || "Bienvenido",
      description: botData.home?.description || botData.whatWeDo?.description || "",
      cta: (
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
          <Link href="#bot-frame-section">
            Empieza tu consulta
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      ),
    },
    menu: {
      icon: Briefcase,
      title: botData.menu?.title,
      content: botData.menu?.items && (
        <ScrollArea className="h-[480px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {botData.menu.items.map((item: any, index: number) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={400} 
                    height={300} 
                    className="w-full h-40 object-cover"
                    data-ai-hint={item.aiHint}
                />
                <CardContent className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 flex-1">{item.description}</p>
                  <p className="text-primary font-semibold text-lg mt-3">{item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )
    },
    services: {
      icon: Briefcase,
      title: botData.services?.title,
      content: botData.services?.items && (
        <div className="space-y-6">
           <p className="text-muted-foreground">{botData.whatWeDo?.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {botData.services.items.map((service: any, index: number) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/80 transition-all">
                <div>{getIcon(service.icon)}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    about: {
      icon: Users,
      title: botData.aboutUs?.title,
      description: botData.aboutUs?.description,
    },
    faq: {
      icon: HelpCircle,
      title: botData.faqs?.title,
      content: botData.faqs?.items && (
        <Accordion type="single" collapsible className="w-full">
          {botData.faqs.items.map((faq: any, index: number) => (
             <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-base font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="pt-2 text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    },
  };
  
  // A bit of a hack to support dynamic sections from different data sources
  const currentSectionKey = activeSection as keyof typeof sections;
  const sectionData = botData[activeSection] || sections[currentSectionKey];


  const section = sectionData ? {
    title: sectionData.title,
    description: sectionData.description,
    content: sectionData.content || sections[currentSectionKey]?.content, // Use pre-defined content if available
    cta: sections[currentSectionKey]?.cta
  } : null;


  const renderContent = () => {
    
    if (!section || !section.title) return <div className="flex items-center justify-center h-full"><p>Contenido para "{activeSection}" no encontrado.</p></div>

    const content = section.content || (
      <>
        <p className="max-w-[600px] text-muted-foreground md:text-xl font-normal">
          {section.description}
        </p>
        { section.cta && <div className="pt-8">
            {section.cta}
        </div>}
      </>
    );

    return (
      <div key={activeSection} className="flex flex-col justify-center space-y-6 animate-in fade-in-50 duration-500 min-h-[450px]">
        <div className="space-y-4">
           {/* Navegación para móvil */}
          <div className="lg:hidden mb-8">
            <VerticalNav
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              navItems={botData.navItems}
              isMobile={true}
            />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            {section.title}
          </h1>
          <div className="font-body">
            {content}
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
}
