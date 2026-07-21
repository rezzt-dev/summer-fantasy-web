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
  Home,
  MapPin,
  MessageSquare,
  Wrench,
  Shield,
  Settings,
  Terminal,
  AlertTriangle,
  Users,
  Zap,
} from 'lucide-react';

const teleportCommands = [
  { cmd: '/spawn', desc: 'Te teletransporta al spawn seguro del servidor.', icon: MapPin },
  { cmd: '/home [nombre]', desc: 'Te teletransporta a uno de tus hogares. El nombre por defecto es home.', icon: Home },
  { cmd: '/sethome [nombre]', desc: 'Establece tu hogar en la posición actual.', icon: Home },
  { cmd: '/delhome <nombre>', desc: 'Elimina un hogar guardado.', icon: Home },
  { cmd: '/homes', desc: 'Lista todos tus hogares.', icon: Home },
  { cmd: '/renamehome <antiguo> <nuevo>', desc: 'Cambia el nombre de un hogar.', icon: Home },
  { cmd: '/homepublic <nombre>', desc: 'Alterna un hogar entre público y privado.', icon: Home },
  { cmd: '/warp <nombre>', desc: 'Te teletransporta a un warp global.', icon: MapPin },
  { cmd: '/warps', desc: 'Lista los warps disponibles.', icon: MapPin },
  { cmd: '/tpa <jugador>', desc: 'Solicita teletransportarte a otro jugador.', icon: MapPin },
  { cmd: '/tpahere <jugador>', desc: 'Solicita que otro jugador se teletransporte a ti.', icon: MapPin },
  { cmd: '/tpaccept', desc: 'Acepta una solicitud de TPA.', icon: MapPin },
  { cmd: '/tpacancel', desc: 'Cancela tu solicitud de TPA.', icon: MapPin },
  { cmd: '/back', desc: 'Vuelve a tu ubicación anterior tras morir o teletransportarte.', icon: MapPin },
];

const messageCommands = [
  { cmd: '/msg <jugador> <mensaje>', desc: 'Envía un mensaje privado. Alias: /tell.', icon: MessageSquare },
  { cmd: '/reply <mensaje>', desc: 'Responde al último mensaje privado. Alias: /r.', icon: MessageSquare },
  { cmd: '/head <jugador>', desc: 'Obtiene la cabeza de un jugador. Cooldown de 1 hora.', icon: MessageSquare },
];

const utilityCommands = [
  { cmd: '/near', desc: 'Muestra los jugadores cercanos dentro del radio configurado.', icon: Wrench },
  { cmd: '/crafting', desc: 'Abre una mesa de crafteo portátil.', icon: Wrench },
  { cmd: '/anvil', desc: 'Abre un yunque portátil.', icon: Wrench },
  { cmd: '/smithing', desc: 'Abre una mesa de herrería portátil.', icon: Wrench },
];

const staffCommands = [
  { cmd: '/setwarp <nombre>', desc: 'Crea un warp global.', icon: Shield },
  { cmd: '/tps', desc: 'Muestra los TPS del servidor.', icon: Shield },
  { cmd: '/lag / /mspt', desc: 'Informe privado de rendimiento (TPS, MSPT, memoria, uptime).', icon: Shield },
  { cmd: '/freeze <jugador>', desc: 'Congela a un jugador.', icon: Shield },
  { cmd: '/unfreeze <jugador>', desc: 'Descongela a un jugador.', icon: Shield },
  { cmd: '/iv <jugador>', desc: 'Abre el inventario de un jugador. Alias: /invsee.', icon: Shield },
  { cmd: '/vanish', desc: 'Activa o desactiva el vanish.', icon: Shield },
  { cmd: '/warn <jugador> <razón>', desc: 'Advierte a un jugador.', icon: Shield },
  { cmd: '/warns <jugador>', desc: 'Muestra las advertencias de un jugador.', icon: Shield },
  { cmd: '/clearwarns <jugador>', desc: 'Limpia las advertencias.', icon: Shield },
  { cmd: '/kick <jugador> [razón]', desc: 'Expulsa a un jugador.', icon: Shield },
  { cmd: '/ban <jugador> [razón]', desc: 'Banea permanentemente a un jugador.', icon: Shield },
  { cmd: '/tempban <jugador> <duración> [razón]', desc: 'Banea temporalmente. Formatos: 30s, 5m, 2h, 7d.', icon: Shield },
  { cmd: '/unban <jugador>', desc: 'Desbanea a un jugador.', icon: Shield },
  { cmd: '/ipban <jugador> [razón]', desc: 'Banea la UUID y la IP actual del jugador.', icon: Shield },
  { cmd: '/broadcast <mensaje>', desc: 'Muestra un título centrado a todos. Usa | para separar título, subtítulo y chat.', icon: Shield },
  { cmd: '/lockchat', desc: 'Bloquea o desbloquea el chat para jugadores sin permisos de staff.', icon: Shield },
];

