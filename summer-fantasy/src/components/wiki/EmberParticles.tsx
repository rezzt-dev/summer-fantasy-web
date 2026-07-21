'use client';

import { useEffect } from 'react';

export default function EmberParticles() {
  useEffect(() => {
    const container = document.getElementById('embers');
    if (!container) return;

    const emberCount = 10;
    const embers: HTMLDivElement[] = [];

    for (let i = 0; i < emberCount; i++) {
      const ember = document.createElement('div');
      ember.className = 'ember';
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.bottom = `${Math.random() * 15}%`;
      ember.style.animationDuration = `${6 + Math.random() * 10}s`;
      ember.style.animationDelay = `${Math.random() * 6}s`;
      ember.style.opacity = `${0.2 + Math.random() * 0.4}`;
      container.appendChild(ember);
      embers.push(ember);
    }

    return () => {
      embers.forEach((e) => e.remove());
    };
  }, []);

  return null;
}
