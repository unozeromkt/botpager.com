import { Button } from "@/components/ui/button";
import { BotFrame } from "@/components/landing/bot-frame";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground">
                    Te ayudamos a recuperar tu vida financiera.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl font-body">
                    Persona natural y pequeños comerciantes. A través de este proceso puedes salir de deudas, por medio de un acuerdo o liquidación patrimonial.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Comienza ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <BotFrame />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