const dimensionCommands = [
  { cmd: '/eazzyserverutils close <dimensión>', desc: 'Bloquea una dimensión.', icon: Settings },
  { cmd: '/eazzyserverutils open <dimensión>', desc: 'Desbloquea una dimensión.', icon: Settings },
  { cmd: '/eazzyserverutils list', desc: 'Lista las dimensiones bloqueadas.', icon: Settings },
];

const configOptions = [
  { name: 'maxHomes', desc: 'Máximo de hogares por jugador.', defaultValue: '8' },
  { name: 'homeCooldown', desc: 'Cooldown de /home en segundos.', defaultValue: '5' },
  { name: 'maxWarps', desc: 'Máximo de warps globales.', defaultValue: '100' },
  { name: 'warpCooldown', desc: 'Cooldown de /warp en segundos.', defaultValue: '5' },
  { name: 'tpaCooldown', desc: 'Cooldown de TPA en segundos.', defaultValue: '3' },
  { name: 'tpaTimeout', desc: 'Tiempo de expiración de TPA en segundos.', defaultValue: '12' },
  { name: 'headCooldown', desc: 'Cooldown de /head en segundos.', defaultValue: '3600' },
  { name: 'spawnCooldown', desc: 'Cooldown de /spawn en segundos.', defaultValue: '5' },
  { name: 'backCooldown', desc: 'Cooldown de /back en segundos.', defaultValue: '5' },
  { name: 'nearRadius', desc: 'Radio de /near en bloques.', defaultValue: '50' },
  { name: 'homeWarpSharedCooldown', desc: 'Cooldown compartido entre /home y /warp.', defaultValue: 'true' },
  { name: 'homeWarpCooldown', desc: 'Cooldown compartido en segundos.', defaultValue: '5' },
  { name: 'combatCooldownSeconds', desc: 'Segundos de bloqueo por combate tras recibir daño.', defaultValue: '10' },
];

const chatOptions = [
  { name: 'enabled', desc: 'Activa el chat personalizado.', defaultValue: 'true' },
  { name: 'format', desc: 'Formato del chat.', defaultValue: '§b%name%§7: §f%message%' },
  { name: 'showHeadHover', desc: 'Muestra la cabeza del jugador al pasar el ratón por el nombre.', defaultValue: 'true' },
  { name: 'showHeadIndicator', desc: 'Muestra un indicador junto al nombre.', defaultValue: 'false' },
  { name: 'headIndicator', desc: 'Indicador a mostrar.', defaultValue: '☺' },
  { name: 'clickNameToMessage', desc: 'Permite clickear el nombre para enviar /msg.', defaultValue: 'true' },
  { name: 'showHeadInline', desc: 'Renderiza cabezas en línea en el chat.', defaultValue: 'true' },
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

function CommandCard({ cmd, desc, icon: Icon }: { cmd: string; desc: string; icon: React.ElementType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      className="dungeon-panel flex items-start gap-3 p-3"
    >
      <div className="mc-slot flex h-10 w-10 shrink-0 items-center justify-center p-1.5">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <code className="mb-1 block text-xs font-bold text-primary sm:text-sm">{cmd}</code>
        <p className="text-xs text-muted-foreground sm:text-sm">{desc}</p>
      </div>
    </motion.div>
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
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Comandos totales</p>
        <p className="font-mono text-4xl font-bold text-red-500 animate-flicker">35+</p>
        <p className="text-xs text-red-400">Jugador + Staff</p>
        <div className="mt-2 flex justify-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Terminal key={i} className={`h-3 w-3 ${i < 4 ? 'text-red-600' : 'text-stone-700'}`} fill={i < 4 ? 'currentColor' : 'none'} />
          ))}
        </div>
      </div>

      <div className="dungeon-panel p-3">
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
          <Settings className="h-3.5 w-3.5" />
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
          <span className="text-[10px] font-bold uppercase">Anti-exploit</span>
        </div>
        <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
          /home y /warp comparten cooldown, bloquean dimensiones cerradas y se desactivan en combate.
        </p>
      </div>
    </aside>
  );
}

