// src/app/admin/layout.tsx
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
} from "@/components/ui/sidebar"
import { Bot, Paintbrush, FileText, Share2, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold font-headline">Botpage Admin</span>
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
                <SidebarMenuButton asChild>
                  <Link href="/admin/social">
                    <Share2 />
                    Redes Sociales
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <Settings />
          </header>
          <main className="p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
