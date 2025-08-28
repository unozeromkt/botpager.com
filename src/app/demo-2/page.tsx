
// src/app/demo-2/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, HelpCircle, Home, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { botpageData } from "@/lib/botpage-data";
import * as LucideIcons from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { VerticalNav } from "@/components/layout/vertical-nav";
import Link from 'next/link';
import Image from 'next/image';


export type Section = "home" | "about" | "services" | "faq";

export default function Demo2Page({
  activeSection,
  setActiveSection
}: {
  activeSection: Section;
  setActiveSection: Dispatch<SetStateAction<Section>>;
}) {

  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name];
    return Icon ? <Icon className="h-8 w-8 text-primary" /> : <Briefcase className="h-8 w-8 text-primary" />;
  };
  
  const sections = {
    home: {
      icon: Home,
      title: "Recupera tu vida financiera, a tu manera.",
      description:
        "Ofrecemos un camino claro para salir de deudas a personas y pequeños comerciantes, mediante acuerdos flexibles o liquidación patrimonial.",
      cta: (
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
          <Link href="#bot-frame-section">
            Empieza tu consulta
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      ),
      content: (
        <div className="space-y-8">
            {botpageData.appearance.heroImageUrl && (
                <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                    <Image 
                        src={botpageData.appearance.heroImageUrl} 
                        alt="Imagen de Héroe" 
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                        data-ai-hint="corporate meeting"
                    />
                </div>
            )}
             <div className="pt-2">
                 <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="#bot-frame-section">
                        Empieza tu consulta
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
             </div>
        </div>
      )
    },
    services: {
      icon: Briefcase,
      title: botpageData.services.title,
      content: (
        <div className="space-y-6">
           <p className="text-muted-foreground">{botpageData.whatWeDo.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {botpageData.services.items.map((service, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-card transition-all">
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
      title: botpageData.aboutUs.title,
      description: botpageData.aboutUs.description,
    },
    faq: {
      icon: HelpCircle,
      title: botpageData.faqs.title,
      content: (
        <Accordion type="single" collapsible className="w-full">
          {botpageData.faqs.items.map((faq, index) => (
             <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-base font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="pt-2 text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    },
  };

  const renderContent = () => {
    const section = sections[activeSection] || sections.home;
    const content = section.content || (
      <>
        <p className="max-w-[600px] text-muted-foreground md:text-xl font-normal">
          {section.description}
        </p>
        <div className="pt-8">
            {section.cta}
        </div>
      </>
    );

    return (
      <div key={activeSection} className="flex flex-col justify-center space-y-6 animate-in fade-in-50 duration-500">
        <div className="space-y-4">
           {/* Navegación para móvil */}
          <div className="lg:hidden mb-8">
            <VerticalNav
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              navItems={botpageData.navItems}
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
