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
  Map,
  Shield,
  Pickaxe,
  Sword,
  Heart,
  Skull,
  Coins,
  Home,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Backpack,
  Server,
  Globe,
  Lock,
  MessageCircle,
} from 'lucide-react';

const serverStats = [
  { label: 'Versión', value: '1.20.1', color: 'text-red-500', icon: Server },
  { label: 'Mods', value: '261', color: 'text-orange-400', icon: Backpack },
  { label: 'Slots', value: '10', color: 'text-amber-600', icon: Users },
  { label: 'Región', value: 'Europa', color: 'text-stone-400', icon: Globe },
];

const serverInfo = [
  {
    title: 'Datos técnicos',
    icon: Server,
    content: [
      'Minecraft 1.20.1 con Forge.',
      '261 mods de contenido y calidad de vida.',
      '10 slots disponibles.',
      'IP: summer-fantasy.dg.vg.',
      'Región: Europa (Francia).',
      'Cuenta premium y whitelist obligatorias.',
    ],
  },
  {
    title: 'Cómo entrar',
    icon: Lock,
    content: [
      'Solicita acceso al staff para que te añadan a la whitelist.',
      'Descarga e instala el modpack desde CurseForge siguiendo la guía del Discord privado.',
      'Conéctate a la IP summer-fantasy.dg.vg.',
    ],
  },
  {
    title: 'Comunidad y staff',
    icon: MessageCircle,
    content: [
      'Staff destacado: rezztdev (rezzt.dev).',
      'Discord privado para jugadores: guía de instalación, soporte y gestión de whitelist.',
      'Para reportar problemas o pedir ayuda, contacta al staff por MD en Discord.',
    ],
  },
  {
    title: 'Notas importantes',
    icon: AlertTriangle,
    content: [
      'El mundo es persistente y no se reinicia; los recursos son limitados.',
      'No hay eventos ni misiones periódicas programadas.',
      'Los teams existen como elemento estético y de organización, pero no se pueden cambiar una vez elegidos.',
    ],
  },
];

const rules = [
  { title: 'PvP respetuoso', desc: 'El PvP está permitido siempre que sea respetuoso y sin spam de ataques. No se tolera el acoso constante.', icon: Sword },
  { title: 'Griefing prohibido', desc: 'Está terminantemente prohibido destruir construcciones de otros jugadores.', icon: Skull },
  { title: 'Robo prohibido', desc: 'No robes objetos de otros jugadores. Usa Safety ZStones para proteger tus pertenencias.', icon: Lock },
  { title: 'Normas generales', desc: 'No hay reglas específicas por team; las normas generales aplican a todos.', icon: Shield },
];

const beforeStart = [
  { title: 'Whitelist y cuenta premium', desc: 'Summer Fantasy requiere cuenta premium de Minecraft y whitelist. Solicita acceso al staff por Discord privado antes de intentar conectar.', icon: Users },
  { title: 'Instala el modpack', desc: 'Descarga e instala el perfil oficial de CurseForge. La guía de instalación se comparte en el Discord privado del servidor.', icon: Backpack },
  { title: 'IP del servidor', desc: 'Añade la IP summer-fantasy.dg.vg en Minecraft 1.20.1 con Forge. La región es Europa (Francia) y hay 10 slots.', icon: Terminal },
  { title: 'Mundo persistente', desc: 'El mundo no se reinicia. Todo lo que construyas queda guardado, pero los recursos son limitados. Piensa antes de gastar materiales raros.', icon: Map },
];

const day1Tasks = [
  { title: 'Recolecta lo básico', desc: 'Madera, piedra, carbón y comida. Prioriza el hierro antes del anochecer.', icon: Pickaxe },
  { title: 'Construye un refugio temporal', desc: 'No necesita ser bonito, solo seguro. Una cueva iluminada o una cabaña pequeña valen.', icon: Home },
  { title: 'Establece tu /home', desc: 'Usa /sethome [nombre] para guardar tu posición. Por defecto se llama home. Es gratis y salvavidas.', icon: Home },
  { title: 'No salgas de noche solo', desc: 'Aunque el día 1 es relativamente tranquilo, los mobs hostiles son peligrosos sin armadura.', icon: Skull },
];

