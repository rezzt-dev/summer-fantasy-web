'use client';

import { motion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

interface HeroStat {
  icon: ElementType;
  label: string;
  value: string;
  color: string;
}

interface HeroAction {
  label: string;
  sectionId: string;
  variant?: 'primary' | 'secondary';
}

interface HeroBadge {
  text: string;
  icon: ElementType;
}

interface HeroProps {
  badge?: HeroBadge;
  title: ReactNode;
  description: string;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  stats: HeroStat[];
}

export default function Hero({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  stats,
}: HeroProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative border-b-4 border-border pt-14">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0f] via-[#120a0a] to-background" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-red-900/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-orange-900/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Top warning strip */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 border-2 border-red-900/60 bg-red-950/30 px-3 py-1.5"
          >
            <badge.icon className="h-4 w-4 text-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
              {badge.text}
            </span>
          </motion.div>
        )}

        {/* Main title block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0 }}
          className="dungeon-panel parchment tape max-w-3xl p-6 sm:p-8"
        >
          <h1
            className="text-4xl leading-none text-[#3a1810] sm:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h1>
          <p
            className="mt-4 max-w-xl text-sm leading-relaxed text-[#4a3020] sm:text-base"
            style={{ fontFamily: 'var(--font-rune)' }}
          >
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => scrollTo(primaryAction.sectionId)}
              className="border-2 border-[#8a1c1c] bg-[#c23b22] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0a0808] transition-colors hover:bg-[#d64a2e]"
            >
              {primaryAction.label}
            </button>
            {secondaryAction && (
              <button
                onClick={() => scrollTo(secondaryAction.sectionId)}
                className="border-2 border-[#5a4a3a] bg-[#2a2018] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#d4c5a8] transition-colors hover:border-[#8b7355]"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="grid w-full max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="dungeon-panel flex flex-col items-center gap-1.5 p-3 text-center"
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              <p className={`font-mono text-lg font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
