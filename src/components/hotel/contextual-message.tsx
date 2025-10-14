// src/components/hotel/contextual-message.tsx
"use client";

import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface ContextualMessageProps {
  activeSection: string;
  className?: string;
  botProvider?: "jotform" | "ghl";
  botId?: string;
}

const sectionMessages = {
  home: {
    text: "¡Bienvenido a Greenview Hotel Medellín! Estamos en el corazón de El Poblado, valorados con 8.7/10 ⭐",
    cta: "¿Necesitas ayuda para planear tu estadía?"
  },
  rooms: {
    text: "Todas nuestras habitaciones cuentan con aire acondicionado, WiFi gratuito y caja fuerte 🏨",
    cta: "¿Quieres consultar disponibilidad?"
  },
  gallery: {
    text: "Estas son nuestras instalaciones reales. ¡Un paraíso urbano que combina lo contemporáneo con la naturaleza! 📸",
    cta: "¿Listo para hacer tu reserva?"
  },
  services: {
    text: "Nuestro personal servicial está disponible 24/7 para asistirte con tours y recomendaciones locales 🛎️",
    cta: "¿Necesitas información sobre servicios?"
  },
  location: {
    text: "Ubicación perfecta: muy cerca de la zona rosa y principales atracciones de Medellín 📍",
    cta: "¿Quieres direcciones o recomendaciones?"
  },
  booking: {
    text: "¡Excelente elección! Estás a un paso de reservar en el mejor hotel de El Poblado ✨",
    cta: "¿Alguna pregunta antes de reservar?"
  },
  about: {
    text: "Más que un hotel, somos tu hogar en Medellín. Limpieza impecable y ambiente silencioso 🏡",
    cta: "¿Te gustaría conocer más sobre nosotros?"
  },
  faq: {
    text: "¿No encuentras la respuesta que buscas? Nuestro asistente IA puede ayudarte al instante 🤖",
    cta: "¿Tienes alguna pregunta específica?"
  }
};

export function ContextualMessage({ 
  activeSection, 
  className = "", 
  botProvider = "jotform",
  botId 
}: ContextualMessageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset and show after delay
    setIsVisible(false);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Auto-hide after 3 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      
      return () => clearTimeout(hideTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, [activeSection]);

  const currentMessage = sectionMessages[activeSection as keyof typeof sectionMessages];

  if (!currentMessage || !isVisible) {
    return null;
  }

  const handleBotClick = () => {
    let botElement: HTMLElement | null = null;
    
    // Find bot element based on provider
    if (botProvider === "jotform" && botId) {
      botElement = document.querySelector(`#${botId}`) as HTMLIFrameElement;
    } else if (botProvider === "ghl") {
      // For Go High Level, try multiple selectors to find the widget
      const selectors = [
        `[data-widget-id="${botId}"]`,
        `#ghl-widget-container-${botId}`,
        `#ghl-widget-${botId}`,
        '.leadconnector-chat-widget',
        '.chat-widget-container',
        '.chat-interface'
      ];
      
      for (const selector of selectors) {
        botElement = document.querySelector(selector) as HTMLElement;
        if (botElement) break;
      }
      
      // If we found the GHL widget, also try to open/activate it
      if (botElement) {
        // Try to trigger any click events to ensure the chat is active
        const chatButton = document.querySelector('[data-widget-id="' + botId + '"]') ||
                          document.querySelector('.leadconnector-chat-button');
        if (chatButton && chatButton instanceof HTMLElement) {
          chatButton.click();
        }
      }
    }
    
    if (botElement) {
      // Smooth scroll to bot
      botElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      });
      
      // Try to focus on the element
      try {
        botElement.focus();
        
        // For GHL, also try to focus on any input field inside
        if (botProvider === "ghl") {
          const input = botElement.querySelector('input, textarea') as HTMLElement;
          if (input) {
            setTimeout(() => input.focus(), 500);
          }
        }
      } catch (e) {
        console.log('Cannot focus bot element due to restrictions');
      }
      
      // Add a visual highlight effect
      botElement.style.transition = 'box-shadow 0.3s ease';
      botElement.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.5)';
      
      setTimeout(() => {
        botElement!.style.boxShadow = '';
      }, 2000);
    } else {
      // Fallback: if we can't find the bot element, try to trigger it
      if (botProvider === "ghl") {
        // Try to click any chat-related buttons as fallback
        const fallbackButtons = document.querySelectorAll('button, [role="button"]');
        for (const button of fallbackButtons) {
          if (button.textContent?.toLowerCase().includes('chat') ||
              button.textContent?.toLowerCase().includes('asistente')) {
            (button as HTMLElement).click();
            break;
          }
        }
      }
    }
    
    // Close the message
    setIsVisible(false);
  };

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-[9999] max-w-sm transition-all duration-300",
      className
    )}>
      <div className="bg-primary text-primary-foreground rounded-lg shadow-2xl p-4 relative">
        {/* Message content */}
        <div className="pr-2">
          <p className="text-sm font-medium mb-3 leading-relaxed">
            {currentMessage.text}
          </p>
          
          <button
            onClick={handleBotClick}
            className="bg-white text-primary hover:bg-white/90 font-semibold text-xs group px-3 py-2 rounded transition-colors"
          >
            {currentMessage.cta}
            <span className="ml-2">→</span>
          </button>
        </div>

        {/* Arrow pointing to the left (towards bot sidebar) */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2">
          <div className="w-0 h-0 border-r-8 border-r-primary border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>

        {/* Animated pulse effect */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full animate-ping opacity-75"></div>
      </div>

      {/* Floating arrow animation pointing to bot */}
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-primary animate-bounce">
        <span className="text-2xl">←</span>
      </div>
    </div>
  );
}