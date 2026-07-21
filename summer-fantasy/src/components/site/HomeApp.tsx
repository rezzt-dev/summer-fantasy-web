'use client';

import { useEffect, useState } from 'react';
import { animate } from 'animejs';

import Hero from '@/components/wiki/Hero';
import Section from '@/components/wiki/Section';
import ExpandableCard from '@/components/wiki/ExpandableCard';
import LoreTeaser from './LoreTeaser';
import {
  Flame,
  Shield,
  Swords,
  MessageCircle,
  Globe,
  FileText,
  Wrench,
  Gamepad2,
  Server,
  Skull,
  BookOpen,
  Copy,
  Check,
} from 'lucide-react';

interface ServerData {
  version: string;
  loader: string;
  region: string;
  ip: string;
  modCount?: number;
  slots?: number;
}

const steps = [
  {
    step: '1',
    title: 'Solicita acceso',
    text: 'Contacta al staff por Discord. El servidor requiere whitelist y cuenta premium de Minecraft.',
    icon: FileText,
    accent: 'blue' as const,
  },
  {
    step: '2',
    title: 'Instala el modpack',
    text: 'Descarga e instala el modpack oficial desde CurseForge siguiendo la guía del Discord privado.',
    icon: Wrench,
    accent: 'emerald' as const,
  },
  {
    step: '3',
    title: 'Conéctate',
    text: 'Añade la IP del servidor en Minecraft 1.20.1 con Forge y entra al mundo.',
    icon: Gamepad2,
    accent: 'orange' as const,
  },
];

const rules = [
  {
    title: 'PvP respetuoso',
    text: 'El PvP está permitido, pero debe ser respetuoso. No se tolera el acoso constante ni el spam de ataques.',
    icon: Swords,
    accent: 'red' as const,
  },
  {
    title: 'Prohibido griefear y robar',
    text: 'Está terminantemente prohibido destruir o robar construcciones de otros jugadores. Usa Safety ZStones.',
    icon: Shield,
    accent: 'emerald' as const,
  },
  {
    title: 'Soporte por Discord',
    text: 'Para reportar problemas o pedir ayuda, contacta al staff por mensaje privado en el Discord privado.',
    icon: MessageCircle,
    accent: 'blue' as const,
  },
  {
    title: 'Mundo persistente',
    text: 'El mundo no se reinicia. Todo lo que construyas queda guardado, pero los recursos son limitados.',
    icon: Globe,
    accent: 'orange' as const,
  },
];

const firstSteps = [
  'Recolecta madera, piedra y alimento como en un mundo normal.',
  'Construye un refugio temporal antes de que anochezca.',
  'Establece tu /home en un lugar seguro.',
  'Protege tu base con Safety ZStones lo antes posible.',
  'Avanza poco a poco en equipamiento y tecnología.',
];

export default function HomeApp({
  server,
}: {
  server: ServerData;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const animated = new WeakSet<Element>();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animated.has(entry.target)) return;
          animated.add(entry.target);

          (entry.target as HTMLElement).style.opacity = '0';
          animate(entry.target, {
            opacity: [0, 1],
            translateY: [24, 0],
            scale: [0.96, 1],
            duration: 500,
            ease: 'outBack(1.4)',
          });
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  const stats = [
    { label: 'Versión', value: server.version, suffix: '', icon: Server, color: 'text-blue-400' },
    { label: 'Mods', value: String(server.modCount ?? 0), suffix: '+', icon: BookOpen, color: 'text-orange-400' },
    { label: 'Slots', value: String(server.slots ?? 0), suffix: '', icon: Globe, color: 'text-emerald-400' },
    { label: 'Dificultad', value: 'Progresiva', suffix: '', icon: Skull, color: 'text-red-400' },
  ];

  return (
    <>
      <Hero
        badge={{ text: 'Servidor activo', icon: Flame }}
        title="Summer Fantasy"
        description="Servidor de supervivencia extrema con tecnología, magia, bosses y combate. Un mundo peligroso que evoluciona cada día."
        primaryAction={{ label: 'Cómo entrar', sectionId: 'como-entrar' }}
        stats={stats.map((s) => ({ ...s, icon: s.icon }))}
      />

      <div className="border-b-4 border-border bg-background py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">IP del servidor</p>
            <p className="font-mono text-lg font-bold text-foreground sm:text-xl">{server.ip}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(server.ip);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="inline-flex items-center gap-2 border-2 border-border bg-secondary px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Copiar IP del servidor"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copiada' : 'Copiar IP'}</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Section id="como-entrar" title="Cómo entrar" subtitle="Tres pasos para unirte a la aventura." accent="orange">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="dungeon-panel scroll-reveal overflow-hidden p-5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="mc-slot flex h-12 w-12 items-center justify-center">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center border-2 border-border bg-secondary text-sm font-bold text-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        <LoreTeaser />

        <Section id="reglas" title="Reglas principales" subtitle="Normas básicas para que la experiencia sea divertida para todos." accent="emerald">
          <div className="grid gap-4 sm:grid-cols-2">
            {rules.map((rule) => (
              <ExpandableCard
                key={rule.title}
                title={rule.title}
                icon={<rule.icon className="h-6 w-6 text-foreground" />}
                accent={rule.accent}
              >
                <p className="text-sm leading-relaxed text-muted-foreground">{rule.text}</p>
              </ExpandableCard>
            ))}
          </div>
        </Section>

        <Section id="primeros-pasos" title="Primeros pasos" subtitle="Consejos para sobrevivir tus primeros días." accent="orange">
          <div className="dungeon-panel scroll-reveal p-5 sm:p-6">
            <ol className="space-y-3">
              {firstSteps.map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-muted-foreground">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center border-2 border-border bg-secondary text-sm font-bold text-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-1 leading-relaxed">{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section id="soporte" title="Soporte y comunidad" subtitle="¿Necesitas ayuda o quieres solicitar acceso?" accent="red">
          <div className="dungeon-panel scroll-reveal p-5 sm:p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  El servidor utiliza un <strong className="text-foreground">Discord privado</strong> para jugadores.
                  Allí se gestiona la whitelist, se comparte la guía de instalación y se resuelven dudas.
                </p>
                <p className="mt-3 text-sm text-foreground">
                  <span className="text-muted-foreground">Staff:</span>{' '}
                  <span className="border border-border bg-secondary px-2 py-0.5 text-primary">rezztdev</span>
                </p>
              </div>
              <a
                href="/faq"
                className="inline-flex items-center justify-center border-2 border-[#8a1c1c] bg-[#c23b22] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0a0808] transition-colors hover:bg-[#d64a2e]"
              >
                Ver FAQ
              </a>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
