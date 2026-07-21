'use client';

import { useState, useEffect } from 'react';
import NavBar, { sections as navSections } from './NavBar';
import Hero from '../wiki/Hero';
import Section from '../wiki/Section';
import ExpandableCard from '../wiki/ExpandableCard';
import EmberParticles from '../wiki/EmberParticles';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Shield,
  Lock,
  Flame,
  Heart,
  Skull,
  AlertTriangle,
  Hammer,
  Hand,
  Bomb,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const protectionBlocks = [
  {
    name: 'Small Protection',
    id: 'small_protection',
    radius: 12,
    size: '25 × 25',
    use: 'Refugio personal pequeño.',
  },
  {
    name: 'Medium Protection',
    id: 'medium_protection',
    radius: 30,
    size: '61 × 61',
    use: 'Base mediana.',
  },
  {
    name: 'Big Protection',
    id: 'big_protection',
    radius: 55,
    size: '111 × 111',
    use: 'Base grande o aldea.',
  },
  {
    name: 'Huge Protection',
    id: 'huge_protection',
    radius: 82,
    size: '165 × 165',
    use: 'Ciudad o proyecto enorme.',
  },
  {
    name: 'Spawn Protection',
    id: 'spawn_protection',
    radius: 128,
    size: '257 × 257',
    use: 'Zona de spawn pública.',
  },
];

const mechanics = [
  {
    title: 'Colocación',
    icon: CheckCircle2,
    desc: 'Al colocar un bloque de protección, el jugador se convierte automáticamente en propietario y se crea una zona cúbica centrada en el bloque.',
  },
  {
    title: 'Romper bloques',
    icon: Hammer,
    desc: 'El propietario puede romper bloques dentro de su zona. El bloque central requiere un pico y, al romperlo, se elimina la protección. Los no propietarios no pueden romper nada en supervivencia.',
  },
  {
    title: 'Interacciones',
    icon: Hand,
    desc: 'Los jugadores no propietarios no pueden abrir cofres, puertas, hornos ni interactuar con bloques dentro de una protección privada. La Spawn Protection permite interacciones públicas.',
  },
  {
    title: 'Protección de spawn',
    icon: Heart,
    desc: 'La Spawn Protection otorga regeneración a los jugadores dentro, bloquea el daño entre jugadores (no PvP) y permite interacciones públicas.',
  },
  {
    title: 'Explosiones',
    icon: Bomb,
    desc: 'Antes de que una explosión dañe bloques, Safety ZStones elimina de la lista de afectados todos los bloques que estén dentro de cualquier protección.',
  },
];

const tips = [
  'Coloca el bloque en el centro de tu construcción para aprovechar todo el radio.',
  'Elige el tamaño pensando en lo que vas a construir en el futuro, no solo hoy.',
  'Rompe el bloque central con cuidado: al romperlo con pico desaparece la protección.',
  'No añadas a desconocidos: solo el propietario tiene permisos dentro de la zona.',
  'Respeta la Spawn Protection pública si construyes cerca del spawn.',
];

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  const colorMap: Record<string, string> = {
    orange: 'border-orange-700 text-orange-400 bg-orange-950/50',
    red: 'border-red-800 text-red-400 bg-red-950/50',
    purple: 'border-purple-800 text-purple-400 bg-purple-950/50',
    blue: 'border-blue-800 text-blue-400 bg-blue-950/50',
    emerald: 'border-emerald-800 text-emerald-400 bg-emerald-950/50',
    slate: 'border-stone-700 text-stone-400 bg-stone-900/50',
  };
  return (
    <span className={`border-2 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colorMap[color]}`}>
      {children}
    </span>
  );
}

