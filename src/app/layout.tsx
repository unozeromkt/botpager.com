
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  metadataBase: new URL('https://botpager.com'),
  title: 'BotPage | Tu página web con IA que vende por ti las 24 horas',
  description: 'Convierte tu negocio en una máquina de ventas con una BotPage: tu sitio web + chatbot inteligente que responde, agenda y vende por ti 24/7. Lanza tu presencia digital profesional en menos de 7 días.',
  authors: [{ name: 'UnoZero Marketing' }],
  robots: 'index, follow',
  openGraph: {
    title: 'BotPage | Tu página web con IA que vende por ti las 24 horas',
    description: 'Una BotPage es más que un sitio web. Es tu agente de ventas con IA, listo para responder y captar clientes de forma automática.',
    type: 'website',
    url: 'https://botpager.com',
    siteName: 'BotPages by UnoZero',
    images: [
      {
        url: '/img/hero-botpager.webp',
        width: 1200,
        height: 630,
        alt: 'Sitio web inteligente con IA para captar clientes 24/7',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es-CO" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
