'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Skull,
  Mountain,
  BookOpen,
  Zap,
  Sword,
  Crown,
  Compass,
  ChevronLeft,
  ChevronRight,
  Feather,
  AlertTriangle,
} from 'lucide-react';

interface LorePage {
  day: string;
  title: string;
  paragraphs: string[];
  highlights: string[];
  doodle: React.ElementType;
  doodleColor: string;
  note: string;
  tapeColor: string;
  inkColor: string;
}

const pages: LorePage[] = [
  {
    day: 'Entrada #1',
    title: 'El despertar',
    paragraphs: [
      'Hace mucho, este mundo fue un lugar predecible.',
      'Pero algo se quebró en su raíz.',
      'Una fuerza dormida, conocida solo como Scaling Difficult, despertó poco a poco y comenzó a alimentarse del propio paso del tiempo.',
    ],
    highlights: ['Scaling Difficult', 'quebró en su raíz'],
    doodle: Flame,
    doodleColor: 'text-orange-500',
    note: 'No confíes en el amanecer',
    tapeColor: 'bg-orange-900/40',
    inkColor: 'text-orange-950',
  },
  {
    day: 'Entrada #2',
    title: 'La retorcida',
    paragraphs: [
      'Con cada amanecer, la tierra se retuerce un poco más.',
      'Las colinas se vuelven más escarpadas, las cuevas se hunden más profundo, y el aire carga una energía que endurece a las criaturas.',
      'Ni siquiera los cielos son seguros.',
    ],
    highlights: ['se retuerce', 'endurece a las criaturas'],
    doodle: Mountain,
    doodleColor: 'text-stone-500',
    note: 'Cada día es más peligroso',
    tapeColor: 'bg-stone-700/40',
    inkColor: 'text-stone-900',
  },
  {
    day: 'Entrada #3',
    title: 'Otros planos',
    paragraphs: [
      'Los portales hacia el Nether han perdido estabilidad.',
      'Muestran un inframundo amplificado y retorcido, donde el fuego no es lo único que arde.',
      'Y en el End, las islas flotantes susurran promesas de ruina.',
    ],
    highlights: ['Nether', 'End', 'ruina'],
    doodle: Skull,
    doodleColor: 'text-red-700',
    note: 'Los portales mienten',
    tapeColor: 'bg-red-900/40',
    inkColor: 'text-red-950',
  },
  {
    day: 'Entrada #4',
    title: 'Los sobrevivientes',
    paragraphs: [
      'Ante tanto cambio, no hemos tenido más opción que adaptarnos.',
      'Entre aldeas reforzadas y caminos marcados, se levantan talleres ruidosos, forjas humeantes y torres de energía.',
      'Unos excavan mazmorras. Otros estudian grimorios. Algunos forjan armas legendarias.',
    ],
    highlights: ['adaptarnos', 'grimorios', 'armas legendarias'],
    doodle: Zap,
    doodleColor: 'text-yellow-600',
    note: 'La tecnología nos mantiene vivos',
    tapeColor: 'bg-yellow-900/40',
    inkColor: 'text-yellow-950',
  },
  {
    day: 'Entrada #5',
    title: 'La verdad',
    paragraphs: [
      'Pero la tecnología y la magia solo ralentizan lo inevitable.',
      'Scaling Difficult sigue creciendo, transformando cada rincón en una prueba mayor.',
      'Aquí no basta con sobrevivir.',
    ],
    highlights: ['lo inevitable', 'no basta con sobrevivir'],
    doodle: Crown,
    doodleColor: 'text-amber-600',
    note: 'Hay que dejar una marca',
    tapeColor: 'bg-amber-900/40',
    inkColor: 'text-amber-950',
  },
];

function highlightText(text: string, highlights: string[]) {
  let result = text;
  highlights.forEach((word) => {
    const regex = new RegExp(`(${word})`, 'gi');
    result = result.replace(regex, '§HL$1§HL');
  });
  return result.split('§HL').map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="relative inline-block font-bold text-red-700">
        {part}
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-red-400/70" />
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function TypewriterParagraph({
  text,
  highlights,
  delay = 0,
  rotate = 0,
}: {
  text: string;
  highlights: string[];
  delay?: number;
  rotate?: number;
}) {
  const words = text.split(' ');

  return (
    <p
      className="mb-4 text-base leading-7 sm:text-lg sm:leading-8"
      style={{ transform: `rotate(${rotate}deg)`, transformOrigin: 'left center' }}
    >
      {words.map((word, i) => {
        const isHighlight = highlights.some((h) => word.toLowerCase().includes(h.toLowerCase()));
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + i * 0.08, duration: 0.25 }}
            className="inline-block mr-[0.25em]"
          >
            {isHighlight ? (
              <span className="relative inline-block font-bold text-red-700">
                {word}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-red-400/70" />
              </span>
            ) : (
              word
            )}
          </motion.span>
        );
      })}
    </p>
  );
}

