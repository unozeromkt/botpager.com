// src/lib/botpage-data-hotel.ts
import { CustomSection } from './botpage-data';

export const hotelBotpageData = {
  appearance: {
    logoUrl: "/img/logo-hotel.svg",
    heroImageUrl: "/img/hotel-hero.webp",
    primaryColor: "#2563EB", // Hotel blue
    backgroundColor: "#1E293B",
    backgroundType: "image" as "color" | "image",
    // Bot configuration - switch between providers easily
    botProvider: "ghl" as "jotform" | "ghl", // Change this to switch providers
    ghlMethod: "gtm" as "gtm" | "iframe", // GTM method or direct iframe for GHL
    // JotForm configuration
    iframeCode: `<iframe id="JotFormIFrame-0198a03a852179d2b8ff0f45ab80ee154199" title="Hotel Assistant - Reservas y Consultas" onload="window.parent.scrollTo(0,0)" allowtransparency="true" allow="geolocation; microphone; camera; fullscreen" src="https://agent.jotform.com/0198a03a852179d2b8ff0f45ab80ee154199?embedMode=iframe&background=0&shadow=1" frameborder="0" style="max-width:100%; height:100%; border:none; width:100%;" scrolling="no"></iframe>`,
    // Go High Level configuration
    ghlWidgetId: "68d9b1eb150fa8c4d7b4312f",
    ghlLocationId: "t8gRxt7gwc25cXQi8kYp"
  },
  navItems: [
    { key: 'home', label: 'Inicio', icon: 'Home' },
    { key: 'rooms', label: 'Habitaciones', icon: 'Briefcase' },
    { key: 'gallery', label: 'Galería', icon: 'GalleryHorizontal' },
    { key: 'services', label: 'Servicios', icon: 'Users' },
    { key: 'location', label: 'Ubicación y contacto', icon: 'MapPin' },
    { key: 'booking', label: 'Reservar', icon: 'Calendar' },
    { key: 'about', label: 'Acerca de', icon: 'Bot' },
    { key: 'faq', label: 'Preguntas', icon: 'HelpCircle' },
  ],
  home: {
    title: "Greenview Hotel Medellín - Tu Hotel Ideal en El Poblado",
    description: "Tranquilidad y confort en la mejor ubicación del Poblado Medellín. Un paraíso urbano que combina lo contemporáneo con la naturaleza."
  },
  whatWeDo: {
    title: "Nuestro Hotel",
    description: "Greenview Hotel Medellín es el hotel ideal para descubrir, explorar y disfrutar Medellín. Ubicados en el corazón de El Poblado, ofrecemos la perfecta combinación de tranquilidad y acceso a todo lo que la ciudad tiene para ofrecer.",
  },
  aboutUs: {
    title: "Acerca de Greenview Hotel",
    description: "Somos un paraíso urbano que combina lo contemporáneo with la naturaleza. Nuestro hotel ofrece un ambiente apropiado para descansar, muy cerca de la zona rosa, silencioso y muy confortable. Con personal servicial y siempre atento a brindar la mejor experiencia.",
  },
  services: {
    title: "Servicios del Hotel",
    description: "Servicios pensados para hacer tu estadía inolvidable en el corazón de Medellín",
    items: [
      {
        icon: "Users",
        title: "Recepción 24/7",
        description: "Personal servicial y amable, siempre atento a todas tus necesidades durante tu estadía."
      },
      {
        icon: "Wifi",
        title: "WiFi Gratuito",
        description: "Conexión de alta velocidad en todas las áreas del hotel y habitaciones."
      },
      {
        icon: "Wind",
        title: "Aire Acondicionado",
        description: "Todas nuestras habitaciones cuentan con aire acondicionado para tu comodidad."
      },
      {
        icon: "Users",
        title: "Asistencia con Tours",
        description: "Te ayudamos con reservas de tours y recomendaciones para explorar Medellín."
      },
      {
        icon: "MapPin",
        title: "Ubicación Estratégica",
        description: "En el corazón de El Poblado, cerca de la zona rosa y principales atracciones."
      },
      {
        icon: "CheckCircle",
        title: "Limpieza Impecable",
        description: "Mantenemos altos estándares de limpieza en todas nuestras instalaciones."
      }
    ]
  },
  rooms: {
    title: "Nuestras Habitaciones",
    description: "Habitaciones cómodas y bien equipadas para una estancia perfecta en Medellín",
    items: [
      {
        name: "Habitación Doble",
        description: "Habitación cómoda con aire acondicionado, TV por cable, ropa de cama y toallas, baño privado y caja fuerte.",
        price: "Desde $180.000/noche",
        image: "https://picsum.photos/seed/greenview-double/400/300",
        aiHint: "modern hotel double room with green views",
        pax: 2,
        wifi: true,
        airConditioning: true,
        singleBeds: 0,
        doubleBeds: 1
      },
      {
        name: "Habitación Twin",
        description: "Habitación espaciosa con aire acondicionado, TV por cable, ropa de cama y toallas, baño privado y caja fuerte.",
        price: "Desde $222.000/noche",
        image: "https://picsum.photos/seed/greenview-twin/400/300",
        aiHint: "hotel twin room with two beds",
        pax: 4,
        wifi: true,
        airConditioning: true,
        singleBeds: 2,
        doubleBeds: 0
      },
      {
        name: "Habitación Cuádruple",
        description: "Muy espaciosa con aire acondicionado, TV por cable, ropa de cama y toallas, baño privado y caja fuerte.",
        price: "Desde $299.990/noche",
        image: "https://picsum.photos/seed/greenview-quad/400/300",
        aiHint: "spacious hotel room with four beds",
        pax: 4,
        wifi: true,
        airConditioning: true,
        singleBeds: 4,
        doubleBeds: 0
      }
    ]
  },
  booking: {
    title: "Reserva Tu Habitación",
    description: "Encuentra la habitación perfecta para tu estadía. Selecciona tus fechas y consulta disponibilidad y precios en tiempo real."
  },
  location: {
    title: "Ubicación y Contacto",
    address: "Calle 14 N° 30-144 Barrio El Poblado - 050021, Medellín, Colombia",
    hours: "Recepción disponible 24/7",
    email: "reservas@greenviewmedellin.com",
    phone: "+57 316 330 2586",
    whatsapp: "+57 300 913 0619",
    mapIframe: `<iframe id="map-canvas" class="map_part" width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=es&amp;q=Calle 14 N° 30-144 Barrio El Poblado Medellín&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">Powered by <a href="https://embedgooglemaps.com">embed google maps</a></iframe>`,
    description: "Ubicados en la mejor zona de El Poblado, muy cerca de la zona rosa. Un ambiente silencioso y confortable, ideal para descansar y explorar Medellín.",
  },
  plans: {
    title: "Paquetes Especiales",
    description: "Ofertas exclusivas para hacer tu estadía aún más especial",
    items: [
      {
        name: "Paquete Romántico",
        description: "Incluye decoración especial, cena romántica y desayuno en la cama.",
        price: "$450.000",
        features: ["Suite con jacuzzi", "Cena romántica", "Desayuno incluido", "Decoración especial"]
      },
      {
        name: "Paquete Business",
        description: "Perfecto para viajeros de negocios con servicios ejecutivos incluidos.",
        price: "$320.000",
        features: ["Habitación ejecutiva", "Desayuno ejecutivo", "WiFi premium", "Late check-out"]
      },
      {
        name: "Paquete Familiar",
        description: "Diversión garantizada para toda la familia con actividades incluidas.",
        price: "$280.000",
        features: ["Suite familiar", "Desayuno buffet", "Actividades para niños", "Acceso al parque acuático"]
      }
    ]
  },
  gallery: {
    title: "Galería del Hotel",
    description: "Descubre nuestras instalaciones y espacios únicos",
    images: [
      {
        url: "https://picsum.photos/seed/hotel-lobby/800/600",
        title: "Lobby Principal",
        description: "Recepción y área de bienvenida con diseño moderno",
        aiHint: "luxury hotel lobby reception area"
      },
      {
        url: "https://picsum.photos/seed/hotel-suite-1/800/600",
        title: "Suite Premium",
        description: "Nuestra suite más exclusiva con vista panorámica",
        aiHint: "luxury hotel suite bedroom with city view"
      },
      {
        url: "https://picsum.photos/seed/hotel-restaurant/800/600",
        title: "Restaurante",
        description: "Gastronomía de alta calidad en ambiente elegante",
        aiHint: "upscale hotel restaurant dining room"
      },
      {
        url: "https://picsum.photos/seed/hotel-pool/800/600",
        title: "Piscina",
        description: "Área de piscina y relajación al aire libre",
        aiHint: "hotel rooftop pool with lounge chairs"
      },
      {
        url: "https://picsum.photos/seed/hotel-gym/800/600",
        title: "Gimnasio",
        description: "Centro de fitness completamente equipado",
        aiHint: "modern hotel fitness center gym equipment"
      },
      {
        url: "https://picsum.photos/seed/hotel-spa/800/600",
        title: "Spa & Wellness",
        description: "Centro de bienestar y relajación",
        aiHint: "hotel spa wellness center treatment room"
      },
      {
        url: "https://picsum.photos/seed/hotel-conference/800/600",
        title: "Salón de Eventos",
        description: "Espacio ideal para reuniones y celebraciones",
        aiHint: "hotel conference room event space"
      },
      {
        url: "https://picsum.photos/seed/hotel-terrace/800/600",
        title: "Terraza",
        description: "Terraza con vista espectacular de la ciudad",
        aiHint: "hotel rooftop terrace city skyline view"
      },
      {
        url: "https://picsum.photos/seed/hotel-bar/800/600",
        title: "Bar Lounge",
        description: "Bar elegante para disfrutar cócteles únicos",
        aiHint: "sophisticated hotel bar lounge cocktails"
      },
      {
        url: "https://picsum.photos/seed/hotel-room-2/800/600",
        title: "Habitación Ejecutiva",
        description: "Comodidad y elegancia en cada detalle",
        aiHint: "executive hotel room modern design"
      },
      {
        url: "https://picsum.photos/seed/hotel-bathroom/800/600",
        title: "Baño de Lujo",
        description: "Baños equipados con amenidades premium",
        aiHint: "luxury hotel bathroom marble design"
      },
      {
        url: "https://picsum.photos/seed/hotel-exterior/800/600",
        title: "Fachada del Hotel",
        description: "Arquitectura moderna en el corazón de la ciudad",
        aiHint: "modern hotel building exterior facade"
      }
    ]
  },
  faqs: {
    title: "Preguntas Frecuentes",
    items: [
      {
        question: "¿Cuál es el horario de check-in y check-out?",
        answer: "Check-in: 3:00 PM - Check-out: 12:00 PM. Ofrecemos early check-in y late check-out sujeto a disponibilidad."
      },
      {
        question: "¿El hotel cuenta con estacionamiento?",
        answer: "Sí, contamos con estacionamiento privado gratuito para todos nuestros huéspedes."
      },
      {
        question: "¿Aceptan mascotas?",
        answer: "Sí, somos pet-friendly. Se aplica una tarifa adicional de $30.000 por noche por mascota."
      },
      {
        question: "¿Qué formas de pago aceptan?",
        answer: "Aceptamos efectivo, tarjetas de crédito/débito, transferencias bancarias y pagos digitales como PSE."
      },
      {
        question: "¿Ofrecen transporte desde el aeropuerto?",
        answer: "Sí, ofrecemos servicio de transporte privado desde el aeropuerto por $45.000. Debe reservarse con anticipación."
      },
      {
        question: "¿El desayuno está incluido?",
        answer: "El desayuno está incluido en algunos paquetes. También está disponible como servicio adicional por $25.000 por persona."
      }
    ]
  },
  customSections: [] as CustomSection[],
  socials: {
    instagram: "https://www.instagram.com/hotelgreenview_/",
    facebook: "https://www.facebook.com/hotelgreenviewmedellin",
    tiktok: "https://www.tiktok.com/@hotel.greenview",
    youtube: "https://www.youtube.com/@hotelgreenviewmedellin4498"
  }
};