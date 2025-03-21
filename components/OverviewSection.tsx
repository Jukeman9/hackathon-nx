'use client';

import { useEffect, useRef } from 'react';
import TextScramble from './ui/TextScramble';

export default function OverviewSection() {
  const typewriterRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typewriterRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('start');
              setTimeout(() => {
                entry.target.classList.add('finished');
              }, 2000);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5, rootMargin: '-50px' }
      );

      observer.observe(typewriterRef.current);
    }
  }, []);

  return (
    <section id="overview" className="py-20 bg-gray-900 section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center gradient-text section-title">
          <TextScramble text="Overview" />
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/[0.03] p-8 rounded-lg shadow-lg backdrop-blur-md border border-white/5 transform transition-all duration-300 hover:transform hover:translate-y-[-8px] hover:shadow-xl hover:border-purple-500/20">
            <h3 className="text-2xl font-bold mb-4 section-title text-purple-300 hover:text-purple-300">
              <TextScramble text="About the Event" />
            </h3>
            <p className="text-white mb-6 typewriter" ref={typewriterRef}>
              Join us for the world's largest hackathon, where innovation meets opportunity.
              With over $1 million in prizes and support from industry leaders, this is your
              chance to make history.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-[#39ff14] mr-2 text-xl">✓</span>
                <span className="text-white text-lg">Global Participation</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#39ff14] mr-2 text-xl">✓</span>
                <span className="text-white text-lg">Expert Mentorship</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#39ff14] mr-2 text-xl">✓</span>
                <span className="text-white text-lg">Industry Networking</span>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.03] p-8 rounded-lg shadow-lg backdrop-blur-md border border-white/5 transform transition-all duration-300 hover:transform hover:translate-y-[-8px] hover:shadow-xl hover:border-purple-500/20">
            <h3 className="text-2xl font-bold mb-4 section-title text-[#39ff14]">
              <TextScramble text="Prize Pool" />
            </h3>
            <p className="text-4xl font-bold mb-4 text-[#ff69b4] scramble-on-hover" data-text="$1M+ Prize Pool">
              $1M+ Prize Pool
            </p>
            <p className="text-gray-400 bg-black/20 p-2 rounded-lg backdrop-blur-sm mt-4 text-shadow">
              Compete for a share of our massive prize pool, including cash prizes,
              mentorship opportunities, and potential job offers from leading tech companies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}