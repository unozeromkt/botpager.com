
// src/app/admin/appearance/page.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { botpageData } from "@/lib/botpage-data";
import { useEffect } from "react";

// Esquema para la sección de apariencia
const appearanceSchema = z.object({
  logoUrl: z.string().url().optional().or(z.literal('')),
  heroImageUrl: z.string().url().optional().or(z.literal('')),
  iframeCode: z.string().min(1, "El código del iframe es requerido."),
  primaryColor: z.string().regex(/^#[A-Fa-f0-9]{6}$/, "Debe ser un código de color hexadecimal de 6 dígitos (ej: #FFFFFF)."),
  backgroundColor: z.string().regex(/^#[A-Fa-f0-9]{6}$/, "Debe ser un código de color hexadecimal de 6 dígitos (ej: #FFFFFF)."),
});

function hexToHsl(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "0 0% 0%";
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return `${h} ${s}% ${l}%`;
}


export default function AppearancePage() {
   const form = useForm<z.infer<typeof appearanceSchema>>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      logoUrl: botpageData.appearance.logoUrl,
      heroImageUrl: botpageData.appearance.heroImageUrl,
      iframeCode: botpageData.appearance.iframeCode,
      primaryColor: botpageData.appearance.primaryColor,
      backgroundColor: botpageData.appearance.backgroundColor,
    },
  });

   const watchPrimary = form.watch("primaryColor");
   const watchBackground = form.watch("backgroundColor");

   useEffect(() => {
    if (document.documentElement) {
      document.documentElement.style.setProperty('--primary-dynamic', hexToHsl(watchPrimary));
      document.documentElement.style.setProperty('--background-dynamic', hexToHsl(watchBackground));
    }
  }, [watchPrimary, watchBackground]);


  const onSubmit = (data: z.infer<typeof appearanceSchema>) => {
    // This would in a real scenario save to a database.
    // For now, we'll just show a toast.
    toast({
      title: "Apariencia guardada",
      description: "La configuración de la apariencia ha sido actualizada (simulado).",
    });
    console.log("Saving data...", data);
    console.log("Primary HSL:", hexToHsl(data.primaryColor))
    console.log("Background HSL:", hexToHsl(data.backgroundColor))
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apariencia</CardTitle>
        <CardDescription>
          Personaliza los colores, el logo y el código de tu chatbot.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL del Logo</FormLabel>
                      <FormControl>
                        <Input placeholder="https://tu-empresa.com/logo.png" {...field} />
                      </FormControl>
                      <FormDescription>Pega la URL de una imagen para tu logo.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heroImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de Imagen de Héroe</FormLabel>
                      <FormControl>
                        <Input placeholder="https://picsum.photos/800/600" {...field} />
                      </FormControl>
                      <FormDescription>Imagen principal para la sección de inicio.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="primaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Primario</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="color" {...field} className="w-24 h-12 p-1" />
                         <span className="absolute left-28 top-1/2 -translate-y-1/2 font-mono text-muted-foreground">{field.value.toUpperCase()}</span>
                      </div>
                    </FormControl>
                    <FormDescription>Elige el color principal para tu Botpage.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color de Fondo</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Input type="color" {...field} className="w-24 h-12 p-1" />
                        <span className="absolute left-28 top-1/2 -translate-y-1/2 font-mono text-muted-foreground">{field.value.toUpperCase()}</span>
                      </div>
                    </FormControl>
                    <FormDescription>Elige el color de fondo para tu Botpage.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="iframeCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código del Chatbot (iframe)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Pega aquí el código embed de tu chatbot..." rows={10} {...field} />
                  </FormControl>
                  <FormDescription>
                    Este código se insertará para mostrar tu bot en la página.
                  </FormDescription>
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
