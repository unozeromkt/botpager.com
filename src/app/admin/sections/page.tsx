
// src/app/admin/sections/page.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { PlusCircle, Trash2 } from "lucide-react";
import { botpageData } from "@/lib/botpage-data";

// Esquema para la sección "Qué hacemos"
const whatWeDoSchema = z.object({
  title: z.string().min(1, "El título es requerido."),
  description: z.string().min(1, "La descripción es requerida."),
});

// Esquema para la sección "Sobre Nosotros"
const aboutUsSchema = z.object({
  title: z.string().min(1, "El título es requerido."),
  description: z.string().min(1, "La descripción es requerida."),
});

// Esquema para un solo servicio
const serviceSchema = z.object({
  icon: z.string().min(1, "El ícono es requerido."),
  title: z.string().min(1, "El título es requerido."),
  description: z.string().min(1, "La descripción es requerida."),
});

// Esquema para la sección de "Servicios"
const servicesSchema = z.object({
  title: z.string().min(1, "El título es requerido."),
  items: z.array(serviceSchema),
});

// Esquema para una sola pregunta frecuente
const faqSchema = z.object({
  question: z.string().min(1, "La pregunta es requerida."),
  answer: z.string().min(1, "La respuesta es requerida."),
});

// Esquema para la sección de "Preguntas Frecuentes"
const faqsSchema = z.object({
  title: z.string().min(1, "El título es requerido."),
  items: z.array(faqSchema),
});

// Esquema para una sección personalizada
const customSectionSchema = z.object({
  key: z.string().min(1, "La clave es requerida (ej: 'mi-seccion')."),
  label: z.string().min(1, "El título del tab es requerido."),
  icon: z.string().min(1, "El ícono es requerido."),
  title: z.string().min(1, "El título del contenido es requerido."),
  content: z.string().min(1, "El contenido es requerido."),
});

// Esquema para el conjunto de secciones personalizadas
const customSectionsSchema = z.object({
  sections: z.array(customSectionSchema),
});


