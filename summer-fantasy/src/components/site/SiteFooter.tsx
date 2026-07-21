'use client';

import { Flame, Heart } from 'lucide-react';

const footerLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/wiki', label: 'Wiki' },
  { href: '/faq', label: 'FAQ' },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t-4 border-border bg-[#0a0808] py-10">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-0 h-32 w-32 rounded-full bg-red-900/20 blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-orange-900/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a
            href="/"
            className="flex items-center gap-3 text-lg font-bold tracking-wider text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center border-2 border-[#8a1c1c] bg-[#1a0f0f] text-red-500 shadow-[inset_0_0_10px_rgba(138,28,28,0.4)]">
              <Flame className="h-5 w-5" />
            </span>
            <span className="text-red-400">
              SUMMER <span className="text-stone-400">FANTASY</span>
            </span>
          </a>

          <nav aria-label="Enlaces del pie de página">
            <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-lg px-3 py-1.5 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t-2 border-border/40 pt-6 text-center sm:flex-row">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            © {currentYear} Summer Fantasy
          </p>
          <span className="hidden text-border sm:inline">·</span>
          <p className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
            Hecho con <Heart className="h-3 w-3 text-red-500" /> para la comunidad
          </p>
        </div>
      </div>
    </footer>
  );
}
