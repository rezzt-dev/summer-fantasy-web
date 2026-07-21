'use client';

import { useState, useEffect } from 'react';
import NavBar, { sections as navSections } from './NavBar';
import Hero from '../wiki/Hero';
import Section from '../wiki/Section';
import ExpandableCard from '../wiki/ExpandableCard';
import ArmorSet from './ArmorSet';
import PhaseTimeline from './PhaseTimeline';
import EmberParticles from '../wiki/EmberParticles';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, Skull, Swords, Shield, ShieldAlert, Flame, AlertTriangle } from 'lucide-react';

const phases = [
  {
    day: 10,
    name: 'El despertar',
    icon: '/scaling-difficult/items/ancestral_scrap.png',
    threats: [
      'Zombies y esqueletos con armadura de cuero/tachonada',
      '+15% de velocidad para zombies y creepers',
      'Las arañas aplican Lentitud',
      'Caparazón de mobs +20%',
      'Primera incursión: El Despertado',
    ],
  },
  {
    day: 20,
    name: 'La amenaza creciente',
    icon: '/scaling-difficult/items/widow_bow.png',
    threats: [
      'Equipo de malla/hierro encantado',
      'Creepers más rápidos y explosivos',
      'Mini hordas desbloqueadas',
      'Arañas con Velocidad e Invisibilidad',
      'Segunda incursión: La Telaraña',
    ],
  },
  {
    day: 25,
    name: 'Noches inquietas',
    icon: '/scaling-difficult/items/witch_flask.png',
    threats: [
      'Esqueletos disparan flechas Llama',
      'Zombies rompen puertas más rápido y en grupo',
      'Las brujas arrojan pociones persistentes',
      'Brujas 2.5× más frecuentes',
      'Tercera incursión: Lluvia Tóxica',
    ],
  },
  {
    day: 30,
    name: 'La invasión',
    icon: '/scaling-difficult/items/commander_sword.png',
    threats: [
      'Mobs con equipo de diamante',
      '+30% de salud a hostiles',
      'Nubes de veneno de los creepers',
      'Hordas organizadas nocturnas',
      'Cuarta incursión: Asedio Pesado',
    ],
  },
  {
    day: 35,
    name: 'Mutación vainilla',
    icon: '/scaling-difficult/items/void_eye.png',
    threats: [
      'Mobs montados',
      'Endermen agresivos de noche por proximidad',
      'Arañas de cueva aplican Wither',
      'Zombies aplican Fatiga minera',
      'Quinta incursión: El Vacío',
    ],
  },
  {
    day: 40,
    name: 'El cenit',
    icon: '/scaling-difficult/items/chaos_crown.png',
    threats: [
      'Vindicadores y evocadores en superficie',
      'Tormentas cargan creepers',
      '+20% de daño a hostiles',
      'Hordas masivas desbloqueadas',
      'Incursión final: El Cenit',
    ],
  },
];

