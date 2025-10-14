// src/components/hotel/hotel-gallery.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface GalleryImage {
  url: string;
  title: string;
  description: string;
  aiHint: string;
}

interface HotelGalleryProps {
  images: GalleryImage[];
  title?: string;
  description?: string;
}

export function HotelGallery({ images, title = "Galería del Hotel", description }: HotelGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
    } else {
      newIndex = selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
    }
    
    setSelectedImageIndex(newIndex);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isLightboxOpen) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        navigateImage('prev');
        break;
      case 'ArrowRight':
        navigateImage('next');
        break;
      case 'Escape':
        closeLightbox();
        break;
    }
  };

  // Add keyboard event listeners
  useState(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <div className="space-y-6">
      {description && (
        <p className="text-muted-foreground md:text-lg text-center">{description}</p>
      )}
      
      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-muted aspect-[4/3]"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={image.aiHint}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center p-2">
                <h4 className="font-semibold text-sm mb-1">{image.title}</h4>
                <p className="text-xs text-white/80">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95">
          <VisuallyHidden>
            <DialogTitle>
              {selectedImage ? `Imagen: ${selectedImage.title}` : "Galería de imágenes"}
            </DialogTitle>
          </VisuallyHidden>
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
              onClick={() => navigateImage('next')}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Main Image */}
            {selectedImage && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden">
                <div className="relative max-w-6xl max-h-[70vh] w-full flex items-center justify-center">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    data-ai-hint={selectedImage.aiHint}
                    priority
                  />
                </div>
                
                {/* Image Info */}
                <div className="text-center text-white mt-6 max-w-2xl">
                  <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-white/80 text-lg">{selectedImage.description}</p>
                  <p className="text-white/60 text-sm mt-2">
                    {(selectedImageIndex || 0) + 1} de {images.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}