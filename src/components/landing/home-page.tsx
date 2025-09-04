
// src/components/landing/home-page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import * as LucideIcons from "lucide-react";

import { BotFrame } from '@/components/landing/bot-frame';
import { VerticalNav } from '@/components/layout/vertical-nav';
import { defaultBotpageData } from '@/lib/botpage-data-default';
import { hexToHsl } from '@/lib/botpage-data';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { UseCasesGallery } from '@/components/landing/use-cases-gallery';
import { Footer } from '@/components/layout/footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, HelpCircle, Home, CheckCircle, MapPin, Clock, Bot, Calendar, Moon, Globe, MessageCircle, Share2, PlayCircle, DollarSign, Pizza, GalleryHorizontal, Bike } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { VideoPlayerPopup } from '@/components/landing/video-player-popup';
import { PricingCard } from '@/components/landing/pricing-card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function HomePage({
  botpageData = defaultBotpageData
}: {
  botpageData?: typeof defaultBotpageData;
}) {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { appearance, navItems, ...botData } = botpageData;
  const isMobile = useIsMobile();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)

  const allNavItems = [...navItems, ...(botpageData.customSections || [])];
  
  const primaryColorHsl = hexToHsl(appearance.primaryColor);
  const backgroundColorHsl = hexToHsl(appearance.backgroundColor);

  const handleNavItemClick = (section: string) => {
    if (section === 'use-cases') {
      setIsGalleryOpen(true);
    } else {
      setActiveSection(section);
    }
  };

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
         <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/form" target="_blank">
                    Empieza Ahora
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
      icon: Pizza,
      title: (botData as any).menu?.title,
      content: (botData as any).menu?.items && (
        <ScrollArea className="h-[480px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(botData as any).menu.items.map((item: any, index: number) => (
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
    order: {
      icon: Bike,
      title: (botData as any).order?.title,
      description: (botData as any).order?.description,
    },
    location: {
      icon: MapPin,
      title: (botData as any).location?.title,
      content: (botData as any).location && (
        <div className="space-y-6">
          <Card className="overflow-hidden shadow-lg">
            <Image 
              src={(botData as any).location.mapImage}
              alt="Mapa de ubicación"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint={(botData as any).location.aiHint}
            />
          </Card>
          <ul className="space-y-4 text-muted-foreground md:text-lg">
            <li className="flex items-center gap-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span>{(botData as any).location.address}</span>
            </li>
            <li className="flex items-center gap-4">
              <Clock className="h-6 w-6 text-primary" />
              <span>{(botData as any).location.hours}</span>
            </li>
          </ul>
          <p className="text-muted-foreground pt-2">{(botData as any).location.description}</p>
        </div>
      )
    },
    services: {
      icon: Briefcase,
      title: botData.services?.title,
      description: botData.whatWeDo?.description,
      content: botData.services?.items && botData.services.items.length > 0 && (
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
      content: botData.plans?.items && botData.plans.items.length > 0 && (
        <div className="space-y-6">
          <p className="text-muted-foreground md:text-lg text-center">{botData.plans?.description}</p>
          <div className="w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-5xl mx-auto">
            <Carousel
                setApi={setCarouselApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {botData.plans.items.map((plan: any, index: number) => (
                    <CarouselItem key={index} className="sm:basis-full md:basis-1/2 lg:basis-1/2 h-auto">
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
        </div>
      ),
    },
    faq: {
      icon: HelpCircle,
      title: botData.faqs?.title,
      content: botData.faqs?.items && botData.faqs.items.length > 0 && (
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

  const findSectionData = (sectionKey: string) => {
    if ((staticSections as any)[sectionKey] && (staticSections as any)[sectionKey].title) {
      const key = sectionKey as keyof typeof staticSections;
      const section = staticSections[key];
      
      let content;
      if ((section as any).content) {
          content = (section as any).content;
      } else {
          content = (
            <>
              <p className="max-w-[600px] text-muted-foreground md:text-lg font-normal">
                {(section as any).description}
              </p>
              {(section as any).features}
            </>
          );
      }

      return {
        ...section,
        cta: (section as any).cta, 
        content: content
      };
    }
    const customSection = botData.customSections?.find((s) => s.key === sectionKey);
    if (customSection) {
      return {
        title: customSection.title,
        content: (
            <p className="max-w-[600px] text-muted-foreground md:text-lg font-normal whitespace-pre-wrap">
              {customSection.content}
            </p>
        )
      };
    }
    return null;
  }
  
  const sectionData = findSectionData(activeSection);

  const renderSectionContent = (data: any) => {
     if (!data || !data.title) return <div className="flex items-center justify-center h-full"><p>Contenido para "{activeSection}" no encontrado.</p></div>

    return (
      <div key={activeSection} className="flex flex-col justify-center space-y-6 animate-in fade-in-50 duration-500 min-h-[450px]">
        <div className={cn("space-y-4", activeSection === 'plans' ? "text-center" : "")}>
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl text-card-foreground">
              {data.title}
          </h1>
          <div className="font-body text-card-foreground/80">
              {data.content}
          </div>
          { data.cta && <div className="pt-8">
              {data.cta}
          </div>}
        </div>
      </div>
    );
  }

  const renderMobileView = () => (
    <div className="container mx-auto py-8">
      {appearance.logoUrl && (
        <div className="mb-4 flex justify-center">
          <Link href="/">
            <Image
              src={appearance.logoUrl}
              alt="Logo"
              width={180}
              height={44}
            />
          </Link>
        </div>
      )}
      <div className="w-full mb-4">
        <VerticalNav
          activeSection={activeSection}
          setActiveSection={handleNavItemClick}
          navItems={allNavItems}
          isMobile={true}
        />
      </div>
      
      {sectionData && (
        <div className={cn(
          "min-h-[450px] rounded-xl p-6",
          activeSection !== 'plans' && "bg-card/40 backdrop-blur-lg border border-white/10 shadow-2xl"
        )}>
          {renderSectionContent(sectionData)}
        </div>
      )}
    </div>
  );

  const renderDesktopView = () => (
    <div className="container mx-auto py-12 md:py-20 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <div className={cn("lg:col-span-7", activeSection === 'plans' && "lg:col-span-12")}>
          <div className="flex gap-8">
            <div className="w-64">
              {appearance.logoUrl && (
                <div className="mb-8 pl-4">
                  <Link href="/">
                    <Image
                        src={appearance.logoUrl}
                        alt="Logo"
                        width={180}
                        height={44}
                    />
                  </Link>
                </div>
              )}
              <VerticalNav
                activeSection={activeSection}
                setActiveSection={handleNavItemClick}
                navItems={allNavItems}
              />
            </div>
            <div className={cn(
                "flex-1 min-h-[688px] rounded-xl",
                activeSection !== 'plans' && "bg-card/40 backdrop-blur-lg border border-white/10 shadow-2xl"
            )}>
              <div className="p-8">
                <VideoPlayerPopup 
                  isOpen={isVideoOpen}
                  onOpenChange={setIsVideoOpen}
                  youtubeUrl="https://www.youtube.com/embed/vUtfinyDFuY"
                />
                {renderSectionContent(sectionData)}
              </div>
            </div>
          </div>
        </div>
        <div 
          className={cn(
            "lg:col-span-5 items-center justify-center sticky top-24 h-[688px] transition-all duration-300",
            activeSection === 'plans' ? "hidden" : "hidden lg:flex"
          )}
        >
          <BotFrame />
        </div>
      </div>
    </div>
  );

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
      <div className="flex flex-col min-h-screen">
         <main className="flex-1 w-full relative">
           {appearance.backgroundType === 'image' && appearance.heroImageUrl && (
              <>
                <Image
                  src={appearance.heroImageUrl}
                  alt="Background"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="absolute inset-0 z-0"
                  data-ai-hint="personal finance"
                />
                <div className="absolute inset-0 z-10 bg-background/70 backdrop-blur-sm"></div>
              </>
           )}
           
          {isMobile === undefined
            ? null
            : isMobile
            ? renderMobileView()
            : renderDesktopView()}
        </main>
        <Footer />
      </div>
      <UseCasesGallery isOpen={isGalleryOpen} onOpenChange={setIsGalleryOpen} />
    </>
  );
}
