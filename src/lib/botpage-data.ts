// src/lib/botpage-data.ts

function hexToHsl(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "0 0% 0%";
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return `${h} ${s}% ${l}%`;
}

const rawBotData = {
  appearance: {
    logoUrl: "http://botpager.com/img/botpager-logo.png",
    heroImageUrl: "http://botpager.com/img/hero-botpager.webp",
    primaryColor: "#8975c6",
    backgroundColor: "#1C1721",
    backgroundType: "image" as "color" | "image",
    iframeCode: `<iframe id="JotFormIFrame-01989fe94cf47b0a8a67e225e6a31e7a1f07" title="Yuno - Agente Virtual - UnoZero " allowTransparency="true" allow="geolocation; microphone; camera; fullscreen" src="https://agent.jotform.com/01989fe94cf47b0a8a67e225e6a31e7a1f07?embedMode=iframe&background=0&shadow=1" frameBorder="0" style="min-width: 100%; height: 100%; border:none; width:100%;" scrolling="no"></iframe>`
  },
  navItems: [
    { key: 'home', label: 'Inicio', icon: 'Home' },
    { key: 'about', label: '¿Qué es un BotPage?', icon: 'Bot' },
    { key: 'services', label: 'Beneficios', icon: 'Briefcase' },
    { key: 'faq', label: 'Preguntas', icon: 'HelpCircle' },
  ],
  home: {
    title: "Vende más y atiende 24/7 con una BotPage.",
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
  customSections: [],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
  }
};


export const botpageData = {
    ...rawBotData,
    get appearance() {
        return {
            ...rawBotData.appearance,
            primaryColorHsl: hexToHsl(rawBotData.appearance.primaryColor),
            backgroundColorHsl: hexToHsl(rawBotData.appearance.backgroundColor),
        }
    }
}
