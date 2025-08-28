import { Bot } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">FinanceFlow AI</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">Demo 1</Link>
            <Link href="/demo-2" className="text-muted-foreground transition-colors hover:text-foreground">Demo 2</Link>
            <Link href="/demo-3" className="text-muted-foreground transition-colors hover:text-foreground">Demo 3</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost">Iniciar Sesión</Button>
          <Button>Registrarse</Button>
        </div>
      </div>
    </header>
  );
}