const days2to5Tasks = [
  { title: 'Consigue armadura de hierro', desc: 'Minera básica: hierro, carbón y cobre. El cobre será útil para la economía.', icon: Shield },
  { title: 'Asegura comida estable', desc: 'Granja básica de trigo, zanahorias o animales. Farmer’s Delight amplía las opciones de comida.', icon: Heart },
  { title: 'Protege tu base con Safety ZStones', desc: 'Coloca un bloque de protección en el centro de tu base lo antes posible. Empieza con Small o Medium según tus planes.', icon: Shield },
  { title: 'Explora estructuras cercanas', desc: 'Dungeons and Taverns, Towns and Towers y otras estructuras añaden loot útil. Ve con cuidado.', icon: Map },
  { title: 'Guarda recursos valiosos', desc: 'No lleves todo el inventario cuando explores. Usa cofres seguros dentro de tu protección.', icon: Backpack },
];

const commands = [
  { cmd: '/spawn', desc: 'Vuelve al spawn seguro.', icon: Home },
  { cmd: '/home [nombre]', desc: 'Teletransporte a tu hogar.', icon: Home },
  { cmd: '/sethome [nombre]', desc: 'Guarda tu posición actual como hogar.', icon: Home },
  { cmd: '/back', desc: 'Regresa a donde moriste o te teletransportaste.', icon: Map },
  { cmd: '/warp <nombre>', desc: 'Viaja a un warp público del servidor.', icon: Map },
  { cmd: '/tpa <jugador>', desc: 'Solicita teletransportarte a otro jugador.', icon: Users },
  { cmd: '/msg <jugador> <mensaje>', desc: 'Envía un mensaje privado.', icon: Terminal },
];

const roadmap = [
  { day: 'Día 1', focus: 'Supervivencia básica', tasks: ['Madera, piedra, carbón, comida', 'Refugio temporal', '/sethome'] },
  { day: 'Día 2-3', focus: 'Protección y hierro', tasks: ['Armadura de hierro', 'Herramientas de hierro', 'Safety ZStones Small/Medium'] },
  { day: 'Día 4-5', focus: 'Economía y exploración', tasks: ['Vende cobre y recursos básicos', 'Explora estructuras cercanas', 'Mejora tu base'] },
  { day: 'Día 6-7', focus: 'Preparación', tasks: ['Arco y flechas', 'Pociones básicas', 'Comida de calidad (Farmer’s Delight)'] },
  { day: 'Día 8-9', focus: 'Equipo para el día 10', tasks: ['Armadura completa de hierro o mejor', 'Arma encantada si es posible', 'Refuerza tu protección'] },
  { day: 'Día 10', focus: 'El Despertar', tasks: ['Primera raid: El Despertado', 'Mobs con armadura básica', '+15% de velocidad en zombis y creepers'] },
];

const finalTips = [
  'No confíes ciegamente en Revive Me ni Corail Tombstone: son segundas oportunidades, no invencibilidad.',
  'Explora en grupo para calabozos y jefes; solo es arriesgado.',
  'Aprovecha JEI para aprender crafteos y Jade para ver información de bloques.',
  'Usa Xaero’s Minimap y World Map para no perderte.',
  'El PvP está permitido de forma respetuosa: no ataques sin motivo ni acoses.',
  'Consulta las wikis de Scaling Difficult, Eazzy Server Utils y Safety ZStones para profundizar.',
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

function BackToHomeButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="/"
      className={`inline-flex items-center gap-2 border-2 border-border bg-secondary px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary ${className}`}
    >
      <Home className="h-4 w-4" />
      Volver al inicio
    </a>
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
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Objetivo</p>
        <p className="font-mono text-4xl font-bold text-red-500 animate-flicker">Día 10</p>
        <p className="text-xs text-red-400">Sobrevive al Despertar</p>
        <div className="mt-2 flex justify-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Clock key={i} className={`h-3 w-3 ${i < 3 ? 'text-red-600' : 'text-stone-700'}`} fill={i < 3 ? 'currentColor' : 'none'} />
          ))}
        </div>
      </div>

      <div className="dungeon-panel mb-4 p-3">
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
          <Map className="h-3.5 w-3.5" />
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

      <div className="dungeon-panel p-3">
        <BackToHomeButton className="w-full justify-center" />
      </div>

      <div className="dungeon-panel mt-4 border-red-900/50 bg-red-950/10 p-3">
        <div className="flex items-center gap-2 text-red-400">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase">Recuerda</span>
        </div>
        <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
          Griefear y robar están prohibidos. Usa Safety ZStones para protegerte y reporta incidentes al staff.
        </p>
      </div>
    </aside>
  );
}

