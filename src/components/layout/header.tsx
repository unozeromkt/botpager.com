import { Bot } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { botpageData } from '@/lib/botpage-data';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
             {botpageData.appearance.logoUrl ? (
              <Image src={botpageData.appearance.logoUrl} alt="Logo" width={32} height={32} />
            ) : (
              <Bot className="h-8 w-8 text-primary" />
            )}
            <span className="font-bold font-headline">Botpage</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/admin/appearance">
              Admin
            </Link>
          </Button>
          <Button>Empezar ahora</Button>
        </div>
      </div>
    </header>
  );
}
