// src/app/admin/sections/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SectionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Secciones</CardTitle>
        <CardDescription>
          Gestiona la información de las secciones como "Qué hacemos", "Sobre nosotros", etc.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Próximamente aquí podrás añadir y editar el contenido de las secciones de tu Botpage.</p>
      </CardContent>
    </Card>
  );
}
