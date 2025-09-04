import { Bot } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { defaultBotpageData } from '@/lib/botpage-data-default';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
             {defaultBotpageData.appearance.logoUrl ? (
              <Image src={defaultBotpageData.appearance.logoUrl} alt="Logo" width={265} height={65} />
            ) : (
              <Bot className="h-8 w-8 text-primary" />
            )}
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <Link href="/form" target="_blank">
              Empezar ahora
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