const raids = [
  {
    day: 10,
    name: 'El Despertado',
    boss: 'Zombie "El Despertado"',
    icon: '/scaling-difficult/items/awakened_axe.png',
    drops: [
      { name: 'Awakened Axe', icon: '/scaling-difficult/items/awakened_axe.png', desc: 'Hacha de hierro ×2.3 con Eficiencia IV, Castigo V y Prisa I al sostenerla.' },
      { name: 'Beating Heart', icon: '/scaling-difficult/items/beating_heart.png', desc: 'Prisa II 15 min y +2 corazones máximos permanentes.' },
    ],
  },
  {
    day: 20,
    name: 'La Telaraña',
    boss: 'Esqueleto "La Viuda" montado en araña invisible',
    icon: '/scaling-difficult/items/widow_bow.png',
    drops: [
      { name: 'Widow Bow', icon: '/scaling-difficult/items/widow_bow.png', desc: 'Poder III + Punch II; 25% de colocar telaraña temporal al impactar.' },
      { name: 'Spectral Gland', icon: '/scaling-difficult/items/spectral_gland.png', desc: 'Inmunidad a Lentitud de araña/telaraña; Velocidad I pasiva.' },
    ],
  },
  {
    day: 25,
    name: 'Lluvia Tóxica',
    boss: 'Bruja "La Madre de la Niebla"',
    icon: '/scaling-difficult/items/witch_flask.png',
    drops: [
      { name: 'Witch Flask', icon: '/scaling-difficult/items/witch_flask.png', desc: '3 usos; elimina Veneno/Wither y otorga Regeneración II 10s.' },
      { name: 'Persistent Essence', icon: '/scaling-difficult/items/persistence_essence.png', desc: 'Fuerza I pasiva; usado para flechas de daño instantáneo II en área.' },
    ],
  },
  {
    day: 30,
    name: 'Asedio Pesado',
    boss: 'Wither Skeleton "El Comandante"',
    icon: '/scaling-difficult/items/commander_sword.png',
    drops: [
      { name: 'Commander Sword', icon: '/scaling-difficult/items/commander_sword.png', desc: 'Espada de diamante irrompible ×2.3; Wither I 3s; Resistencia I 2s.' },
      { name: 'Command Fragment', icon: '/scaling-difficult/items/command_fragment.png', desc: '-30% daño por explosiones; +50% resistencia al empuje.' },
    ],
  },
  {
    day: 35,
    name: 'El Vacío',
    boss: 'Enderman "El Vigía del Vacío"',
    icon: '/scaling-difficult/items/void_eye.png',
    drops: [
      { name: 'Void Eye', icon: '/scaling-difficult/items/void_eye.png', desc: 'Perla de Ender reusable; 15s cooldown; 5s inmunidad a caída.' },
      { name: 'Warden Veil', icon: '/scaling-difficult/items/warden_veil.png', desc: 'Casco de malla ×2 stats; inmunidad a Ceguera.' },
    ],
  },
  {
    day: 40,
    name: 'El Cenit',
    boss: 'Zombie gigante "El Rey del Caos" con aura',
    icon: '/scaling-difficult/items/chaos_crown.png',
    drops: [
      { name: 'Chaos Crown', icon: '/scaling-difficult/items/chaos_crown.png', desc: 'Casco de netherite ×2 stats; Fuerza III + Resistencia IV pasivos.' },
      { name: 'Overloaded Totem', icon: '/scaling-difficult/items/overloaded_totem.png', desc: 'Al evitar muerte, rayos a enemigos en 10 bloques; buffs 10s.' },
      { name: 'Compressed Notch Apple', icon: '/scaling-difficult/items/compressed_notch_apple.png', desc: 'Health Boost V, Regeneración VI, Resistencia IX, Absorción IX.' },
    ],
  },
];

