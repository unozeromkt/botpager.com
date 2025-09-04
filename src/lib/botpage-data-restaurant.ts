// src/lib/botpage-data-restaurant.ts

export const restaurantBotpageData = {
  appearance: {
    logoUrl: "",
    heroImageUrl: "https://picsum.photos/seed/pizzeria-interior/1200/800",
    primaryColor: "#E53E3E", // Red for pizza sauce
    backgroundColor: "#2D3748", // Dark gray
    backgroundType: "image" as "color" | "image",
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
  menu: {
    title: "Nuestro Menú",
    description: "Desde la clásica Margarita hasta nuestras creaciones de autor, cada pizza es una obra de arte culinaria.",
    items: [
      {
        image: "https://picsum.photos/seed/margherita/400/300",
        name: "Margherita D.O.P.",
        description: "Tomate San Marzano, fior di latte, albahaca fresca y aceite de oliva extra virgen.",
        price: "$26.900",
        aiHint: "margherita pizza"
      },
      {
        image: "https://picsum.photos/seed/diavola/400/300",
        name: "Diavola + Formaggi",
        description: "Tomate, mozzarella, pepperoni artesanal, miel picante y orégano fresco.",
        price: "$32.900",
        aiHint: "pepperoni pizza"
      },
      {
        image: "https://picsum.photos/seed/veggie/400/300",
        name: "Veggie Verde",
        description: "Pesto de albahaca, zucchini, champiñones, aceitunas negras y tomates cherry.",
        price: "$29.900",
        aiHint: "veggie pizza"
      },
      {
        image: "https://picsum.photos/seed/quattro/400/300",
        name: "Quattro Formaggi",
        description: "Mozzarella, gorgonzola, parmesano, ricotta y un toque de miel de abejas.",
        price: "$35.900",
        aiHint: "cheese pizza"
      },
      {
        image: "https://picsum.photos/seed/prosciutto/400/300",
        name: "Prosciutto e Funghi",
        description: "Jamón prosciutto, champiñones frescos, mozzarella y rúgula.",
        price: "$38.900",
        aiHint: "prosciutto pizza"
      },
      {
        image: "https://picsum.photos/seed/tropical/400/300",
        name: "Tropical Botzza",
        description: "Jamón artesanal, piña fresca, mozzarella, cilantro y salsa BBQ casera.",
        price: "$31.900",
        aiHint: "hawaiian pizza"
      },
    ]
  },
  order: {
      title: "Haz tu Pedido",
      description: "Nuestro bot está listo para tomar tu orden. ¡Solo tienes que hacer clic en el chat y empezar a pedir! O si lo prefieres, llámanos al (123) 456-7890."
  },
  location: {
    title: "Horarios y Ubicación",
    address: "Calle Falsa 123, El Poblado, Medellín",
    hours: "Martes a Domingo: 12:00 PM - 11:00 PM",
    mapImage: "https://picsum.photos/seed/map/600/400",
    aiHint: "city map",
    description: "¡Te esperamos para compartir el auténtico sabor de la pizza artesanal!",
  },
  whatWeDo: { title: "", description: ""},
  aboutUs: { title: "", description: ""},
  services: { title: "Servicios", description: "", items: [] },
  faqs: { title: "Preguntas Frecuentes", items: [] },
  plans: { title: "Planes", description: "", items: [] },
  customSections: [],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  }
};
