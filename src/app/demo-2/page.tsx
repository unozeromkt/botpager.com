// src/app/demo-2/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { BotFrame } from "@/components/landing/bot-frame";
import { ArrowRight, Users, Briefcase, HelpCircle, Home } from "lucide-react";

export type Section = "home" | "about" | "services" | "faq";

export default function Demo2Page({
  params,
}: {
  params: { activeSection: Section };
}) {

  // This is a bit of a hack to pass the active section to the children
  const activeSection = (params as any).activeSection as Section;
  
  const sections = {
    home: {
      icon: Home,
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
      title: "¿Qué Hacemos?",
      description:
        "Nos especializamos en la reestructuración de deudas para personas y pequeños negocios. Nuestro enfoque se centra en crear acuerdos de pago viables y, cuando es necesario, guiar en el proceso de liquidación patrimonial para un nuevo comienzo financiero.",
    },
    about: {
      icon: Users,
      title: "Sobre Nosotros",
      description:
        "Somos un equipo de expertos financieros y legales comprometidos con tu bienestar. Creemos que todos merecen una segunda oportunidad y trabajamos incansablemente para encontrar la mejor solución a tu situación de endeudamiento.",
    },
    faq: {
      icon: HelpCircle,
      title: "Preguntas Frecuentes",
      description:
        "¿Este proceso afecta mi historial de crédito? ¿Cuánto tiempo toma? ¿Necesito un abogado? Respondemos estas y otras dudas comunes. Para una respuesta más detallada, ¡pregunta a nuestro bot!",
    },
  };

  const renderContent = () => {
    // Fallback to home if the section is not found
    const section = sections[activeSection] || sections.home;
    return (
      <div key={activeSection} className="flex flex-col justify-center space-y-6 animate-in fade-in duration-500">
        <div className="space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-primary-foreground">
            {section.title}
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl font-body">
            {section.description}
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          {section.cta}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--header-height))] bg-background text-foreground">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">
              <div className="flex flex-col justify-start space-y-8">
                <div className="min-h-[300px]">{renderContent()}</div>
              </div>
              <div className="flex items-center justify-center">
                <BotFrame />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
