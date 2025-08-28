import { BotFrame } from "@/components/landing/bot-frame";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function Demo4Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-accent/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
                  Conversa con el Futuro de las Finanzas
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-body">
                  Nuestro asistente de IA está listo para ayudarte. Haz una pregunta y descubre cómo podemos simplificar tu vida financiera.
                </p>
              </div>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Chatea Ahora
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
            </div>
          </div>
        </section>

        <section id="bot-section" className="w-full pb-12 md:pb-24 lg:pb-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl -mt-24">
              <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-primary/10">
                <BotFrame />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