export default function EazzyServerUtilsApp() {
  return (
    <>
      <EmberParticles />
      <NavBar />
      <Hero
        badge={{ text: 'Utilidades del servidor', icon: Terminal }}
        title={
          <>
            <span className="blood-text">EAZZY</span>
            <br />
            <span className="text-[#5a3a20]">SERVER UTILS</span>
          </>
        }
        description="Comandos esenciales para moverte, comunicarte y gestionar tu experiencia en Summer Fantasy. Desde hogares y warps hasta herramientas de staff y anti-exploit."
        primaryAction={{ label: 'Ver comandos', sectionId: 'teletransporte' }}
        secondaryAction={{ label: 'Configuración', sectionId: 'configuracion' }}
        stats={[
          { icon: Home, label: 'Hogares', value: '8', color: 'text-red-500' },
          { icon: MapPin, label: 'Warps', value: '100', color: 'text-orange-400' },
          { icon: Users, label: 'Comandos', value: '35+', color: 'text-amber-600' },
          { icon: Zap, label: 'Anti-exploit', value: 'ON', color: 'text-stone-400' },
        ]}
      />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <div className="hidden xl:block">
          <WikiSidebar />
        </div>

        <main className="min-w-0 flex-1">
          <Section
            id="teletransporte"
            title="Teletransporte"
            subtitle="Comandos esenciales para moverte por el mundo, gestionar tus hogares y viajar entre jugadores."
            accent="orange"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {teleportCommands.map((c) => (
                <CommandCard key={c.cmd} cmd={c.cmd} desc={c.desc} icon={c.icon} />
              ))}
            </div>
          </Section>

          <Section
            id="mensajeria"
            title="Mensajería"
            subtitle="Comunicación privada y utilidades sociales."
            accent="purple"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {messageCommands.map((c) => (
                <CommandCard key={c.cmd} cmd={c.cmd} desc={c.desc} icon={c.icon} />
              ))}
            </div>
          </Section>

          <Section
            id="utilidades"
            title="Utilidades"
            subtitle="Herramientas portátiles y comandos de calidad de vida."
            accent="blue"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {utilityCommands.map((c) => (
                <CommandCard key={c.cmd} cmd={c.cmd} desc={c.desc} icon={c.icon} />
              ))}
            </div>
          </Section>

          <Section
            id="staff"
            title="Comandos de staff"
            subtitle="Herramientas de moderación, sanciones, gestión y anuncios. Requieren permiso 2."
            accent="red"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {staffCommands.map((c) => (
                <CommandCard key={c.cmd} cmd={c.cmd} desc={c.desc} icon={c.icon} />
              ))}
            </div>

            <div className="mt-6">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Settings className="h-4 w-4" />
                Gestión de dimensiones
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {dimensionCommands.map((c) => (
                  <CommandCard key={c.cmd} cmd={c.cmd} desc={c.desc} icon={c.icon} />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="dungeon-panel mt-6 border-primary/30 bg-primary/5 p-4"
            >
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Ejemplos de /broadcast:</strong>
              </p>
              <code className="mt-2 block text-xs text-foreground">/broadcast &c¡Evento PvP! | &7Empieza en 5 minutos</code>
              <code className="block text-xs text-foreground">/broadcast &a¡Bienvenidos! | &7Disfruten del servidor | &e¡Gracias por jugar!</code>
            </motion.div>
          </Section>

          <Section
            id="configuracion"
            title="Configuración"
            subtitle="Opciones disponibles en config/eazzy_server_utils/."
            accent="emerald"
          >
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                <Settings className="h-4 w-4 text-emerald-400" />
                config.properties
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {configOptions.map((opt) => (
                  <ExpandableCard
                    key={opt.name}
                    title={opt.name}
                    subtitle={`Por defecto: ${opt.defaultValue}`}
                    accent="emerald"
                  >
                    <p>{opt.desc}</p>
                  </ExpandableCard>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                chat.properties
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {chatOptions.map((opt) => (
                  <ExpandableCard
                    key={opt.name}
                    title={opt.name}
                    subtitle={`Por defecto: ${opt.defaultValue}`}
                    accent="emerald"
                  >
                    <p>{opt.desc}</p>
                  </ExpandableCard>
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="permisos"
            title="Permisos y persistencia"
            subtitle="Cómo funciona el sistema de permisos y dónde se guardan los datos."
            accent="slate"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="dungeon-panel p-4"
              >
                <h3 className="mb-2 text-sm font-bold text-foreground">Sistema de permisos</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Permiso 0:</strong> comandos de jugador.
                  </li>
                  <li>
                    <strong className="text-foreground">Permiso 2:</strong> comandos de staff.
                  </li>
                  <li>Los staff ignoran la mayoría de cooldowns y protecciones anti-exploit.</li>
                  <li>No hay integración con LuckPerms; se usan niveles vanilla.</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="dungeon-panel p-4"
              >
                <h3 className="mb-2 text-sm font-bold text-foreground">Persistencia JSON</h3>
                <p className="mb-2 text-sm text-muted-foreground">Los datos se guardan en &lt;mundo&gt;/data/eazzy_server_utils/:</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>homes.json</li>
                  <li>warps.json</li>
                  <li>warnings.json</li>
                  <li>bans.json</li>
                  <li>locked_dimensions.json</li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="dungeon-panel mt-6 border-primary/30 bg-primary/5 p-4 text-center"
            >
              <p className="text-sm text-muted-foreground">
                El chat personalizado requiere que los jugadores tengan el mod instalado en el cliente para verse correctamente.
              </p>
            </motion.div>
          </Section>
        </main>
      </div>

      <footer className="mt-10 border-t-4 border-border bg-[#0a0808] py-8 text-center text-sm text-muted-foreground">
        <p className="mb-1 text-xl text-red-500" style={{ fontFamily: 'var(--font-heading)' }}>EAZZY SERVER UTILS</p>
        <p className="text-xs">Wiki para jugadores · MC 1.20.1 · Forge · Summer Fantasy</p>
        <div className="mt-3 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Terminal key={i} className="h-4 w-4 text-stone-700" />
          ))}
        </div>
      </footer>
    </>
  );
}
