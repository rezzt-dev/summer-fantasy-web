'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const phases = [
  { day: 0, label: 'Inicio', desc: 'Mundo normal', color: 'stone', hex: '#78716c' },
  { day: 10, label: 'Despertar', desc: 'Primeras mejoras', color: 'green', hex: '#22c55e' },
  { day: 20, label: 'Amenaza', desc: 'Mini hordas', color: 'blue', hex: '#3b82f6' },
  { day: 25, label: 'Inquietud', desc: 'Brujas y fuego', color: 'purple', hex: '#a855f7' },
  { day: 30, label: 'Invasión', desc: 'Élite diamante', color: 'yellow', hex: '#eab308' },
  { day: 35, label: 'Mutación', desc: 'Endermen y jinetes', color: 'white', hex: '#f5f5f4' },
  { day: 40, label: 'Cenit', desc: 'Todo al máximo', color: 'red', hex: '#ef4444' },
];

const colorClasses: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  stone: { border: 'border-stone-600', bg: 'bg-stone-600', text: 'text-stone-400', glow: 'shadow-[0_0_10px_rgba(120,113,108,0.3)]' },
  green: { border: 'border-green-600', bg: 'bg-green-600', text: 'text-green-400', glow: 'shadow-[0_0_10px_rgba(34,197,94,0.3)]' },
  blue: { border: 'border-blue-600', bg: 'bg-blue-600', text: 'text-blue-400', glow: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]' },
  purple: { border: 'border-purple-600', bg: 'bg-purple-600', text: 'text-purple-400', glow: 'shadow-[0_0_10px_rgba(168,85,247,0.3)]' },
  yellow: { border: 'border-yellow-600', bg: 'bg-yellow-600', text: 'text-yellow-400', glow: 'shadow-[0_0_10px_rgba(234,179,8,0.3)]' },
  white: { border: 'border-stone-300', bg: 'bg-stone-200', text: 'text-stone-200', glow: 'shadow-[0_0_10px_rgba(245,245,244,0.3)]' },
  red: { border: 'border-red-600', bg: 'bg-red-600', text: 'text-red-400', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]' },
};

export default function PhaseTimeline() {
  return (
    <div className="dungeon-panel blood-border mb-8 p-4 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-2 border-b-2 border-border pb-4 sm:flex-row sm:items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
          <AlertTriangle className="h-4 w-4" />
          Progresión de dificultad
        </h3>
        <span className="font-mono text-xs text-muted-foreground">día 0 → 40+</span>
      </div>

      {/* Desktop horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute left-0 right-0 top-[22px] h-1 bg-gradient-to-r from-stone-700 via-red-900 to-red-600" />
          <div className="relative flex justify-between">
            {phases.map((phase, index) => {
              const c = colorClasses[phase.color];
              return (
                <motion.div
                  key={phase.day}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                  className="group flex w-24 flex-col items-center text-center lg:w-28"
                >
                  <div
                    className={`relative z-10 mb-2 flex h-11 w-11 items-center justify-center border-2 border-background ${c.bg} ${c.glow} shadow-[0_0_0_3px_var(--background)] transition-transform group-hover:scale-110`}
                    title={phase.label}
                  >
                    <span className="font-mono text-xs font-bold text-[#0a0808]">
                      {phase.day === 0 ? '0' : phase.day}
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-foreground">
                    {phase.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{phase.desc}</span>
                  <span className={`mt-0.5 font-mono text-[10px] ${c.text}`}>
                    d{phase.day}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile vertical */}
      <div className="md:hidden">
        <div className="relative space-y-0 pl-1">
          <div className="absolute bottom-3 left-[15px] top-3 w-1 bg-gradient-to-b from-stone-700 via-red-900 to-red-600" />
          {phases.map((phase, index) => {
            const c = colorClasses[phase.color];
            return (
              <motion.div
                key={phase.day}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                className="group relative flex items-start gap-3 py-2"
              >
                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-background ${c.bg} ${c.glow} shadow-[0_0_0_3px_var(--background)] transition-transform group-hover:scale-110`}
                >
                  <span className="font-mono text-[10px] font-bold text-[#0a0808]">
                    {phase.day === 0 ? '0' : phase.day}
                  </span>
                </div>
                <div className="min-w-0 flex-1 border-l-2 border-border bg-secondary pl-3 pr-2 py-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold uppercase tracking-wide text-foreground">
                      {phase.label}
                    </span>
                    <span className={`font-mono text-xs ${c.text}`}>d{phase.day}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{phase.desc}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
