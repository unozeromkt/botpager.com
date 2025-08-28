// src/app/admin/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>¡Bienvenido al constructor de Botpages!</CardTitle>
          <CardDescription>
            Desde aquí podrás personalizar y gestionar el contenido de tu Botpage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Utiliza el menú de la izquierda para navegar por las diferentes secciones de configuración. Podrás cambiar colores, gestionar el contenido de las secciones, añadir tus redes sociales y mucho más.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
