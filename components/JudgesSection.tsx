'use client';

import { useEffect, useRef } from 'react';
import JudgeCarousel from './ui/JudgeCarousel';

export default function JudgesSection() {
  return (
    <section id="judges" className="section py-20">
      <div className="container mx-auto px-4">
        <h2 className="gradient-text text-center md:text-left section-title" data-text="Meet Our Judges">Meet Our Judges</h2>
        <JudgeCarousel />
      </div>
    </section>
  );
}