const items = [
  { name: 'Compressed Notch Apple', icon: '/scaling-difficult/items/compressed_notch_apple.png', type: 'Consumable', desc: 'Health Boost V, Regeneración VI, Resistencia IX, Inmunidad al fuego, Absorción IX.' },
  { name: 'Awakened Axe', icon: '/scaling-difficult/items/awakened_axe.png', type: 'Arma', desc: 'Hacha de hierro ×2.3; Eficiencia IV + Castigo V; Prisa I al sostenerla.' },
  { name: 'Beating Heart', icon: '/scaling-difficult/items/beating_heart.png', type: 'Consumable', desc: 'Prisa II 15 min y +2 corazones máximos permanentes (límite +20).' },
  { name: 'Widow Bow', icon: '/scaling-difficult/items/widow_bow.png', type: 'Arco', desc: 'Poder III + Punch II; 25% de colocar telaraña temporal al impactar.' },
  { name: 'Spectral Gland', icon: '/scaling-difficult/items/spectral_gland.png', type: 'Accesorio', desc: 'Inmunidad a Lentitud de araña/telaraña; Velocidad I pasiva.' },
  { name: 'Witch Flask', icon: '/scaling-difficult/items/witch_flask.png', type: 'Consumable', desc: '3 usos; elimina Veneno/Wither, luego Regeneración II 10s.' },
  { name: 'Persistent Essence', icon: '/scaling-difficult/items/persistence_essence.png', type: 'Material', desc: 'Fuerza I pasiva; usado para flechas de daño instantáneo II en área.' },
  { name: 'Commander Sword', icon: '/scaling-difficult/items/commander_sword.png', type: 'Arma', desc: 'Espada de diamante irrompible ×2.3; Wither I 3s; Resistencia I 2s.' },
  { name: 'Command Fragment', icon: '/scaling-difficult/items/command_fragment.png', type: 'Accesorio', desc: '-30% daño por explosiones; +50% resistencia al empuje.' },
  { name: 'Void Eye', icon: '/scaling-difficult/items/void_eye.png', type: 'Accesorio', desc: 'Perla de Ender reusable; 15s cooldown; 5s inmunidad a caída.' },
  { name: 'Warden Veil', icon: '/scaling-difficult/items/warden_veil.png', type: 'Casco', desc: 'Casco de malla ×2 stats; inmunidad a Ceguera.' },
  { name: 'Chaos Crown', icon: '/scaling-difficult/items/chaos_crown.png', type: 'Casco', desc: 'Casco de netherite ×2 stats; Fuerza III + Resistencia IV pasivos.' },
  { name: 'Overloaded Totem', icon: '/scaling-difficult/items/overloaded_totem.png', type: 'Tótem', desc: 'Al evitar muerte, rayos a enemigos en 10 bloques; buffs 10s.' },
];

const armors = [
  {
    name: 'Ancestral',
    multiplier: '1.5×',
    icon: '/scaling-difficult/items/ancestral_ingot.png',
    pieces: [
      { slot: 'Casco', src: '/scaling-difficult/armors/ancestral/earthcasco.png' },
      { slot: 'Pechera', src: '/scaling-difficult/armors/ancestral/earthpecho.png' },
      { slot: 'Grebas', src: '/scaling-difficult/armors/ancestral/earthpantalon.png' },
      { slot: 'Botas', src: '/scaling-difficult/armors/ancestral/earthbotas.png' },
    ],
    bonus: '+2 corazones, inmunidad a Veneno',
    craft: 'Mesa de herrería: netherite + Smithing Rune + Ancestral Ingot',
  },
  {
    name: 'Omnimus',
    multiplier: '2.25×',
    icon: '/scaling-difficult/items/void_sphere.png',
    pieces: [
      { slot: 'Casco', src: '/scaling-difficult/armors/omnimus/dungeon_head.png' },
      { slot: 'Pechera', src: '/scaling-difficult/armors/omnimus/dungeon_body.png' },
      { slot: 'Grebas', src: '/scaling-difficult/armors/omnimus/dungeon_leggings.png' },
      { slot: 'Botas', src: '/scaling-difficult/armors/omnimus/dungeon_boots.png' },
    ],
    bonus: '+4 corazones, Fuerza I; casco con Respiración II',
    craft: 'Pieza Ancestral + Void Spheres + Death Dust + Earth Fragment',
  },
  {
    name: 'Valky',
    multiplier: '3.375×',
    icon: '/scaling-difficult/items/golden_bone.png',
    pieces: [
      { slot: 'Casco', src: '/scaling-difficult/armors/valky/crucible_knight_helmet.png' },
      { slot: 'Pechera', src: '/scaling-difficult/armors/valky/crucible_knight_chestplate.png' },
      { slot: 'Grebas', src: '/scaling-difficult/armors/valky/crucible_knight_leggings.png' },
      { slot: 'Botas', src: '/scaling-difficult/armors/valky/crucible_knight_boots.png' },
    ],
    bonus: '+4 corazones, Fuerza II, inmunidad a Veneno, -35% daño por caída; Protección contra el fuego III',
    craft: 'Pieza Omnimus + Compressed Blaze Rods + Warden Scraps + Golden Bones + Piglin Brute Gem',
  },
  {
    name: 'Ancient',
    multiplier: '5.0625×',
    icon: '/scaling-difficult/items/shulker_part.png',
    pieces: [
      { slot: 'Casco', src: '/scaling-difficult/armors/ancient/forgotten_trace_helmet.png' },
      { slot: 'Pechera', src: '/scaling-difficult/armors/ancient/forgotten_trace_chestplate.png' },
      { slot: 'Grebas', src: '/scaling-difficult/armors/ancient/forgotten_trace_leggings.png' },
      { slot: 'Botas', src: '/scaling-difficult/armors/ancient/forgotten_trace_boots.png' },
    ],
    bonus: '+6 corazones, Fuerza II, Regeneración I, inmunidad a Veneno/Wither, -35% daño por caída',
    craft: 'Pieza Valky + Shulker Parts + Nether Star Sharps + Enderman Beaks + Wither Bones',
  },
  {
    name: 'Burned',
    multiplier: '7.59375×',
    icon: '/scaling-difficult/items/infinite_dust.png',
    pieces: [
      { slot: 'Casco', src: '/scaling-difficult/armors/burned/sunset_wings_helmet.png' },
      { slot: 'Pechera', src: '/scaling-difficult/armors/burned/sunset_wings_chestplate.png' },
      { slot: 'Grebas', src: '/scaling-difficult/armors/burned/sunset_wings_leggings.png' },
      { slot: 'Botas', src: '/scaling-difficult/armors/burned/sunset_wings_boots.png' },
    ],
    bonus: '+6 corazones, Fuerza II, Regeneración II, inmunidad a Veneno/Wither, vuelo con élitros; Irrompibilidad X',
    craft: 'Pieza Ancient + Infinite Dust + Ender Eyes + Blaze Hearts + Infinite Sharps + Shulker Parts',
  },
];

