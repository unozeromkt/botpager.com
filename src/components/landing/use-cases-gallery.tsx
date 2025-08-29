
// src/components/landing/use-cases-gallery.tsx
"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

interface UseCasesGalleryProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const useCases = [
  {
    title: "Restaurantes",
    description: "Toma de pedidos automatizada, menús interactivos y reservas 24/7.",
    imageUrl: "https://picsum.photos/seed/restaurant/1280/720",
    aiHint: "modern restaurant interior"
  },
  {
    title: "Clínicas y Consultorios",
    description: "Agendamiento de citas, recordatorios automáticos y resolución de dudas frecuentes.",
    imageUrl: "https://picsum.photos/seed/clinic/1280/720",
    aiHint: "dental clinic waiting room"
  },
  {
    title: "Agencias de Marketing y Servicios",
    description: "Captación y calificación de leads, presentación de portafolios y agendamiento de reuniones.",
    imageUrl: "https://picsum.photos/seed/agency/1280/720",
    aiHint: "modern office space"
  },
  {
    title: "Veterinarias",
    description: "Gestión de citas para mascotas, recordatorios de vacunación y consultas de emergencia.",
    imageUrl: "https://picsum.photos/seed/veterinary/1280/720",
    aiHint: "veterinary clinic examination room"
  },
    {
    title: "Coaching y Consultoría",
    description: "Venta de sesiones, agendamiento de llamadas de descubrimiento y entrega de recursos.",
    imageUrl: "https://picsum.photos/seed/coaching/1280/720",
    aiHint: "person coaching online meeting"
  },
  {
    title: "Tiendas Online (E-commerce)",
    description: "Soporte al cliente, seguimiento de pedidos, recomendaciones de productos y recuperación de carritos.",
    imageUrl: "https://picsum.photos/seed/ecommerce/1280/720",
    aiHint: "online shopping interface"
  },
];

export function UseCasesGallery({ isOpen, onOpenChange }: UseCasesGalleryProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] h-[90vh] flex flex-col p-0 bg-card/80 backdrop-blur-lg border-white/10 shadow-2xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl text-card-foreground">Casos de Uso</DialogTitle>
          <DialogDescription>
            Explora cómo una Botpage puede transformar diferentes tipos de negocios.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 flex items-center justify-center px-4 sm:px-16">
          <Carousel className="w-full max-w-4xl">
            <CarouselContent>
              {useCases.map((template, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                        src={template.imageUrl}
                        alt={template.title}
                        fill
                        className="object-cover"
                        data-ai-hint={template.aiHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                        <h3 className="text-white text-3xl font-bold">{template.title}</h3>
                        <p className="text-white/80 max-w-lg mt-2">{template.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-[-50px]" />
            <CarouselNext className="right-2 sm:right-[-50px]" />
          </Carousel>
        </div>
         <div className="flex justify-center pb-8">
            <Button size="lg" className="text-lg px-8 py-6">Comenzar Ahora</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
