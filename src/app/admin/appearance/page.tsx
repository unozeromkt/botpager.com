// src/app/admin/appearance/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AppearancePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apariencia</CardTitle>
        <CardDescription>
          Personaliza los colores, el logo y el código de tu chatbot.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Próximamente aquí podrás configurar la apariencia de tu Botpage.</p>
      </CardContent>
    </Card>
  );
}
