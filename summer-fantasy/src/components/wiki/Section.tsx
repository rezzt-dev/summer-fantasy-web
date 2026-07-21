'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  accent?: 'orange' | 'red' | 'purple' | 'blue' | 'emerald' | 'slate';
}

const titleMap = {
  orange: 'text-orange-400',
  red: 'text-red-400',
  purple: 'text-purple-400',
  blue: 'text-blue-400',
  emerald: 'text-emerald-400',
  slate: 'text-stone-400',
};

const glowMap = {
  orange: 'shadow-[0_0_20px_rgba(251,146,60,0.15)]',
  red: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]',
  purple: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  blue: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
  emerald: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  slate: 'shadow-[0_0_20px_rgba(120,113,108,0.1)]',
};

export default function Section({ id, title, subtitle, children, className = '', accent = 'orange' }: SectionProps) {
  return (
    <section id={id} className={`border-b-4 border-border py-10 sm:py-14 ${className}`}>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <div className="dungeon-panel mb-4 inline-flex items-center gap-3 px-4 py-2">
            <div className={`h-7 w-1.5 ${titleMap[accent].replace('text-', 'bg-')}`} />
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl ${titleMap[accent]}`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {title}
            </h2>
            <div className={`h-7 w-1.5 ${titleMap[accent].replace('text-', 'bg-')}`} />
          </div>

          {subtitle && (
            <div className="dungeon-panel max-w-3xl p-3 sm:p-4">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base" style={{ fontFamily: 'var(--font-rune)' }}>
                {subtitle}
              </p>
            </div>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
