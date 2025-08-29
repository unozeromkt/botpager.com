
// src/components/admin/examples-gallery.tsx
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

interface ExamplesGalleryProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const exampleTemplates = [
  {
    title: "Restaurante de Pizzas",
    description: "Un diseño vibrante para pizzerías que desean tomar pedidos y mostrar su menú.",
    imageUrl: "https://picsum.photos/seed/pizza-template/1280/720",
    aiHint: "pizzeria website"
  },
  {
    title: "Clínica Dental",
    description: "Una plantilla limpia y profesional para agendar citas y resolver dudas de pacientes.",
    imageUrl: "https://picsum.photos/seed/dental-template/1280/720",
    aiHint: "dental clinic website"
  },
  {
    title: "Agencia de Marketing",
    description: "Un diseño moderno y dinámico para captar leads y presentar servicios.",
    imageUrl: "https://picsum.photos/seed/agency-template/1280/720",
    aiHint: "marketing agency website"
  },
  {
    title: "Veterinaria",
    description: "Una plantilla amigable para gestionar citas, emergencias y cuidado de mascotas.",
    imageUrl: "https://picsum.photos/seed/vet-template/1280/720",
    aiHint: "veterinary clinic website"
  },
];

export function ExamplesGallery({ isOpen, onOpenChange }: ExamplesGalleryProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">Galería de Ejemplos</DialogTitle>
          <DialogDescription>
            Selecciona una plantilla para empezar a construir tu BotPage.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 flex items-center justify-center px-16">
          <Carousel className="w-full max-w-4xl">
            <CarouselContent>
              {exampleTemplates.map((template, index) => (
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                        <h3 className="text-white text-3xl font-bold">{template.title}</h3>
                        <p className="text-white/80 max-w-lg mt-2">{template.description}</p>
                        <div className="mt-6">
                           <Button size="lg">Comenzar Ahora</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-50px]" />
            <CarouselNext className="right-[-50px]" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  )
}
