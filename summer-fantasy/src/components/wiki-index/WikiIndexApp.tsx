'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/wiki/Hero';
import Section from '@/components/wiki/Section';
import {
  BookOpen,
  Server,
  Skull,
  Terminal,
  Shield,
  ChevronRight,
} from 'lucide-react';

const wikis = [
  {
    id: 'server',
    title: 'Server',
    subtitle: 'Guía del servidor',
    description: 'Datos técnicos, reglas, primeros pasos, economía y hoja de ruta.',
    href: '/wiki/server',
    icon: Server,
    stats: 'Todo el servidor',
    accent: 'blue' as const,
    colorClass: 'text-blue-400',
  },
  {
    id: 'scaling-difficult',
    title: 'Scaling Difficult',
    subtitle: 'Progresión y dificultad',
    description: 'Fases, raids, hordas, objetos, armaduras escaladas y materiales.',
    href: '/wiki/scaling-difficult',
    icon: Skull,
    stats: '6 fases · 5 sets',
    accent: 'red' as const,
    colorClass: 'text-red-400',
  },
  {
    id: 'eazzy-server-utils',
    title: 'Eazzy Server Utils',
    subtitle: 'Comandos y utilidades',
    description: 'Teletransporte, hogares, warps, mensajería y comandos de staff.',
    href: '/wiki/eazzy-server-utils',
    icon: Terminal,
    stats: '35+ comandos',
    accent: 'emerald' as const,
    colorClass: 'text-emerald-400',
  },
  {
    id: 'safety-zstones',
    title: 'Safety ZStones',
    subtitle: 'Protección de bases',
    description: 'Bloques de protección, mecánicas, spawn seguro y defensa.',
    href: '/wiki/safety-zstones',
    icon: Shield,
    stats: '5 tamaños',
    accent: 'orange' as const,
    colorClass: 'text-orange-400',
  },
];

const accentBorderMap = {
  blue: 'hover:border-blue-600',
  red: 'hover:border-red-600',
  emerald: 'hover:border-emerald-600',
  orange: 'hover:border-orange-600',
};

export default function WikiIndexApp() {
  return (
    <>
      <Hero
        badge={{ text: 'Documentación', icon: BookOpen }}
        title="Wiki"
        description="Toda la información que necesitas para sobrevivir y prosperar en el servidor: guías, mods propios, comandos, economía y hoja de ruta."
        primaryAction={{ label: 'Ver guías', sectionId: 'wikis' }}
        secondaryAction={{ label: 'Volver al inicio', sectionId: 'inicio' }}
        stats={[
          { icon: BookOpen, label: 'Guías', value: '4', color: 'text-orange-400' },
          { icon: Server, label: 'Mods propios', value: '3', color: 'text-blue-400' },
          { icon: Skull, label: 'Fases', value: '6', color: 'text-red-400' },
          { icon: Shield, label: 'Protecciones', value: '5', color: 'text-emerald-400' },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Section
          id="wikis"
          title="Wikis disponibles"
          subtitle="Selecciona una guía para aprender todo sobre ese sistema."
          accent="orange"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {wikis.map((wiki) => {
              const Icon = wiki.icon;
              return (
                <motion.a
                  key={wiki.id}
                  href={wiki.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`group dungeon-panel flex flex-col justify-between overflow-hidden p-5 transition-colors ${accentBorderMap[wiki.accent]}`}
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="mc-slot flex h-12 w-12 items-center justify-center">
                        <Icon className={`h-6 w-6 ${wiki.colorClass}`} />
                      </div>
                      <span className="border border-border bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {wiki.stats}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {wiki.subtitle}
                    </p>
                    <h3
                      className="mt-1 text-xl font-bold text-foreground transition-colors group-hover:text-primary"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {wiki.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {wiki.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t-2 border-border pt-4 text-xs font-bold uppercase tracking-wider text-primary transition-colors group-hover:text-foreground">
                    <span>Abrir</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </Section>

        <Section
          id="jugar"
          title="¿Listo para jugar?"
          subtitle="Vuelve a la página principal para ver la IP, reglas y cómo entrar."
          accent="red"
        >
          <div className="dungeon-panel p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Únete a Summer Fantasy
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Revisa los requisitos, la whitelist y el modpack oficial.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/"
                  className="inline-flex items-center justify-center border-2 border-[#8a1c1c] bg-[#c23b22] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0a0808] transition-colors hover:bg-[#d64a2e]"
                >
                  Volver al inicio
                </a>
                <a
                  href="/faq"
                  className="inline-flex items-center justify-center border-2 border-border bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Ver FAQ
                </a>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
