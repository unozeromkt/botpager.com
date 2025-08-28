// src/app/admin/social/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SocialPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Redes Sociales</CardTitle>
        <CardDescription>
          Añade los enlaces a tus perfiles sociales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Próximamente aquí podrás configurar tus perfiles de Instagram, Facebook, TikTok, y más.</p>
      </CardContent>
    </Card>
  );
}