const materials = [
  { name: 'Ancestral Scrap', icon: '/scaling-difficult/items/ancestral_scrap.png', source: 'Strays; fundir Ancestral Debris', used: 'Ancestral Ingot' },
  { name: 'Ancestral Debris', icon: '/scaling-difficult/items/ancestral_debris_side.png', source: 'Mineral del Overworld (profundo)', used: 'Ancestral Scrap' },
  { name: 'Ancestral Ingot', icon: '/scaling-difficult/items/ancestral_ingot.png', source: '4 scrap + 4 diamantes', used: 'Smithing Rune, mejora Ancestral' },
  { name: 'Smithing Rune', icon: '/scaling-difficult/items/smithing_rune.png', source: 'Encaged Phantom + 8 Ancestral Ingots', used: 'Netherite → Ancestral' },
  { name: 'Encaged Phantom', icon: '/scaling-difficult/items/encaged_phantom.png', source: 'Ghasts (50% de drop)', used: 'Smithing Rune' },
  { name: 'Zombie Leather', icon: '/scaling-difficult/items/zombie_leather.png', source: 'Cuero rodeado de Rotten Flesh', used: 'Material sink' },
  { name: 'Warden Scrap', icon: '/scaling-difficult/items/warden_scrap.png', source: 'Wardens sueltan 2', used: 'Void Sphere' },
  { name: 'Void Sphere', icon: '/scaling-difficult/items/void_sphere.png', source: 'Ender Pearl + 8 Warden Scraps', used: 'Armadura Omnimus' },
  { name: 'Earth Fragment', icon: '/scaling-difficult/items/earth_fragment.png', source: 'Animales pasivos 20%–35% (Looting III)', used: 'Casco Omnimus' },
  { name: 'Death Dust', icon: '/scaling-difficult/items/death_dust.png', source: 'No-muertos 10%–25% (Looting III)', used: 'Omnimus' },
  { name: 'Compressed Blaze Rod', icon: '/scaling-difficult/items/compressed_blaze_rod.png', source: '9 Blaze Rods → 1', used: 'Golden Bone, Valky' },
  { name: 'Wither Bone', icon: '/scaling-difficult/items/wither_bone.png', source: 'Wither Skeletons 15%–30%; cofres Bastión/Fortaleza 25%', used: 'Golden Bone, Ancient/Burned' },
  { name: 'Golden Bone', icon: '/scaling-difficult/items/golden_bone.png', source: 'Wither Bone + 4 bloques de oro + 4 Compressed Blaze Rods', used: 'Valky' },
  { name: 'Hoglin Leather', icon: '/scaling-difficult/items/hoglin_leather.png', source: 'Hoglins sueltan 3+Looting', used: 'Valky' },
  { name: 'Piglin Brute Gem', icon: '/scaling-difficult/items/piglin_brute_gem.png', source: 'Piglin Brutes 50%–100%', used: 'Valky' },
  { name: 'Compressed Shulker Shell', icon: '/scaling-difficult/items/compressed_shulker_shell.png', source: '9 Shulker Shells → 1', used: 'Shulker Part' },
  { name: 'Enderman Mandible', icon: '/scaling-difficult/items/enderman_mandible.png', source: 'Endermen 5%–15%; cofres Ciudad del End 20%', used: 'Enderman Beak' },
  { name: 'Enderman Beak', icon: '/scaling-difficult/items/enderman_beak.png', source: '6 Enderman Mandibles', used: 'Infinite Sharp, Ancient' },
  { name: 'Shulker Part', icon: '/scaling-difficult/items/shulker_part.png', source: '8 Compressed Shulker Shells + Ender Eye', used: 'Ancient/Burned' },
  { name: 'Nether Star Sharp', icon: '/scaling-difficult/items/nether_star_sharp.png', source: '1 Nether Star → 9', used: 'Infinite Sharp, Ancient' },
  { name: 'Infinite Sharp', icon: '/scaling-difficult/items/infinite_sharp.png', source: '5 Nether Star Sharps + 4 Enderman Beaks', used: 'Compressed Nether Star, Infinite Dust' },
  { name: 'Compressed Nether Star', icon: '/scaling-difficult/items/compressed_nether_star.png', source: '8 Nether Stars + Infinite Sharp', used: 'Futuro material' },
  { name: 'Infinite Dust', icon: '/scaling-difficult/items/infinite_dust.png', source: 'Pulir Infinite Sharp en piedra de afilar', used: 'Burned' },
  { name: 'Dragon Eye', icon: '/scaling-difficult/items/dragon_eye.png', source: 'Ender Dragon suelta 2', used: 'Burned' },
  { name: 'Blaze Heart', icon: '/scaling-difficult/items/blaze_heart.png', source: 'Blazes 10%–25%', used: 'Burned' },
  { name: 'Compressed Slime Ball', icon: '/scaling-difficult/items/compressed_slime_ball.png', source: '9 Slime Blocks → 1', used: 'Futuro material' },
];