function WikiSidebar() {
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const offsets = navSections.map((s) => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.getBoundingClientRect().top : 0 };
      });
      const current = offsets
        .filter((o) => o.top <= 240)
        .sort((a, b) => b.top - a.top)[0];
      if (current) setActive(current.id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="sticky top-20 h-fit w-60 shrink-0">
      <div className="dungeon-panel blood-border mb-4 p-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Protección máxima</p>
        <p className="font-mono text-4xl font-bold text-red-500 animate-flicker">257×</p>
        <p className="text-xs text-red-400">Spawn Protection</p>
        <div className="mt-2 flex justify-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Shield key={i} className={`h-3 w-3 ${i < 5 ? 'text-red-600' : 'text-stone-700'}`} fill={i < 5 ? 'currentColor' : 'none'} />
          ))}
        </div>
      </div>

      <div className="dungeon-panel p-3">
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
          <Lock className="h-3.5 w-3.5" />
          Contenidos
        </h3>
        <nav className="flex flex-col gap-1">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`flex items-center gap-2 px-2 py-1.5 text-left text-xs font-medium transition-colors ${
                active === section.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <ChevronRight className={`h-3 w-3 shrink-0 ${active === section.id ? 'text-primary' : 'text-muted-foreground'}`} />
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="dungeon-panel mt-4 border-red-900/50 bg-red-950/10 p-3">
        <div className="flex items-center gap-2 text-red-400">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase">Peligro</span>
        </div>
        <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
          El bloque central debe romperse con un pico para eliminar la protección en supervivencia.
        </p>
      </div>
    </aside>
  );
}

export default function SafetyZStonesApp() {
  return (
    <>
      <EmberParticles />
      <NavBar />
      <Hero
        badge={{ text: 'Sistema de protección de bases', icon: Shield }}
        title={
          <>
            <span className="blood-text">SAFETY</span>
            <br />
            <span className="text-[#5a3a20]">ZSTONES</span>
          </>
        }
        description="Protege tu base, recursos y construcciones con bloques de protección cúbica. Solo el propietario puede construir, romper e interactuar dentro de la zona."
        primaryAction={{ label: 'Ver bloques', sectionId: 'bloques' }}
        secondaryAction={{ label: 'Mecánicas', sectionId: 'mecanicas' }}
        stats={[
          { icon: Shield, label: 'Tamaños', value: '5', color: 'text-red-500' },
          { icon: Lock, label: 'Cubo', value: 'SÍ', color: 'text-orange-400' },
          { icon: Bomb, label: 'Anti-TNT', value: 'ON', color: 'text-amber-600' },
          { icon: Heart, label: 'Spawn', value: 'SAFE', color: 'text-stone-400' },
        ]}
      />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <div className="hidden xl:block">
          <WikiSidebar />
        </div>

        <main className="min-w-0 flex-1">
          <Section
            id="bloques"
            title="Bloques de protección"
            subtitle="Cinco tamaños disponibles. Cada bloque crea un cubo centrado en sí mismo. El tamaño total se calcula como radio × 2 + 1."
            accent="orange"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {protectionBlocks.map((block) => (
                <ExpandableCard
                  key={block.id}
                  title={block.name}
                  subtitle={`Radio: ${block.radius} bloques · Tamaño: ${block.size}`}
                  badge={<Badge color="orange">{block.size}</Badge>}
                  accent="orange"
                >
                  <ul className="list-disc space-y-1.5 pl-5 text-sm">
                    <li>
                      <strong>ID interno:</strong> <code>{block.id}</code>
                    </li>
                    <li>
                      <strong>Radio:</strong> {block.radius} bloques
                    </li>
                    <li>
                      <strong>Tamaño total:</strong> {block.size}
                    </li>
                    <li>
                      <strong>Uso ideal:</strong> {block.use}
                    </li>
                  </ul>
                </ExpandableCard>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="dungeon-panel mt-6 border-primary/30 bg-primary/5 p-4"
            >
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Propiedades generales:</strong> material de piedra, alta resistencia a explosiones, requiere herramienta correcta para dropear y el bloque central debe romperse con un pico.
              </p>
            </motion.div>
          </Section>

          <Section
            id="mecanicas"
            title="Mecánicas de protección"
            subtitle="Cómo funciona cada aspecto del sistema de protección."
            accent="red"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {mechanics.map((m) => (
                <ExpandableCard
                  key={m.title}
                  title={m.title}
                  icon={undefined}
                  accent="red"
                >
                  <div className="flex items-start gap-3">
                    <div className="mc-slot flex h-10 w-10 shrink-0 items-center justify-center p-1.5">
                      <m.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p>{m.desc}</p>
                  </div>
                </ExpandableCard>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                <XCircle className="h-4 w-4" />
                ¿Quién puede romper?
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="dungeon-panel p-3"
                >
                  <p className="text-sm font-bold text-foreground">Propietario en supervivencia</p>
                  <p className="text-xs text-muted-foreground">Puede romper bloques dentro de su zona. El bloque central requiere pico.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="dungeon-panel p-3"
                >
                  <p className="text-sm font-bold text-foreground">No propietario en supervivencia</p>
                  <p className="text-xs text-muted-foreground">No puede romper ni interactuar con bloques dentro de la protección.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="dungeon-panel p-3"
                >
                  <p className="text-sm font-bold text-foreground">Jugador en creativo</p>
                  <p className="text-xs text-muted-foreground">Puede romper cualquier bloque y eliminar la protección al romper el centro.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="dungeon-panel p-3"
                >
                  <p className="text-sm font-bold text-foreground">Sin protección</p>
                  <p className="text-xs text-muted-foreground">Comportamiento normal de Minecraft.</p>
                </motion.div>
              </div>
            </div>
          </Section>

          <Section
            id="consejos"
            title="Consejos"
            subtitle="Recomendaciones para sacar el máximo provecho a Safety ZStones."
            accent="emerald"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="dungeon-panel flex items-start gap-3 p-3"
                >
                  <div className="mc-slot flex h-8 w-8 shrink-0 items-center justify-center p-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section
            id="tecnico"
            title="Resumen técnico"
            subtitle="Datos técnicos del mod."
            accent="slate"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="dungeon-panel p-4"
              >
                <h3 className="mb-2 text-sm font-bold text-foreground">Información general</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>
                    <strong>Mod ID:</strong> <code>safety_zstones</code>
                  </li>
                  <li>
                    <strong>Versión:</strong> 1.0.0
                  </li>
                  <li>
                    <strong>Minecraft:</strong> 1.20.1
                  </li>
                  <li>
                    <strong>Loader:</strong> Forge 47.4.10
                  </li>
                  <li>
                    <strong>Licencia:</strong> MIT
                  </li>
                  <li>
                    <strong>Entorno:</strong> Servidor
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="dungeon-panel p-4"
              >
                <h3 className="mb-2 text-sm font-bold text-foreground">Persistencia</h3>
                <p className="text-sm text-muted-foreground">
                  Las protecciones se guardan por dimensión usando SavedData de Forge. Cada entrada almacena el centro del bloque, el UUID del propietario y el tipo de protección.
                </p>
              </motion.div>
            </div>
          </Section>
        </main>
      </div>

      <footer className="mt-10 border-t-4 border-border bg-[#0a0808] py-8 text-center text-sm text-muted-foreground">
        <p className="mb-1 text-xl text-red-500" style={{ fontFamily: 'var(--font-heading)' }}>SAFETY ZSTONES</p>
        <p className="text-xs">Wiki para jugadores · MC 1.20.1 · Forge · Summer Fantasy</p>
        <div className="mt-3 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Shield key={i} className="h-4 w-4 text-stone-700" />
          ))}
        </div>
      </footer>
    </>
  );
}
