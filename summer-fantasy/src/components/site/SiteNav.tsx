'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flame, Server } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/wiki', label: 'Wiki' },
  { href: '/faq', label: 'FAQ' },
];

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export default function SiteNav() {
  const [pathname, setPathname] = useState('/');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setPathname(window.location.pathname);

    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 right-0 top-0 z-50 border-b-4 border-border bg-[#0f0c0b] transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.6)]' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-6">
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-bold tracking-wider text-foreground sm:text-base"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center border-2 border-[#8a1c1c] bg-[#1a0f0f] text-red-500 shadow-[inset_0_0_10px_rgba(138,28,28,0.4)]">
            <Flame className="h-5 w-5" />
          </span>
          <span className="hidden text-red-400 sm:inline">
            SUMMER <span className="text-stone-400">FANTASY</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href, pathname);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative border-b-2 px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                  active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="/wiki"
            className="flex h-10 w-10 items-center justify-center border-2 border-border bg-secondary text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Wiki"
          >
            <Server className="h-5 w-5" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center border-2 border-border bg-secondary text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b-4 border-border bg-[#0f0c0b] lg:hidden"
          >
            <div className="flex flex-col gap-1 p-2">
              {navLinks.map((link) => {
                const active = isActive(link.href, pathname);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between border-2 px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wide transition-colors ${
                      active
                        ? 'border-primary/60 bg-primary/10 text-primary'
                        : 'border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 ${active ? 'bg-primary' : 'bg-border'}`}
                      />
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
