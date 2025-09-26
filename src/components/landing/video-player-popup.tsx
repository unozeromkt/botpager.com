
// src/components/landing/video-player-popup.tsx
"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

interface VideoPlayerPopupProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  youtubeUrl?: string
  localVideoUrl?: string
}

export function VideoPlayerPopup({ isOpen, onOpenChange, youtubeUrl, localVideoUrl }: VideoPlayerPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl w-full p-0 bg-transparent border-0">
        <div className="aspect-video">
          {youtubeUrl ? (
            <iframe 
              src={youtubeUrl} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          ) : localVideoUrl ? (
            <video 
              controls 
              autoPlay 
              className="w-full h-full rounded-lg"
              poster="/img/hero-botpager.webp"
            >
              <source src={localVideoUrl} type="video/webm" />
              <source src={localVideoUrl.replace('.webm', '.mp4')} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