export default function LoreTeaser() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [key, setKey] = useState(0);

  const current = pages[page];
  const Doodle = current.doodle;

  const changePage = (newPage: number) => {
    if (newPage < 0 || newPage >= pages.length) return;
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
    setKey((k) => k + 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') changePage(page + 1);
      if (e.key === 'ArrowLeft') changePage(page - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      rotateY: dir > 0 ? 25 : -25,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      rotateY: dir > 0 ? -25 : 25,
      opacity: 0,
      scale: 0.92,
    }),
  };

  return (
    <section id="lore" className="relative overflow-hidden border-y-4 border-border bg-[#120c0a] py-14 sm:py-20">
      {/* Cork/wood texture background */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(138,28,28,0.15)_0%,transparent_40%)]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_80%_70%,rgba(180,83,9,0.1)_0%,transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 border-2 border-red-900/50 bg-red-950/20 px-3 py-1.5">
            <BookOpen className="h-4 w-4 text-red-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">Diario del superviviente</span>
          </div>
          <h2
            className="text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Notas encontradas
          </h2>
        </motion.div>

        {/* Notebook */}
        <div className="relative mx-auto perspective-[1200px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={key}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative"
            >
              {/* Tape */}
              <div
                className={`absolute -top-4 left-1/2 h-8 w-32 -translate-x-1/2 rotate-2 ${current.tapeColor} shadow-lg`}
              />

              {/* Paper */}
              <div
                className="relative overflow-hidden border-2 border-[#d4c5a8]/40 bg-[#f3e9d2] p-6 shadow-2xl sm:p-10"
                style={{
                  transform: 'rotate(-1deg)',
                  backgroundImage:
                    'repeating-linear-gradient(transparent, transparent 31px, rgba(180,83,9,0.15) 31px, rgba(180,83,9,0.15) 32px)',
                }}
              >
                {/* Coffee stain */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border-4 border-amber-900/10 sm:h-32 sm:w-32" />
                <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full border-2 border-amber-900/10 sm:h-20 sm:w-20" />

                {/* Page header */}
                <div className="mb-6 flex items-center justify-between border-b-2 border-red-900/20 pb-3">
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500"
                    style={{ transform: 'rotate(-2deg)' }}
                  >
                    {current.day}
                  </span>
                  <Feather className="h-5 w-5 text-stone-400" />
                </div>

                {/* Title */}
                <h3
                  className={`mb-6 text-2xl font-bold sm:text-3xl ${current.doodleColor}`}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    transform: 'rotate(-1.5deg)',
                  }}
                >
                  {current.title}
                </h3>

                {/* Paragraphs with typewriter effect */}
                <div className={`${current.inkColor}`} style={{ fontFamily: 'var(--font-rune)' }}>
                  {current.paragraphs.map((p, i) => (
                    <TypewriterParagraph
                      key={`${key}-${i}`}
                      text={p}
                      highlights={current.highlights}
                      delay={i * 1.2}
                      rotate={i % 2 === 0 ? -0.5 : 0.5}
                    />
                  ))}
                </div>

                {/* Doodle stamp */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: -12 }}
                  transition={{ delay: 2.5, type: 'spring' }}
                  className={`absolute bottom-6 right-6 ${current.doodleColor} opacity-80`}
                >
                  <Doodle className="h-16 w-16 sm:h-20 sm:w-20" strokeWidth={1.2} />
                </motion.div>

                {/* Sticky note */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: 5 }}
                  animate={{ opacity: 1, y: 0, rotate: 6 }}
                  transition={{ delay: 3, type: 'spring' }}
                  className="absolute -right-2 top-16 w-28 border border-yellow-900/20 bg-yellow-200 p-2 shadow-md sm:-right-4 sm:top-20 sm:w-32"
                >
                  <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-yellow-800">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Nota</span>
                  </div>
                  <p className="text-[10px] leading-tight text-yellow-900" style={{ fontFamily: 'var(--font-rune)' }}>
                    {current.note}
                  </p>
                </motion.div>

                {/* Page number */}
                <div className="mt-8 text-center">
                  <span className="font-mono text-xs text-stone-400">— {page + 1} / {pages.length} —</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="relative z-10 mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => changePage(page - 1)}
            disabled={page === 0}
            className="flex h-11 w-11 items-center justify-center border-2 border-border bg-secondary text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => changePage(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === page ? 'bg-red-500' : 'bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Ir a página ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => changePage(page + 1)}
            disabled={page === pages.length - 1}
            className="flex h-11 w-11 items-center justify-center border-2 border-border bg-secondary text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
            aria-label="Página siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Usa las flechas del teclado o los botones para pasar las páginas
        </p>
      </div>
    </section>
  );
}
