
// src/app/demo-2/page.tsx
"use client";
import { useState, useEffect } from 'react';
import type { EmblaCarouselType } from 'embla-carousel-react';

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, HelpCircle, Home, CheckCircle, MapPin, Clock, Bot, Calendar, Moon, Globe, MessageCircle, Share2, PlayCircle, DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { botpageData as defaultBotData } from "@/lib/botpage-data";
import * as LucideIcons from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { VerticalNav } from "@/components/layout/vertical-nav";
import Link from 'next/link';
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { VideoPlayerPopup } from '@/components/landing/video-player-popup';
import { PricingCard } from '@/components/landing/pricing-card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';


export type Section = "home" | "about" | "services" | "faq" | string;

export default function Demo2Page({
  activeSection,
  setActiveSection,
  botData = defaultBotData,
}: {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  botData?: any;
}) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    setSlideCount(carouselApi.scrollSnapList().length)
    setCurrentSlide(carouselApi.selectedScrollSnap())

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap())
    })
  }, [carouselApi])

  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name];
    return Icon ? <Icon className="h-8 w-8 text-primary" /> : <Briefcase className="h-8 w-8 text-primary" />;
  };
  
  const staticSections = {
    home: {
      icon: Home,
      title: botData.home?.title || botData.whatWeDo?.title || "Bienvenido",
      description: botData.home?.description || botData.whatWeDo?.description || "",
      cta: (
         <div className="flex flex-wrap gap-4 items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="#bot-frame-section">
                    Empieza tu consulta
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => setIsVideoOpen(true)} className="text-base font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                 <PlayCircle className="mr-2 h-5 w-5" />
                ¿Cómo funciona?
            </Button>
        </div>
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
                  <h3 className="font-bold text-lg text-card-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 flex-1">{item.description}</p>
                  <p className="text-primary font-semibold text-lg mt-3">{item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )
    },
    location: {
      icon: MapPin,
      title: botData.location?.title,
      content: botData.location && (
        <div className="space-y-6">
          <Card className="overflow-hidden shadow-lg">
            <Image 
              src={botData.location.mapImage}
              alt="Mapa de ubicación"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint={botData.location.aiHint}
            />
          </Card>
          <ul className="space-y-4 text-muted-foreground md:text-lg">
            <li className="flex items-center gap-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span>{botData.location.address}</span>
            </li>
            <li className="flex items-center gap-4">
              <Clock className="h-6 w-6 text-primary" />
              <span>{botData.location.hours}</span>
            </li>
          </ul>
          <p className="text-muted-foreground pt-2">{botData.location.description}</p>
        </div>
      )
    },
    services: {
      icon: Briefcase,
      title: botData.services?.title,
      description: botData.whatWeDo?.description,
      content: botData.services?.items && (
        <div className="space-y-6">
           <p className="text-muted-foreground md:text-lg">{botData.services?.description}</p>
          <div className="grid grid-cols-1 gap-6 pt-4">
            {botData.services.items.map((service: any, index: number) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/80 transition-all">
                <div>{getIcon(service.icon)}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-card-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    about: {
      icon: Bot,
      title: botData.aboutUs?.title,
      description: botData.aboutUs?.description,
      features: (
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-base font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span>Responde al instante</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Agenda y convierte</span>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-primary" />
            <span>Disponible 24/7</span>
          </div>
        </div>
      )
    },
    plans: {
      icon: DollarSign,
      title: botData.plans?.title,
      description: botData.plans?.description,
      content: botData.plans?.items && (
        <div className="space-y-6">
          <p className="text-muted-foreground md:text-lg">{botData.plans?.description}</p>
          <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"
            >
              <CarouselContent>
                {botData.plans.items.map((plan: any, index: number) => (
                  <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/1 lg:basis-1/1">
                     <div className="p-1 h-full">
                        <PricingCard {...plan} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
             <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: slideCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      currentSlide === index ? "w-4 bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
        </div>
      ),
    },
    faq: {
      icon: HelpCircle,
      title: botData.faqs?.title,
      content: botData.faqs?.items && (
        <Accordion type="single" collapsible className="w-full">
          {botData.faqs.items.map((faq: any, index: number) => (
             <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-base font-semibold hover:no-underline text-card-foreground text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="pt-2 text-muted-foreground text-left">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    },
  };

  const findSectionData = () => {
    // Check in static sections first
    if (activeSection in staticSections) {
      const key = activeSection as keyof typeof staticSections;
      const section = staticSections[key];
      const content = section.content || (
        <>
          <p className="max-w-[600px] text-muted-foreground md:text-lg font-normal">
            {section.description}
          </p>
          {section.features}
        </>
      );
      return {
        ...section,
        cta: staticSections[key]?.cta, 
        content: content
      };
    }
    // Check in custom sections
    const customSection = botData.customSections?.find((s: any) => s.key === activeSection);
    if (customSection) {
      return {
        title: customSection.title,
        content: (
            // whitespace-pre-wrap preserves line breaks from the textarea
            <p className="max-w-[600px] text-muted-foreground md:text-lg font-normal whitespace-pre-wrap">
              {customSection.content}
            </p>
        )
      };
    }
    return null;
  }
  
  const sectionData = findSectionData();


  const renderContent = () => {
    
    if (!sectionData || !sectionData.title) return <div className="flex items-center justify-center h-full"><p>Contenido para "{activeSection}" no encontrado.</p></div>

    const content = sectionData.content;
    const cta = sectionData.cta;

    return (
       <>
        <VideoPlayerPopup 
            isOpen={isVideoOpen}
            onOpenChange={setIsVideoOpen}
            youtubeUrl="https://www.youtube.com/embed/vUtfinyDFuY"
        />
        <div key={activeSection} className="flex flex-col justify-center space-y-6 animate-in fade-in-50 duration-500 min-h-[450px]">
            <div className="space-y-4">
            {/* Navegación para móvil */}
            <div className="lg:hidden mb-8">
                <VerticalNav
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                navItems={[...botData.navItems, ...(botData.customSections || [])]}
                isMobile={true}
                />
            </div>
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl text-card-foreground" style={{color: '#FFFFFF'}}>
                {sectionData.title}
            </h1>
            <div className="font-body text-card-foreground/80">
                {content}
            </div>
            { cta && <div className="pt-8">
                {cta}
            </div>}
            </div>
        </div>
       </>
    );
  };

  return renderContent();
}
