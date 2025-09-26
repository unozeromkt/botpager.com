import { Bot, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { defaultBotpageData } from '@/lib/botpage-data-default';

export function Footer() {
  const { socials } = defaultBotpageData;
  
  return (
    <footer className="bg-transparent">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Bot className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} BotPager. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {socials.facebook && (
            <Link href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground transition-colors hover:text-primary">
              <Facebook className="h-5 w-5" />
            </Link>
          )}
          {socials.instagram && (
            <Link href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground transition-colors hover:text-primary">
              <Instagram className="h-5 w-5" />
            </Link>
          )}
          {socials.tiktok && (
            <Link href={socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground transition-colors hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
