
// src/app/admin/layout.tsx
"use client";

import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Bot, Paintbrush, FileText, Share2, Settings, Eye, Download, GalleryHorizontal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { botpageData } from "@/lib/botpage-data"
import { ExamplesGallery } from "@/components/admin/examples-gallery";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
               {botpageData.appearance.logoUrl ? (
                <Image src={botpageData.appearance.logoUrl} alt="Logo" width={265} height={65} />
              ) : (
                <Bot className="h-6 w-6 text-primary" />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/appearance">
                    <Paintbrush />
                    Apariencia
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/sections">
                    <FileText />
                    Secciones
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setIsGalleryOpen(true)}>
                  <GalleryHorizontal />
                  Ejemplos
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/social">
                    <Share2 />
                    Redes Sociales
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <Button asChild variant="outline">
                <Link href="/" target="_blank">
                  <Eye className="mr-2"/>
                  Ver BotPage
                </Link>
             </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="outline">
                    <Download className="mr-2"/>
                    Exportar HTML
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings />
                </Button>
            </div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
      <ExamplesGallery isOpen={isGalleryOpen} onOpenChange={setIsGalleryOpen} />
    </SidebarProvider>
  )
}