const commands = [
  { cmd: '/scalingdifficult start', desc: 'Reanuda la progresión del día.' },
  { cmd: '/scalingdifficult stop', desc: 'Pausa la progresión del día.' },
  { cmd: '/scalingdifficult reset', desc: 'Reinicia día, raids, hordas y bonus de vida.' },
  { cmd: '/scalingdifficult day <n>', desc: 'Establece el día actual.' },
  { cmd: '/scalingdifficult phase', desc: 'Muestra día y fase activa.' },
  { cmd: '/scalingdifficult reload', desc: 'Recarga scalingdifficult.json.' },
  { cmd: '/scalingdifficult miniboss spawn [day]', desc: 'Fuerza el spawn de un mini-jefe.' },
  { cmd: '/scalingdifficult miniboss reset', desc: 'Elimina mini-jefes naturales.' },
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
      {/* Day counter widget */}
      <div className="dungeon-panel blood-border mb-4 p-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Día actual</p>
        <p className="font-mono text-4xl font-bold text-red-500 animate-flicker">d40</p>
        <p className="text-xs text-red-400">El Cénit</p>
        <div className="mt-2 flex justify-center gap-0.5">
          {[...Array(10)].map((_, i) => (
            <Heart key={i} className={`h-3 w-3 ${i < 3 ? 'text-red-600' : 'text-stone-700'}`} fill={i < 3 ? 'currentColor' : 'none'} />
          ))}
        </div>
      </div>

      {/* TOC */}
      <div className="dungeon-panel p-3">
        <h3
          className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <Flame className="h-3.5 w-3.5" />
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

      {/* Warning widget */}
      <div className="dungeon-panel mt-4 border-red-900/50 bg-red-950/10 p-3">
        <div className="flex items-center gap-2 text-red-400">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase">Peligro</span>
        </div>
        <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
          Los mobs hostiles ganan +20% de daño en el Cénit. No salgas de noche sin equipo.
        </p>
      </div>
    </aside>
  );
}

