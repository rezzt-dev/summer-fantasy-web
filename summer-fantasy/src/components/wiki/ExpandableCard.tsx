'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ExpandableCardProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  icon?: string | React.ReactNode;
  accent?: 'orange' | 'red' | 'purple' | 'blue' | 'emerald' | 'slate';
  defaultOpen?: boolean;
}

const accentMap = {
  orange: 'hover:border-orange-600 focus-within:border-orange-600',
  red: 'hover:border-red-600 focus-within:border-red-600',
  purple: 'hover:border-purple-600 focus-within:border-purple-600',
  blue: 'hover:border-blue-600 focus-within:border-blue-600',
  emerald: 'hover:border-emerald-600 focus-within:border-emerald-600',
  slate: 'hover:border-stone-600 focus-within:border-stone-600',
};

const iconGlowMap = {
  orange: 'shadow-[0_0_12px_rgba(251,146,60,0.25)]',
  red: 'shadow-[0_0_12px_rgba(239,68,68,0.25)]',
  purple: 'shadow-[0_0_12px_rgba(168,85,247,0.25)]',
  blue: 'shadow-[0_0_12px_rgba(59,130,246,0.25)]',
  emerald: 'shadow-[0_0_12px_rgba(16,185,129,0.25)]',
  slate: 'shadow-[0_0_12px_rgba(120,113,108,0.15)]',
};

export default function ExpandableCard({
  title,
  subtitle,
  badge,
  children,
  icon,
  accent = 'orange',
  defaultOpen = false,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3 }}
      className={`dungeon-panel overflow-hidden transition-colors ${accentMap[accent]}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 p-3 text-left sm:gap-4 sm:p-4"
      >
        {icon && (
          <div className={`mc-slot flex h-12 w-12 shrink-0 items-center justify-center p-2 sm:h-14 sm:w-14 ${iconGlowMap[accent]}`}>
            {typeof icon === 'string' ? (
              <img src={icon} alt="" className="h-full w-full object-contain" />
            ) : (
              icon
            )}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-baseline gap-2">
            <h3
              className="min-w-0 flex-1 break-words text-base font-bold text-foreground sm:text-lg"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {title}
            </h3>
            {badge && <div className="shrink-0">{badge}</div>}
          </div>
          {subtitle && <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm" style={{ fontFamily: 'var(--font-rune)' }}>{subtitle}</p>}
        </div>
        <div
          className={`shrink-0 border-2 border-border bg-secondary p-1.5 transition-all duration-200 ${
            open ? 'rotate-180 border-primary bg-primary/10' : ''
          }`}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t-2 border-border bg-[#0e0c0b] p-3 text-sm leading-relaxed text-muted-foreground sm:p-4 sm:text-base">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
