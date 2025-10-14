// src/components/hotel/hotel-home-page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import { Home, Bot, Briefcase, DollarSign, HelpCircle, GalleryHorizontal, Users, CheckCircle, MapPin, Clock, Calendar, Moon, Globe, MessageCircle, Share2, PlayCircle, Pizza, Bike, FileText, ArrowRight, Wifi, Wind, User, Bed, Mail, Phone, MessageSquare } from "lucide-react";

import { VerticalNav } from '@/components/layout/vertical-nav';
import { hotelBotpageData } from '@/lib/botpage-data-hotel';
import { hexToHsl } from '@/lib/botpage-data';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HotelGallery } from '@/components/hotel/hotel-gallery';
import { BookingForm } from '@/components/hotel/booking-form';
import { ContextualMessage } from '@/components/hotel/contextual-message';
import { Footer } from '@/components/layout/footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { VideoPlayerPopup } from '@/components/landing/video-player-popup';
import { PricingCard } from '@/components/landing/pricing-card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MobileBotScript } from '@/components/landing/mobile-bot-script';

const icons = {
    Home, Bot, Briefcase, DollarSign, HelpCircle, GalleryHorizontal, Users, CheckCircle, MapPin, Clock, Calendar, Moon, Globe, MessageCircle, Share2, PlayCircle, Pizza, Bike, FileText, ArrowRight, Wifi, Wind, User, Bed, Mail, Phone, MessageSquare
};

