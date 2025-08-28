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


export const botpageData = {
  appearance: {
    logoUrl: "",
    primaryColor: "#6B46C1",
    backgroundColor: "#1C1721",
    get primaryColorHsl() { return hexToHsl(this.primaryColor); },
    get backgroundColorHsl() { return hexToHsl(this.backgroundColor); },
    iframeCode: `<iframe id="JotFormIFrame-01971cae816e73068d6b8e6f19ab11aa4dac" title="ISSA: Representante de ventas Online" allowTransparency="true" allow="geolocation; microphone; camera; fullscreen" src="https://agent.jotform.com/01971cae816e73068d6b8e6f19ab11aa4dac?embedMode=iframe&background=0&header=1&source=embed-next" frameBorder="0" style="min-width: 100%; height: 100%; border:none; width:100%;" scrolling="no"></iframe>`
  },
  navItems: [
    { key: 'home', label: 'Inicio', icon: 'Home' },
    { key: 'services', label: 'Servicios', icon: 'Briefcase' },
    { key: 'about', label: 'Nosotros', icon: 'Users' },
    { key: 'faq', label: 'Preguntas', icon: 'HelpCircle' },
  ],
  whatWeDo: {
    title: "Qué hacemos",
    description: "Nos especializamos en la reestructuración de deudas para personas y pequeños negocios. Nuestro enfoque se centra en crear acuerdos de pago viables y, cuando es necesario, guiar en el proceso de liquidación patrimonial para un nuevo comienzo financiero.",
  },
  aboutUs: {
    title: "Sobre Nosotros",
    description: "Somos un equipo de expertos financieros y legales comprometidos con tu bienestar. Creemos que todos merecen una segunda oportunidad y trabajamos incansablemente para encontrar la mejor solución a tu situación de endeudamiento.",
  },
  services: {
    title: "Nuestros Servicios",
    items: [
      {
        icon: "Scale",
        title: "Acuerdos Flexibles",
        description: "Negociamos con tus acreedores para lograr acuerdos de pago que se ajusten a tu capacidad económica."
      },
      {
        icon: "ShieldCheck",
        title: "Liquidación Patrimonial",
        description: "Te guiamos en el proceso legal para liquidar tus deudas y empezar de cero, protegiendo tus bienes esenciales."
      },
      {
        icon: "BookUser",
        title: "Asesoría Personalizada",
        description: "Analizamos tu caso particular para ofrecerte la estrategia de resolución de deudas más efectiva."
      },
      {
        icon: "FileText",
        title: "Gestión Documental",
        description: "Nos encargamos de todo el papeleo y los trámites legales para que tú no tengas que preocuparte."
      }
    ]
  },
  faqs: {
    title: "Preguntas Frecuentes",
    items: [
      {
        question: "¿Este proceso afecta mi historial de crédito?",
        answer: "Inicialmente puede haber un impacto, pero a largo plazo, resolver tus deudas de manera estructurada te permitirá reconstruir un historial de crédito sólido y saludable."
      },
      {
        question: "¿Cuánto tiempo toma el proceso?",
        answer: "La duración varía según la complejidad del caso y la opción elegida, pero en promedio, un acuerdo de pago puede tomar entre 3 a 5 años, mientras que una liquidación es más rápida."
      },
      {
        question: "¿Necesito un abogado?",
        answer: "Sí, es fundamental contar con la representación de un abogado experto en insolvencia para garantizar que tus derechos sean protegidos y el proceso se realice correctamente. Nosotros te proporcionamos ese respaldo."
      },
      {
        question: "¿Qué deudas se pueden incluir?",
        answer: "Generalmente se pueden incluir deudas de consumo como tarjetas de crédito, préstamos personales y créditos de libre inversión. Deudas hipotecarias o con garantías reales tienen un tratamiento especial."
      }
    ]
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
  }
};