export default function ServerApp() {
  return (
    <>
      <EmberParticles />
      <NavBar />
      <Hero
        badge={{ text: 'Servidor de Minecraft 1.20.1 · Forge', icon: Server }}
        title={
          <>
            <span className="blood-text">SUMMER</span>
            <br />
            <span className="text-[#5a3a20]">FANTASY</span>
          </>
        }
        description="Guía completa del servidor: datos técnicos, reglas, primeros pasos, economía y hoja de ruta para llegar al día 10 preparado."
        primaryAction={{ label: 'Conocer el servidor', sectionId: 'servidor' }}
        secondaryAction={{ label: 'Primeros pasos', sectionId: 'primeros-pasos' }}
        stats={serverStats.map((s) => ({ icon: s.icon, label: s.label, value: s.value, color: s.color }))}
      />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <div className="hidden xl:block">
          <WikiSidebar />
        </div>

        <main className="min-w-0 flex-1">
          <Section
            id="servidor"
            title="El servidor"
            subtitle="Información general, datos técnicos y comunidad de Summer Fantasy."
            accent="orange"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="dungeon-panel parchment tape mb-6 max-w-3xl p-5 sm:p-6"
            >
              <p className="text-sm leading-relaxed text-[#4a3020] sm:text-base" style={{ fontFamily: 'var(--font-rune)' }}>
                Summer Fantasy es un servidor de Minecraft 1.20.1 con Forge ubicado en Europa (Francia). Está pensado para ofrecer una experiencia de supervivencia extrema con tecnología, magia, jefes épicos y combate PvE y PvP.
              </p>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2">
              {serverInfo.map((info) => (
                <ExpandableCard
                  key={info.title}
                  title={info.title}
                  icon={<info.icon className="h-6 w-6 text-primary" />}
                  accent="orange"
                >
                  <ul className="list-disc space-y-1.5 pl-5">
                    {info.content.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </ExpandableCard>
              ))}
            </div>
          </Section>

          <Section
            id="reglas"
            title="Reglas principales"
            subtitle="Normas básicas para que la experiencia sea divertida para todos."
            accent="red"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {rules.map((rule) => (
                <ExpandableCard
                  key={rule.title}
                  title={rule.title}
                  icon={<rule.icon className="h-6 w-6 text-primary" />}
                  accent="red"
                >
                  <p>{rule.desc}</p>
                </ExpandableCard>
              ))}
            </div>
          </Section>

          <Section
            id="primeros-pasos"
            title="Primeros pasos"
            subtitle="Todo lo que necesitas saber para empezar en Summer Fantasy y sobrevivir tus primeros días."
            accent="purple"
          >
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
                Antes de empezar
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {beforeStart.map((item) => (
                  <ExpandableCard
                    key={item.title}
                    title={item.title}
                    icon={<item.icon className="h-6 w-6 text-primary" />}
                    accent="purple"
                  >
                    <p>{item.desc}</p>
                  </ExpandableCard>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                <SunIcon className="h-4 w-4 text-purple-400" />
                Día 1: Sobrevive
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {day1Tasks.map((task) => (
                  <ExpandableCard
                    key={task.title}
                    title={task.title}
                    icon={<task.icon className="h-6 w-6 text-primary" />}
                    accent="purple"
                  >
                    <p>{task.desc}</p>
                  </ExpandableCard>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                <Clock className="h-4 w-4 text-purple-400" />
                Días 2-5: Afianza tu base
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {days2to5Tasks.map((task) => (
                  <ExpandableCard
                    key={task.title}
                    title={task.title}
                    icon={<task.icon className="h-6 w-6 text-primary" />}
                    accent="purple"
                  >
                    <p>{task.desc}</p>
                  </ExpandableCard>
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="economia"
            title="Economía"
            subtitle="Sistema de monedas del servidor. Gana marc jugando, vendiendo recursos y participando en actividades."
            accent="emerald"
          >
            <div className="dungeon-panel blood-border mb-6 p-4 sm:p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                <Coins className="h-4 w-4" />
                Tabla de conversión
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="dungeon-panel p-4 text-center"
                >
                  <p className="text-2xl font-bold text-amber-600">1</p>
                  <p className="text-sm font-bold text-foreground">Gold Mark</p>
                  <p className="text-xs text-muted-foreground">Moneda de mayor valor</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="dungeon-panel p-4 text-center"
                >
                  <p className="text-2xl font-bold text-slate-300">10</p>
                  <p className="text-sm font-bold text-foreground">Silver Mark</p>
                  <p className="text-xs text-muted-foreground">= 1 Gold Mark</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="dungeon-panel p-4 text-center"
                >
                  <p className="text-2xl font-bold text-orange-400">100</p>
                  <p className="text-sm font-bold text-foreground">Copper Mark</p>
                  <p className="text-xs text-muted-foreground">= 1 Gold Mark</p>
                </motion.div>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>10 copper mark = 1 silver mark · 10 silver mark = 1 gold mark</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ExpandableCard title="Cómo ganar monedas" accent="emerald">
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Vende recursos básicos como cobre, hierro, carbón o comida.</li>
                  <li>Participa en actividades del servidor y eventos.</li>
                  <li>Comercia con otros jugadores de forma segura dentro de tu protección.</li>
                  <li>El casino ofrece oportunidades de ganar (y perder) monedas.</li>
                </ul>
              </ExpandableCard>
              <ExpandableCard title="Consejos económicos" accent="emerald">
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>No gastes todo en el casino al principio.</li>
                  <li>Prioriza invertir en protección y equipo antes de lujos.</li>
                  <li>El cobre es un recurso abundante y fácil de vender.</li>
                  <li>Consulta los precios actuales con el staff o en las tiendas del servidor.</li>
                </ul>
              </ExpandableCard>
            </div>
          </Section>

          <Section
            id="comandos"
            title="Comandos esenciales"
            subtitle="Los comandos de Eazzy Server Utils que todo jugador nuevo debe conocer."
            accent="blue"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {commands.map((c) => (
                <motion.div
                  key={c.cmd}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                  className="dungeon-panel flex items-start gap-3 p-3"
                >
                  <div className="mc-slot flex h-10 w-10 shrink-0 items-center justify-center p-1.5">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <code className="mb-1 block text-xs font-bold text-primary sm:text-sm">{c.cmd}</code>
                    <p className="text-xs text-muted-foreground sm:text-sm">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section
            id="dia-10"
            title="Hoja de ruta al día 10"
            subtitle="Plan semanal para llegar al primer pico de dificultad de Scaling Difficult con buenas opciones."
            accent="slate"
          >
            <div className="space-y-3">
              {roadmap.map((step, index) => (
                <ExpandableCard
                  key={step.day}
                  title={step.day}
                  subtitle={step.focus}
                  badge={<Badge color="slate">Paso {index + 1}</Badge>}
                  accent="slate"
                  defaultOpen={index === 0}
                >
                  <ul className="list-disc space-y-1 pl-5">
                    {step.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
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
                <strong className="text-foreground">El día 10 marca la primera fase de Scaling Difficult:</strong>{' '}
                El Despertado. Aparecerán mobs con armadura básica, zombis y creepers serán un 15% más rápidos, y una raid nocturna traerá al jefe &quot;El Despertado&quot;. Ten armadura completa, arco, flechas y un lugar seguro donde refugiarte.
              </p>
            </motion.div>
          </Section>

          <Section
            id="consejos"
            title="Consejos finales"
            subtitle="Recomendaciones para disfrutar de Summer Fantasy desde el primer día."
            accent="orange"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {finalTips.map((tip, index) => (
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

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="dungeon-panel mt-6 border-red-900/50 bg-red-950/10 p-6 text-center"
            >
              <p className="mb-4 text-sm text-muted-foreground">
                ¿Necesitas ayuda? Contacta al staff por Discord privado. Recuerda: <strong className="text-foreground">PvP respetuoso</strong>, <strong className="text-foreground">griefing prohibido</strong> y <strong className="text-foreground">protege tu base</strong>.
              </p>
              <BackToHomeButton />
            </motion.div>
          </Section>
        </main>
      </div>

      <footer className="mt-10 border-t-4 border-border bg-[#0a0808] py-8 text-center text-sm text-muted-foreground">
        <p className="mb-1 text-xl text-red-500" style={{ fontFamily: 'var(--font-heading)' }}>SUMMER FANTASY</p>
        <p className="text-xs">Guía del servidor · MC 1.20.1 · Forge</p>
        <div className="mt-4 flex justify-center">
          <BackToHomeButton />
        </div>
      </footer>
    </>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