export function HotelHomePage({
  botpageData = hotelBotpageData
}: {
  botpageData?: typeof hotelBotpageData;
}) {
  const [activeSection, setActiveSection] = useState('home');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const isMobile = useIsMobile();
  const botData = botpageData;
  const { appearance } = botpageData;

  // Set CSS variables for theming
  useEffect(() => {
    const hslColor = hexToHsl(appearance.primaryColor);
    document.documentElement.style.setProperty('--primary', hslColor);
  }, [appearance.primaryColor]);

  // Carousel effect
  useEffect(() => {
    if (!carouselApi) return;

    setSlideCount(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const allNavItems = botData.navItems;

  const handleNavItemClick = (section: string) => {
    setActiveSection(section);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="h-6 w-6 text-primary" /> : null;
  };

  // Home CTA for hotel
  const homeCta = activeSection === 'home' ? (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
        <Link href="/form" target="_blank">
          Reservar Ahora
        </Link>
      </Button>
      <Button variant="outline" size="lg" onClick={() => setIsVideoOpen(true)} className="text-base font-semibold px-8 py-6 rounded-full hover:bg-background/50 transition-all duration-300">
        <PlayCircle className="mr-2 h-4 w-4" />
        ¿Cómo funciona?
      </Button>
    </div>
  ) : undefined;

  // Static sections for hotel
  const staticSections = {
    home: {
      icon: Home,
      title: botData.home?.title,
      description: botData.home?.description,
      cta: homeCta,
    },
    rooms: {
      icon: Briefcase,
      title: (botData as any).rooms?.title,
      content: (botData as any).rooms?.items && (
        <div className="space-y-6">
          <p className="text-muted-foreground md:text-lg">{(botData as any).rooms?.description}</p>
          <ScrollArea className="h-[480px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(botData as any).rooms.items.map((room: any, index: number) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="relative">
                    <Image 
                      src={room.image} 
                      alt={room.name} 
                      width={400} 
                      height={300} 
                      className="w-full h-40 object-cover"
                      data-ai-hint={room.aiHint}
                    />
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {room.price}
                    </div>
                  </div>
                  <CardContent className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-card-foreground mb-1">{room.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex-1">{room.description}</p>
                    
                    {/* Room Features Icons */}
                    <div className="flex flex-wrap items-center gap-3 mt-4 mb-4 text-muted-foreground">
                      {/* Capacity */}
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span className="text-xs">{room.pax} pax</span>
                      </div>
                      
                      {/* WiFi */}
                      {room.wifi && (
                        <div className="flex items-center gap-1">
                          <Wifi className="h-4 w-4" />
                          <span className="text-xs">WiFi</span>
                        </div>
                      )}
                      
                      {/* Air Conditioning */}
                      {room.airConditioning && (
                        <div className="flex items-center gap-1">
                          <Wind className="h-4 w-4" />
                          <span className="text-xs">A/C</span>
                        </div>
                      )}
                      
                      {/* Beds */}
                      {room.singleBeds > 0 && (
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span className="text-xs">{room.singleBeds} cama{room.singleBeds > 1 ? 's' : ''} sencilla{room.singleBeds > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      
                      {room.doubleBeds > 0 && (
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span className="text-xs">{room.doubleBeds} cama{room.doubleBeds > 1 ? 's' : ''} doble{room.doubleBeds > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Reserve Button */}
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      onClick={() => window.open('/form', '_blank')}
                    >
                      Reservar Ahora
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )
    },
    booking: {
      icon: Calendar,
      title: (botData as any).booking?.title,
      content: (botData as any).booking && (
        <div className="space-y-6">
          <p className="text-muted-foreground md:text-lg text-center">{(botData as any).booking?.description}</p>
          <BookingForm />
        </div>
      )
    },
    location: {
      icon: MapPin,
      title: (botData as any).location?.title,
      content: (botData as any).location && (
        <div className="space-y-6">
          {/* Google Maps Iframe */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div 
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: (botData as any).location.mapIframe
              }}
            />
          </div>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-card-foreground mb-4">Información de Contacto</h4>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{(botData as any).location.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{(botData as any).location.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
                  <a 
                    href="https://wa.link/aek4fk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {(botData as any).location.whatsapp} (WhatsApp)
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <a 
                    href={`mailto:${(botData as any).location.email}`}
                    className="text-primary hover:underline"
                  >
                    {(botData as any).location.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{(botData as any).location.hours}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-card-foreground mb-4">Sobre la Ubicación</h4>
              <p className="text-muted-foreground leading-relaxed">
                {(botData as any).location.description}
              </p>
            </div>
          </div>
        </div>
      )
    },
    services: {
      icon: Users,
      title: botData.services?.title,
      content: botData.services?.items && botData.services.items.length > 0 && (
        <div className="space-y-6">
          <p className="text-muted-foreground md:text-lg">{botData.services?.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
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
            <span>Asistente 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Reservas Instantáneas</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Atención Personalizada</span>
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
    gallery: {
      icon: GalleryHorizontal,
      title: (botData as any).gallery?.title,
      content: (botData as any).gallery?.images && (
        <HotelGallery
          images={(botData as any).gallery.images}
          title={(botData as any).gallery.title}
          description={(botData as any).gallery.description}
        />
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
          {data.cta && (
            <div className="pt-8">
              {data.cta}
            </div>
          )}
        </div>
      </div>
    );
  }

  const renderMobileView = () => (
    <div className="container mx-auto py-4 space-y-4 relative z-20">
      <MobileBotScript />
      <div className="flex items-center justify-between">
        {appearance.logoUrl && (
          <Link href="/hotel">
            <Image
              src={appearance.logoUrl}
              alt="Logo del Hotel"
              width={140}
              height={34}
            />
          </Link>
        )}
        <Button variant="ghost" size="sm" onClick={() => setIsVideoOpen(true)}>
          <PlayCircle className="mr-2 h-4 w-4" />
          ¿Cómo funciona?
        </Button>
      </div>

      <Card className="p-2 bg-card/60 backdrop-blur-lg border border-white/10 shadow-xl">
        <VerticalNav
          activeSection={activeSection}
          setActiveSection={handleNavItemClick}
          navItems={allNavItems}
          isMobile={true}
        />
      </Card>
      
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
    <main className="container mx-auto py-12 md:py-20 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <div className={cn("lg:col-span-11", activeSection === 'plans' && "lg:col-span-12")}>
          <div className="flex gap-8">
            <div className="w-64">
              {appearance.logoUrl && (
                <div className="mb-8 pl-4">
                  <Link href="/hotel">
                    <Image
                      src={appearance.logoUrl}
                      alt="Logo del Hotel"
                      width={180}
                      height={44}
                      className="h-auto"
                    />
                  </Link>
                </div>
              )}
              <VerticalNav
                activeSection={activeSection}
                setActiveSection={handleNavItemClick}
                navItems={allNavItems}
                isMobile={false}
              />
            </div>
            <div className="flex-1">
              {sectionData && (
                <div className={cn(
                  "min-h-[450px] rounded-xl p-8",
                  activeSection !== 'plans' && "bg-card/40 backdrop-blur-lg border border-white/10 shadow-2xl"
                )}>
                  {renderSectionContent(sectionData)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background to-background/50 z-0"></div>
        {appearance.backgroundType === "image" && appearance.heroImageUrl && (
          <>
            <div className="absolute inset-0 z-0">
              <Image
                src={appearance.heroImageUrl}
                alt="Hotel background"
                fill
                className="object-cover opacity-20"
                priority
                data-ai-hint="luxury hotel interior"
              />
            </div>
            <div className="absolute inset-0 z-10 bg-background/70 backdrop-blur-sm"></div>
          </>
        )}
        
        {isMobile === undefined
          ? null
          : isMobile
          ? renderMobileView()
          : renderDesktopView()}
        
        <Footer />
      </div>
      
      {/* Contextual Messages - Only show on desktop when bot is visible */}
      {!isMobile && (
        <ContextualMessage 
          activeSection={activeSection}
          botProvider={botpageData.appearance.botProvider}
          botId={botpageData.appearance.botProvider === "jotform" ? "JotFormIFrame-0198a03a852179d2b8ff0f45ab80ee154199" : botpageData.appearance.ghlWidgetId}
        />
      )}
      
      <VideoPlayerPopup 
        isOpen={isVideoOpen}
        onOpenChange={setIsVideoOpen}
        localVideoUrl="/videos/hotel-demo.mp4"
      />
    </>
  );
}