export default function WikiApp() {
  return (
    <>
      <EmberParticles />
      <NavBar />
      <Hero
        badge={{ text: 'Advertencia: mundo hostil', icon: Skull }}
        title={
          <>
            <span className="blood-text">SCALING</span>
            <br />
            <span className="text-[#5a3a20]">DIFFICULT</span>
          </>
        }
        description="El mundo se vuelve más peligroso cada día real. Sobrevive a incursiones, hordas y jefes mientras forjas armaduras legendarias que superan a la netherite."
        primaryAction={{ label: 'Explorar fases', sectionId: 'fases' }}
        secondaryAction={{ label: 'Ver armaduras', sectionId: 'armaduras' }}
        stats={[
          { icon: Heart, label: 'Dificultad', value: 'HARDCORE', color: 'text-red-500' },
          { icon: Swords, label: 'Fases', value: '6', color: 'text-orange-400' },
          { icon: ShieldAlert, label: 'Sets', value: '5', color: 'text-amber-600' },
          { icon: Skull, label: 'Jefes', value: '6', color: 'text-stone-400' },
        ]}
      />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <div className="hidden xl:block">
          <WikiSidebar />
        </div>

        <main className="min-w-0 flex-1">
          <Section
            id="fases"
            title="Fases de dificultad"
            subtitle="El mundo se vuelve más peligroso cada ~10 días reales. Cada fase acumula los efectos anteriores."
            accent="orange"
          >
            <PhaseTimeline />
            <div className="grid gap-3 sm:grid-cols-2">
              {phases.map((phase) => (
                <ExpandableCard
                  key={phase.day}
                  title={phase.name}
                  subtitle={`Nuevas amenazas que se activan desde el día ${phase.day}`}
                  badge={<Badge color="orange">Día {phase.day}</Badge>}
                  icon={phase.icon}
                  accent="orange"
                >
                  <ul className="list-disc space-y-1.5 pl-5">
                    {phase.threats.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </ExpandableCard>
              ))}
            </div>
          </Section>

          <Section
            id="incursiones"
            title="Incursiones nocturnas"
            subtitle="Eventos de jefe que ocurren de noche en el Overworld con recompensas únicas garantizadas."
            accent="red"
          >
            <div className="space-y-3">
              {raids.map((raid) => (
                <ExpandableCard
                  key={raid.day}
                  title={raid.name}
                  subtitle={`Jefe: ${raid.boss}`}
                  badge={<Badge color="red">Día {raid.day}</Badge>}
                  icon={raid.icon}
                  accent="red"
                >
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {raid.drops.map((drop) => (
                      <motion.div
                        key={drop.name}
                        whileHover={{ scale: 1.01 }}
                        className="dungeon-panel flex items-start gap-3 p-2.5"
                      >
                        <div className="mc-slot h-10 w-10 shrink-0 p-1.5">
                          <img src={drop.icon} alt="" className="h-full w-full object-contain" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{drop.name}</p>
                          <p className="text-xs text-muted-foreground">{drop.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ExpandableCard>
              ))}
            </div>
          </Section>

          <Section
            id="objetos"
            title="Objetos y artefactos"
            subtitle="Recompensas de incursiones, accesorios pasivos y consumables permanentes."
            accent="purple"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ExpandableCard
                  key={item.name}
                  title={item.name}
                  subtitle={item.type}
                  icon={item.icon}
                  badge={<Badge color="purple">{item.type}</Badge>}
                  accent="purple"
                >
                  <p>{item.desc}</p>
                </ExpandableCard>
              ))}
            </div>
          </Section>

          <Section
            id="armaduras"
            title="Armaduras escaladas"
            subtitle="Cinco tiers de armadura que superan a la netherite. Cada set completo otorga atributos permanentes."
            accent="blue"
          >
            <div className="dungeon-panel mb-6 border-blue-900/30 p-3 text-center text-sm text-muted-foreground sm:p-4 sm:text-base">
              <span className="inline-flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <strong className="text-foreground">Progresión:</strong> Netherite → Ancestral → Omnimus → Valky → Ancient → Burned
              </span>
            </div>
            <div className="space-y-3">
              {armors.map((armor) => (
                <ExpandableCard
                  key={armor.name}
                  title={armor.name}
                  subtitle={armor.craft}
                  icon={armor.icon}
                  badge={<Badge color="blue">{armor.multiplier}</Badge>}
                  accent="blue"
                >
                  <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                    <div>
                      <p className="mb-2 text-sm text-foreground">
                        <strong>Bonus de set completo:</strong> {armor.bonus}
                      </p>
                      <p className="text-xs text-muted-foreground sm:text-sm">
                        <strong>Fabricación:</strong> {armor.craft}
                      </p>
                    </div>
                    <ArmorSet pieces={armor.pieces} />
                  </div>
                </ExpandableCard>
              ))}
            </div>
          </Section>

          <Section
            id="materiales"
            title="Materiales"
            subtitle="Dónde conseguir cada componente y para qué sirve en la progresión."
            accent="emerald"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {materials.map((mat) => (
                <ExpandableCard
                  key={mat.name}
                  title={mat.name}
                  subtitle={`Usado en: ${mat.used}`}
                  icon={mat.icon}
                  accent="emerald"
                >
                  <p>
                    <strong>Origen:</strong> {mat.source}
                  </p>
                </ExpandableCard>
              ))}
            </div>
          </Section>

          <Section
            id="comandos"
            title="Comandos y configuración"
            subtitle="Comandos de administrador para controlar el mod y opciones del archivo de configuración."
            accent="slate"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {commands.map((c) => (
                <motion.div
                  key={c.cmd}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                  className="dungeon-panel p-3"
                >
                  <code className="mb-1 block text-xs font-bold text-primary sm:text-sm">{c.cmd}</code>
                  <p className="text-xs text-muted-foreground sm:text-sm">{c.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="dungeon-panel mt-8 border-primary/30 bg-primary/5 p-4 text-center"
            >
              <p className="text-sm text-muted-foreground">
                La configuración principal vive en{' '}
                <code className="font-mono text-foreground">config/scalingdifficult.json</code>. Recuerda usar{' '}
                <code className="font-mono text-foreground">/scalingdifficult reload</code> después de editarla.
              </p>
            </motion.div>
          </Section>
        </main>
      </div>

      <footer className="mt-10 border-t-4 border-border bg-[#0a0808] py-8 text-center text-sm text-muted-foreground">
        <p className="mb-1 text-xl text-red-500" style={{ fontFamily: 'var(--font-heading)' }}>SCALING DIFFICULT</p>
        <p className="text-xs">Wiki para jugadores · MC 1.20.1 · Forge</p>
        <div className="mt-3 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Skull key={i} className="h-4 w-4 text-stone-700" />
          ))}
        </div>
      </footer>
    </>
  );
}