export default function SectionsPage() {
  const whatWeDoForm = useForm<z.infer<typeof whatWeDoSchema>>({
    resolver: zodResolver(whatWeDoSchema),
    defaultValues: botpageData.whatWeDo,
  });

  const aboutUsForm = useForm<z.infer<typeof aboutUsSchema>>({
    resolver: zodResolver(aboutUsSchema),
    defaultValues: botpageData.aboutUs,
  });

  const servicesForm = useForm<z.infer<typeof servicesSchema>>({
    resolver: zodResolver(servicesSchema),
    defaultValues: botpageData.services,
  });

  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({
    control: servicesForm.control,
    name: "items",
  });

  const faqsForm = useForm<z.infer<typeof faqsSchema>>({
    resolver: zodResolver(faqsSchema),
    defaultValues: botpageData.faqs,
  });

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control: faqsForm.control,
    name: "items",
  });

  const customSectionsForm = useForm<z.infer<typeof customSectionsSchema>>({
    resolver: zodResolver(customSectionsSchema),
    defaultValues: { sections: botpageData.customSections || [] },
  });

  const { fields: customFields, append: appendCustom, remove: removeCustom } = useFieldArray({
    control: customSectionsForm.control,
    name: "sections",
  });
  
  const onSubmit = (data: any, section: string) => {
    toast({
      title: `Sección "${section}" guardada`,
      description: "El contenido ha sido actualizado (simulado).",
    });
    console.log("Guardando datos para:", section, data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Secciones</CardTitle>
        <CardDescription>
          Gestiona la información de las secciones de tu Botpage.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="what-we-do" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="what-we-do">Qué hacemos</TabsTrigger>
            <TabsTrigger value="about-us">Sobre Nosotros</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="custom">Personalizadas</TabsTrigger>
          </TabsList>

          {/* Pestaña: Qué hacemos */}
          <TabsContent value="what-we-do">
            <Form {...whatWeDoForm}>
              <form onSubmit={whatWeDoForm.handleSubmit(data => onSubmit(data, "Qué hacemos"))} className="space-y-8 mt-6">
                <FormField
                  control={whatWeDoForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe lo que hace tu negocio..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Guardar Cambios</Button>
              </form>
            </Form>
          </TabsContent>
          
          {/* Pestaña: Sobre Nosotros */}
          <TabsContent value="about-us">
            <Form {...aboutUsForm}>
              <form onSubmit={aboutUsForm.handleSubmit(data => onSubmit(data, "Sobre Nosotros"))} className="space-y-8 mt-6">
                 <FormField
                  control={aboutUsForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Cuenta la historia de tu empresa..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Guardar Cambios</Button>
              </form>
            </Form>
          </TabsContent>
          
          {/* Pestaña: Servicios */}
          <TabsContent value="services">
             <Form {...servicesForm}>
              <form onSubmit={servicesForm.handleSubmit(data => onSubmit(data, "Servicios"))} className="space-y-8 mt-6">
                {serviceFields.map((field, index) => (
                  <Card key={field.id} className="relative p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={servicesForm.control}
                        name={`items.${index}.icon`}
                        render={({ field }) => (
                           <FormItem>
                            <FormLabel>Ícono (Lucide)</FormLabel>
                            <FormControl><Input {...field} placeholder="Ej: Rocket" /></FormControl>
                            <FormMessage />
                           </FormItem>
                        )}
                      />
                      <FormField
                        control={servicesForm.control}
                        name={`items.${index}.title`}
                        render={({ field }) => (
                           <FormItem>
                            <FormLabel>Título del Servicio</FormLabel>
                            <FormControl><Input {...field} placeholder="Ej: Desarrollo Web" /></FormControl>
                            <FormMessage />
                           </FormItem>
                        )}
                      />
                       <FormField
                        control={servicesForm.control}
                        name={`items.${index}.description`}
                        render={({ field }) => (
                           <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl><Input {...field} placeholder="Descripción corta" /></FormControl>
                            <FormMessage />
                           </FormItem>
                        )}
                      />
                    </div>
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeService(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </Card>
                ))}
                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => appendService({ icon: "Briefcase", title: "", description: "" })}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Añadir Servicio
                    </Button>
                    <Button type="submit">Guardar Cambios</Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          {/* Pestaña: FAQs */}
          <TabsContent value="faqs">
             <Form {...faqsForm}>
              <form onSubmit={faqsForm.handleSubmit(data => onSubmit(data, "FAQs"))} className="space-y-8 mt-6">
                {faqFields.map((field, index) => (
                  <Card key={field.id} className="relative p-4 space-y-4">
                     <FormField
                        control={faqsForm.control}
                        name={`items.${index}.question`}
                        render={({ field }) => (
                           <FormItem>
                            <FormLabel>Pregunta</FormLabel>
                            <FormControl><Input {...field} placeholder="¿Cuál es la pregunta?" /></FormControl>
                            <FormMessage />
                           </FormItem>
                        )}
                      />
                       <FormField
                        control={faqsForm.control}
                        name={`items.${index}.answer`}
                        render={({ field }) => (
                           <FormItem>
                            <FormLabel>Respuesta</FormLabel>
                            <FormControl><Textarea {...field} placeholder="Escribe la respuesta aquí..." /></FormControl>
                            <FormMessage />
                           </FormItem>
                        )}
                      />
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeFaq(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </Card>
                ))}
                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => appendFaq({ question: "", answer: "" })}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Añadir Pregunta
                    </Button>
                    <Button type="submit">Guardar Cambios</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
           {/* Pestaña: Secciones Personalizadas */}
           <TabsContent value="custom">
             <Form {...customSectionsForm}>
              <form onSubmit={customSectionsForm.handleSubmit(data => onSubmit(data, "Personalizadas"))} className="space-y-8 mt-6">
                 <CardDescription>Crea tus propias secciones de contenido para la Botpage.</CardDescription>
                {customFields.map((field, index) => (
                  <Card key={field.id} className="relative p-4 space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <FormField
                          control={customSectionsForm.control}
                          name={`sections.${index}.key`}
                          render={({ field }) => (
                             <FormItem>
                              <FormLabel>Clave Única</FormLabel>
                              <FormControl><Input {...field} placeholder="ejemplo-seccion" /></FormControl>
                               <FormDescription>Identificador sin espacios.</FormDescription>
                              <FormMessage />
                             </FormItem>
                          )}
                        />
                         <FormField
                          control={customSectionsForm.control}
                          name={`sections.${index}.label`}
                          render={({ field }) => (
                             <FormItem>
                              <FormLabel>Título del Tab</FormLabel>
                              <FormControl><Input {...field} placeholder="Mi Nueva Sección" /></FormControl>
                               <FormDescription>El texto que se verá en el menú.</FormDescription>
                              <FormMessage />
                             </FormItem>
                          )}
                        />
                         <FormField
                          control={customSectionsForm.control}
                          name={`sections.${index}.icon`}
                          render={({ field }) => (
                             <FormItem>
                              <FormLabel>Ícono (Lucide)</FormLabel>
                              <FormControl><Input {...field} placeholder="Star" /></FormControl>
                               <FormDescription>Nombre del ícono.</FormDescription>
                              <FormMessage />
                             </FormItem>
                          )}
                        />
                     </div>
                     <FormField
                        control={customSectionsForm.control}
                        name={`sections.${index}.title`}
                        render={({ field }) => (
                           <FormItem>
                            <FormLabel>Título del Contenido</FormLabel>
                            <FormControl><Input {...field} placeholder="El título principal de tu sección" /></FormControl>
                            <FormMessage />
                           </FormItem>
                        )}
                      />
                       <FormField
                        control={customSectionsForm.control}
                        name={`sections.${index}.content`}
                        render={({ field }) => (
                           <FormItem>
                            <FormLabel>Contenido (Editor Básico)</FormLabel>
                            <FormControl><Textarea rows={8} {...field} placeholder="Escribe aquí tu contenido. Puedes usar saltos de línea." /></FormControl>
                            <FormDescription>Este es un editor de texto simple. Futuramente será un editor WYSIWYG.</FormDescription>
                            <FormMessage />
                           </FormItem>
                        )}
                      />
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeCustom(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </Card>
                ))}
                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => appendCustom({ key: "", label: "", icon: "FileText", title: "", content: "" })}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Añadir Sección
                    </Button>
                    <Button type="submit">Guardar Cambios</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
