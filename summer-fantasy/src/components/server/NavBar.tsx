'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Server, ArrowLeft, Home } from 'lucide-react';

export const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servidor', label: 'Servidor' },
  { id: 'reglas', label: 'Reglas' },
  { id: 'primeros-pasos', label: 'Primeros pasos' },
  { id: 'economia', label: 'Economía' },
  { id: 'comandos', label: 'Comandos' },
  { id: 'dia-10', label: 'Hoja de ruta' },
];

export default function NavBar() {
  const [active, setActive] = useState('inicio');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.getBoundingClientRect().top : 0 };
      });

      const current = offsets
        .filter((o) => o.top <= 200)
        .sort((a, b) => b.top - a.top)[0];

      if (current) setActive(current.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 right-0 top-0 z-50 border-b-4 border-border bg-[#0f0c0b] shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            className="hidden items-center gap-1.5 border-2 border-border bg-secondary px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary sm:flex"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Inicio</span>
          </a>

          <button
            onClick={() => scrollTo('inicio')}
            className="flex items-center gap-2 text-sm font-bold tracking-wider text-foreground sm:text-base"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center border-2 border-[#8a1c1c] bg-[#1a0f0f] text-red-500 shadow-[inset_0_0_10px_rgba(138,28,28,0.4)]">
              <Server className="h-5 w-5" />
            </span>
            <span className="hidden text-red-400 sm:inline">
              SUMMER <span className="text-stone-400">FANTASY</span>
            </span>
          </button>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`relative border-b-2 px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                active === section.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/"
            className="flex h-10 w-10 items-center justify-center border-2 border-border bg-secondary text-foreground transition-colors hover:border-primary hover:text-primary sm:hidden"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="h-5 w-5" />
          </a>

          <div className="hidden items-center gap-2 border-2 border-border bg-secondary px-3 py-1.5 sm:flex">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Buscar en la guía...</span>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center border-2 border-border bg-secondary text-foreground hover:border-primary hover:text-primary lg:hidden"
            aria-label="Toggle menu"
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
              <div className="mb-2 flex items-center gap-2 border-2 border-border bg-secondary px-3 py-2 sm:hidden">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Buscar en la guía...</span>
              </div>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`flex items-center justify-between border-2 px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wide transition-colors ${
                    active === section.id
                      ? 'border-primary/60 bg-primary/10 text-primary'
                      : 'border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`h-2 w-2 ${active === section.id ? 'bg-primary' : 'bg-border'}`} />
                    {section.label}
                  </span>
                </button>
              ))}
              <a
                href="/"
                className="mt-1 flex items-center justify-center gap-2 border-2 border-border bg-secondary px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Volver al inicio
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
