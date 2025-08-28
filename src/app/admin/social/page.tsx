// src/app/admin/social/page.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast"
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Clapperboard } from "lucide-react"

const socialLinksSchema = z.object({
  instagram: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  x: z.string().url().optional().or(z.literal('')),
})

export default function SocialPage() {
  const form = useForm<z.infer<typeof socialLinksSchema>>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      instagram: "",
      facebook: "",
      tiktok: "",
      youtube: "",
      linkedin: "",
      x: "",
    },
  })

  function onSubmit(data: z.infer<typeof socialLinksSchema>) {
    toast({
      title: "Configuración guardada",
      description: "Los enlaces a tus redes sociales han sido actualizados.",
    })
    console.log(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redes Sociales</CardTitle>
        <CardDescription>
          Añade los enlaces a tus perfiles para que aparezcan en tu Botpage.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Instagram /> Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/tu-usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Facebook /> Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/tu-pagina" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                    TikTok
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://tiktok.com/@tu-usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Youtube /> YouTube</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/c/tu-canal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Linkedin /> LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/tu-perfil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="x"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Twitter /> X (Twitter)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://x.com/tu-usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Guardar Cambios</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
