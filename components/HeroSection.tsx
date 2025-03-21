'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Countdown from './ui/Countdown';
import ProgressBar from './ui/ProgressBar';

// Dynamically import ThreeScene with no SSR
const ThreeScene = dynamic(() => import('./ui/ThreeScene'), { ssr: false });

export default function HeroSection() {
  return (
    <>
      <div className="scene-container" id="scene-container">
        <ThreeScene />
      </div>
      <section className="min-h-screen flex flex-col justify-between relative section" id="hero">
        <div className="hero-content container mx-auto px-4 mt-[50px]">
          <h1 className="hero-title">
            The World's Largest Hackathon
          </h1>
          <h2 className="hero-subtitle">
            100K Builders. <span className="neon-green">24 Hours</span>. <span className="neon-pink">$1M+</span> in prizes.
          </h2>
          <p className="hero-text">
            Join us for an unprecedented event.
          </p>
        </div>
        <div className="container mx-auto px-4 mb-[50px]">
          <div className="countdown-container">
            <Countdown targetDate="2025-04-22T00:00:00" />
          </div>
          <div className="register-container">
            <ProgressBar />
            <button className="">Register Now</button>
          </div>
        </div>
      </section>
    </>
  );
}