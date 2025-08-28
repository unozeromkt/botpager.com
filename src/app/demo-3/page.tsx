import { Badge } from "@/components/ui/badge";
import { BotFrame } from "@/components/landing/bot-frame";

export default function Demo3Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <Badge className="bg-primary text-primary-foreground">
                Vende, Responde Y Convierte 24/7
              </Badge>
              <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Adelanta A Tu Competencia <br /> Con Una{" "}
                  <span className="rounded-full bg-primary px-4 py-1 text-primary-foreground">
                    BotPage
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-body">
                  Automatiza tu servicio al cliente, recibe reservas y capta clientes.
                  Combinamos un sitio web de alta conversión con Inteligencia Artificial que vende y brinda soporte a tu negocio 24/7.
                </p>
              </div>
              <div className="w-full max-w-4xl pt-8">
                <BotFrame />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
