'use client';

import { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress changes
    const updateProgress = () => {
      const states = [33, 66, 100];
      const newState = (Math.floor(Date.now() / 5000) % 3);
      setProgress(states[newState]);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 5000);

    return () => clearInterval(interval);
  }, []);

  const createSparks = (count: number) => {
    if (typeof document === 'undefined') return;
    
    const progressContainer = document.querySelector('.progress-container');
    if (!progressContainer) return;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'progress-spark';
      const left = Math.random() * progress;
      spark.style.left = `${left}%`;
      spark.style.top = `${Math.random() * 100}%`;
      progressContainer.appendChild(spark);

      // Animate spark
      requestAnimationFrame(() => {
        spark.style.opacity = '1';
        spark.style.transform = `translateY(${Math.random() * 20 - 10}px)`;
        setTimeout(() => {
          spark.style.opacity = '0';
          setTimeout(() => spark.remove(), 300);
        }, 200);
      });
    }
  };

  useEffect(() => {
    // Create sparks based on progress
    const sparkCount = Math.floor(progress / 20);
    createSparks(sparkCount);

    // Add hover effect
    const progressContainer = document.querySelector('.progress-container');
    if (!progressContainer) return;

    const handleMouseEnter = () => {
      const interval = setInterval(() => createSparks(5), 100);
      
      const handleMouseLeave = () => {
        clearInterval(interval);
        progressContainer.removeEventListener('mouseleave', handleMouseLeave);
      };
      
      progressContainer.addEventListener('mouseleave', handleMouseLeave, { once: true });
    };

    progressContainer.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      progressContainer.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [progress]);

  return (
    <div className="progress-container">
      <div className="progress-bar" id="registration-progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
}