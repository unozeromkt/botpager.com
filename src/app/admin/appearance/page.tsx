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

// Esquema para la sección de apariencia
const appearanceSchema = z.object({
  logoUrl: z.string().url().optional().or(z.literal('')),
  iframeCode: z.string().min(1, "El código del iframe es requerido."),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Debe ser un código de color hexadecimal válido (ej: #FFFFFF)."),
});

export default function AppearancePage() {
   const form = useForm<z.infer<typeof appearanceSchema>>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      logoUrl: "",
      iframeCode: `<iframe
  id="JotFormIFrame-01971cae816e73068d6b8e6f19ab11aa4dac"
  title="ISSA: Representante de ventas Online"
  onLoad={() => {
      if (typeof window !== 'undefined' && window.parent) {
          window.parent.scrollTo(0, 0)
      }
    }
  }
  allowTransparency
  allow="geolocation; microphone; camera; fullscreen"
  src="https://agent.jotform.com/01971cae816e73068d6b8e6f19ab11aa4dac?embedMode=iframe&background=0&header=1&source=embed-next"
  frameBorder="0"
  style={{
    minWidth: '100%',
    height: '100%',
    border: 'none',
    width: '100%',
  }}
  scrolling="no"
>
</iframe>`,
      primaryColor: "#6B46C1",
    },
  });

  const onSubmit = (data: z.infer<typeof appearanceSchema>) => {
    toast({
      title: "Apariencia guardada",
      description: "La configuración de la apariencia ha sido actualizada.",
    });
    console.log(data);
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
              name="primaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Primario</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} className="w-24 h-12" />
                  </FormControl>
                  <FormDescription>Elige el color principal para tu Botpage.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
