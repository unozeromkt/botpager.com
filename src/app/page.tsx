
// src/app/page.tsx
"use client";

import { useState } from 'react';
import { BotFrame } from "@/components/landing/bot-frame";
import { ArrowRight, Users, Briefcase, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { botpageData } from "@/lib/botpage-data";
import * as LucideIcons from "lucide-react";
import { Button } from '@/components/ui/button';
import { HeaderDemo2 } from '@/components/layout/header-demo-2';
import { Footer } from '@/components/layout/footer';

export type Section = "home" | "about" | "services" | "faq";

function BotpageContent() {
  const [activeSection, setActiveSection] = useState<Section>("home");

  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name];
    return Icon ? <Icon className="h-8 w-8 text-primary" /> : <Briefcase className="h-8 w-8 text-primary" />;
  };
  
  const sections = {
    home: {
      icon: Briefcase,
      title: "Recupera tu vida financiera, a tu manera.",
      description:
        "Ofrecemos un camino claro para salir de deudas a personas y pequeños comerciantes, mediante acuerdos flexibles o liquidación patrimonial.",
      cta: (
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          Empieza tu consulta
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      ),
    },
    services: {
      icon: Briefcase,
      title: botpageData.services.title,
      content: (
        <div className="space-y-6">
           <p className="text-muted-foreground">{botpageData.whatWeDo.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {botpageData.services.items.map((service, index) => (
              <div key={index} className="flex items-start gap-4">
                <div>{getIcon(service.icon)}</div>
                <div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
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
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
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
        <p className="max-w-[600px] text-muted-foreground md:text-xl font-body">
          {section.description}
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
            {section.cta}
        </div>
      </>
    );

    return (
      <div key={activeSection} className="flex flex-col justify-center space-y-6 animate-in fade-in duration-500">
        <div className="space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-primary-foreground">
            {section.title}
          </h1>
          <div className="font-body">
            {content}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderDemo2 activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">
              <div className="flex flex-col justify-start space-y-8">
                <div className="min-h-[400px]">{renderContent()}</div>
              </div>
              <div className="flex items-center justify-center">
                <BotFrame />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


export default function Home() {
  const { primaryColorHsl, backgroundColorHsl } = botpageData.appearance;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary-dynamic: ${primaryColorHsl};
              --background-dynamic: ${backgroundColorHsl};
            }
          `,
        }}
      />
      <BotpageContent />
    </>
  );
}
