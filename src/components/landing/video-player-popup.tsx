
// src/components/landing/video-player-popup.tsx
"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

interface VideoPlayerPopupProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  youtubeUrl: string
}

export function VideoPlayerPopup({ isOpen, onOpenChange, youtubeUrl }: VideoPlayerPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl w-full p-0 bg-transparent border-0">
        <div className="aspect-video">
           <iframe 
             src={youtubeUrl} 
             title="YouTube video player" 
             frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
             allowFullScreen
             className="w-full h-full rounded-lg"
           ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}
