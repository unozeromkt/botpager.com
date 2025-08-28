
// src/lib/botpage-data-restaurant.ts

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


export const restaurantBotpageData = {
  appearance: {
    logoUrl: "",
    heroImageUrl: "https://picsum.photos/seed/pizza/1200/800",
    primaryColor: "#E53E3E", // Red for pizza sauce
    backgroundColor: "#2D3748", // Dark gray
    backgroundType: "image" as "color" | "image",
    get primaryColorHsl() { return hexToHsl(this.primaryColor); },
    get backgroundColorHsl() { return hexToHsl(this.backgroundColor); },
    iframeCode: `<iframe id="JotFormIFrame-01971cae816e73068d6b8e6f19ab11aa4dac" title="ISSA: Representante de ventas Online" allowTransparency="true" allow="geolocation; microphone; camera; fullscreen" src="https://agent.jotform.com/01971cae816e73068d6b8e6f19ab11aa4dac?embedMode=iframe&background=0&header=1&source=embed-next" frameBorder="0" style="min-width: 100%; height: 100%; border:none; width:100%;" scrolling="no"></iframe>`
  },
  navItems: [
    { key: 'home', label: 'Botzza', icon: 'Home' },
    { key: 'menu', label: 'Nuestro Menú', icon: 'Pizza' },
    { key: 'order', label: 'Haz tu pedido', icon: 'Bike' },
    { key: 'location', label: 'Horarios y ubicación', icon: 'MapPin' },
  ],
  home: {
    title: "Pizza artesanal con sabor a fuego y tiempo.",
    description: "En Botzza Pizzería amasamos lento (48 h), horneamos al carbón y servimos con ingredientes frescos. Ordena por WhatsApp o visita nuestro salón. Entregas en El Poblado y Laureles.",
  },
  whatWeDo: { // This would be the 'Menu' section
    title: "Nuestro Menú",
    description: "Desde la clásica Margarita hasta nuestras creaciones de autor, cada pizza es una obra de arte culinaria.",
  },
  aboutUs: { // This would be the 'Location' section
    title: "Horarios y Ubicación",
    description: "Encuéntranos en Calle Falsa 123, de Martes a Domingo, de 12:00 PM a 11:00 PM. ¡Te esperamos para compartir el auténtico sabor de la pizza artesanal!",
  },
  services: { // This would be part of the menu
    title: "Especialidades de la Casa",
    items: [
      {
        icon: "Pizza",
        title: "Botzza Clásica",
        description: "Salsa de tomate, mozzarella fresca, albahaca y un toque de aceite de oliva."
      },
      {
        icon: "Pizza",
        title: "Diávola",
        description: "Para los amantes del picante, con salami, peperoncino y mozzarella."
      },
      {
        icon: "Pizza",
        title: "Quattro Formaggi",
        description: "Una sinfonía de quesos: mozzarella, gorgonzola, parmesano y provolone."
      },
      {
        icon: "Pizza",
        title: "Vegana",
        description: "Con vegetales de temporada asados, salsa de tomate y queso vegano."
      }
    ]
  },
  faqs: { // This could be part of an 'Order' section
    title: "Cómo Pedir",
    items: [
      {
        question: "¿Cómo puedo hacer un pedido?",
        answer: "Puedes hacer tu pedido directamente a través de nuestro chatbot en esta página, llamarnos por teléfono o visitarnos en nuestro local."
      },
      {
        question: "¿Tienen opciones sin gluten?",
        answer: "¡Sí! Ofrecemos bases sin gluten por un costo adicional. Por favor, indícalo al momento de hacer tu pedido."
      },
      {
        question: "¿Cuál es el área de cobertura para domicilios?",
        answer: "Actualmente cubrimos las zonas de El Poblado y Laureles. Consulta con nuestro bot si tu dirección está dentro de nuestra cobertura."
      },
    ]
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  }
};
