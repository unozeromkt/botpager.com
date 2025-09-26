// src/lib/botpage-data-default.ts
import type { CustomSection } from './botpage-data';

export const defaultBotpageData = {
  appearance: {
    logoUrl: "/img/logo.svg",
    heroImageUrl: "/img/hero-botpager.webp",
    primaryColor: "#6924ff",
    backgroundColor: "#1C1721",
    backgroundType: "image" as "color" | "image",
    iframeCode: `<iframe id="JotFormIFrame-0198a03a852179d2b8ff0f45ab80ee154199" title="Botzi: Asistente de Comunicación" onload="window.parent.scrollTo(0,0)" allowtransparency="true" allow="geolocation; microphone; camera; fullscreen" src="https://agent.jotform.com/0198a03a852179d2b8ff0f45ab80ee154199?embedMode=iframe&background=0&shadow=1" frameborder="0" style="max-width:100%; height:688px; border:none; width:100%;" scrolling="no"></iframe>`
  },
  navItems: [
    { key: 'home', label: 'Inicio', icon: 'Home' },
    { key: 'about', label: '¿Qué es un BotPage?', icon: 'Bot' },
    { key: 'services', label: 'Por qué un BotPage?', icon: 'Briefcase' },
    { key: 'plans', label: 'Planes', icon: 'DollarSign' },
    { key: 'faq', label: 'Preguntas', icon: 'HelpCircle' },
    { key: 'use-cases', label: 'Casos de uso', icon: 'GalleryHorizontal' },
  ],
  home: {
    title: "Tu Sitio Web con IA que vende 24/7",
    description: "Automatiza tu servicio al cliente, recibe reservas y capta clientes. Combinamos un sitio web de alta conversión con Inteligencia Artificial que vende y brinda soporte a tu negocio 24/7."
  },
  whatWeDo: {
    title: "Qué hacemos",
    description: "Nos especializamos en la reestructuración de deudas para personas y pequeños negocios. Nuestro enfoque se centra en crear acuerdos de pago viables y, cuando es necesario, guiar en el proceso de liquidación patrimonial para un nuevo comienzo financiero.",
  },
  aboutUs: {
    title: "Tu negocio trabajando para ti, Incluso mientas duermes",
    description: "Una BotPage no es solo un sitio web: es una solución digital que integra presencia profesional en línea con un agente de IA capaz de responder, agendar y convertir visitantes en clientes automáticamente, disponible 24/7.",
  },
  services: {
    title: "Revoluciona Tu Presencia Digital",
    description: "Transforma tu negocio con tecnología de vanguardia que trabaja 24/7, capta clientes potenciales de forma automática y ofrece resultados profesionales en solo 5 días.",
    items: [
      {
        icon: "Globe",
        title: "Presencia Digital Profesional",
        description: "Tu negocio visible en línea, totalmente optimizado para captar la atención."
      },
      {
        icon: "MessageCircle",
        title: "Chatbot Con IA Integrado",
        description: "Responde al instante, proporciona cotizaciones, califica clientes potenciales y agenda citas automáticamente."
      },
      {
        icon: "Clock",
        title: "Disponible 24/7",
        description: "Tu negocio nunca cierra. Siempre hay alguien atendiendo, incluso si no eres tú."
      },
      {
        icon: "Share2",
        title: "Funciona En Tu Web, WhatsApp Y Redes Sociales",
        description: "Tus clientes te encuentran donde están: en su teléfono."
      }
    ]
  },
  plans: {
    title: "Planes diseñados para crecer contigo",
    description: "Elige el plan que mejor se adapte a las necesidades de tu negocio. Sin contratos a largo plazo, puedes cambiar de plan cuando quieras.",
    items: [
      {
        name: "Starter",
        price: "499 USD",
        priceDescription: "Pago Único (Implementación)",
        monthlyFee: "24 USD",
        monthlyFeeDescription: "Fee Mensual",
        features: [
          "1 BotPage personalizado para tu negocio y entrenamiento completo del Agente IA",
          "Hasta 500 conversaciones / 1 formulario al mes",
          "Canales Base: Web + WhatsApp",
          "Canales Adicionales: Instagram y Messenger (+7 USD)"
        ],
        cta: "Comenzar con Starter"
      },
      {
        name: "Growth",
        price: "499 USD",
        priceDescription: "Pago Único (Implementación)",
        monthlyFee: "39 USD",
        monthlyFeeDescription: "Fee Mensual",
        isPopular: true,
        features: [
          "1 BotPage personalizado para tu negocio y entrenamiento completo del Agente IA",
          "Hasta 1,000 conversaciones / 3 formularios al mes",
          "Canales Base: Web + WhatsApp",
          "Canales Adicionales: Instagram y Messenger (+7 USD)"
        ],
        cta: "Comenzar con Growth"
      },
      {
        name: "Pro",
        price: "499 USD",
        priceDescription: "Pago Único (Implementación)",
        monthlyFee: "59 USD",
        monthlyFeeDescription: "Fee Mensual",
        features: [
          "1 BotPage personalizado para tu negocio y entrenamiento completo del Agente IA",
          "Hasta 2,000 conversaciones / 5 formularios al mes",
          "Canales Base: Web + WhatsApp",
          "Canales Adicionales: Instagram y Messenger (+7 USD)"
        ],
        cta: "Comenzar con Pro"
      }
    ]
  },
  faqs: {
    title: "Preguntas Frecuentes",
    items: [
      {
        question: "¿Para qué tipo de negocios está pensada una BotPage?",
        answer: "Está diseñada para emprendedores, pymes, coaches, consultores, negocios locales y tiendas online que buscan clientes rápido. También es ideal para negocios tradicionales que aún no han dado el salto digital y desean resultados inmediatos."
      },
      {
        question: "¿Cuánto tiempo toma implementar mi BotPage?",
        answer: "La gran ventaja es la velocidad: tu BotPage puede estar lista y funcionando en máximo 72 horas, incluyendo diseño, configuración de IA y conexión con la web y los canales sociales que requieras (WhatsApp, Messenger, Instagram)."
      },
      {
        question: "¿Qué planes o costos existen para implementar una BotPage?",
        answer: "Los planes van desde 499USD pago único por implantación y un fee de mantenimiento mensual de 24USD."
      },
      {
        question: "¿Ofrecen servicios de generación de tráfico?",
        answer: "Sí tenemos un plan que incluye generación de contenido con IA y pauta publicitaria para atraer tráfico y prospectos a tu BotPage."
      }
    ]
  },
  customSections: [] as CustomSection[],
  socials: {
    instagram: "https://www.instagram.com/botpagerapp/",
    facebook: "https://www.facebook.com/botpager",
    tiktok: "https://www.tiktok.com/@botpager",
  }
};
