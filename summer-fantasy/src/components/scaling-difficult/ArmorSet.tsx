'use client';

import { motion } from 'framer-motion';
import { Link } from 'lucide-react';

interface ArmorPiece {
  slot: string;
  src: string;
}

interface ArmorSetProps {
  pieces: ArmorPiece[];
}

export default function ArmorSet({ pieces }: ArmorSetProps) {
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-2 border-2 border-border bg-[#0e0c0b] p-3 sm:gap-3 sm:p-4">
      {/* Decorative chain links */}
      <div className="absolute -left-1 top-1/2 hidden -translate-y-1/2 flex-col gap-1 lg:flex">
        {[...Array(3)].map((_, i) => (
          <Link key={i} className="h-3 w-3 rotate-90 text-[#4a3a2a]" />
        ))}
      </div>
      <div className="absolute -right-1 top-1/2 hidden -translate-y-1/2 flex-col gap-1 lg:flex">
        {[...Array(3)].map((_, i) => (
          <Link key={i} className="h-3 w-3 -rotate-90 text-[#4a3a2a]" />
        ))}
      </div>

      {pieces.map((piece) => (
        <motion.div
          key={piece.slot}
          whileHover={{ scale: 1.06 }}
          className="group relative mc-slot h-12 w-12 p-2 sm:h-14 sm:w-14"
          title={piece.slot}
        >
          <img
            src={piece.src}
            alt={piece.slot}
            className="h-full w-full object-contain"
          />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            {piece.slot}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
