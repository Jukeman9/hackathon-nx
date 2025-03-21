'use client';

import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
}

export default function TextScramble({ text }: TextScrambleProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const charsRef = useRef('!<>-_\\/[]{}—=+*^?#________');
  const frameRef = useRef(0);
  const frameRequestRef = useRef<number | null>(null);
  const queueRef = useRef<Array<{ from: string; to: string; start: number; end: number; char?: string }>>([]);
  const resolveRef = useRef<(() => void) | null>(null);
  const isAnimatingRef = useRef(false);

  const randomChar = () => charsRef.current[Math.floor(Math.random() * charsRef.current.length)];

  const setText = (newText: string) => {
    if (isAnimatingRef.current || !elementRef.current) return Promise.resolve();
    isAnimatingRef.current = true;

    const oldText = elementRef.current.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (resolveRef.current = resolve));
    queueRef.current = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 80);
      const end = start + Math.floor(Math.random() * 120);
      queueRef.current.push({ from, to, start, end });
    }

    if (frameRequestRef.current) {
      cancelAnimationFrame(frameRequestRef.current);
    }
    frameRef.current = 0;
    update();
    return promise;
  };

  const update = () => {
    if (!elementRef.current) return;

    let output = '';
    let complete = 0;

    for (let i = 0; i < queueRef.current.length; i++) {
      let { from, to, start, end, char } = queueRef.current[i];

      if (frameRef.current >= end) {
        complete++;
        output += to;
      } else if (frameRef.current >= start) {
        if (!char || Math.random() < 0.15) {
          char = randomChar();
          queueRef.current[i].char = char;
        }
        output += `<span class="glitch">${char}</span>`;
      } else {
        output += from;
      }
    }

    elementRef.current.innerHTML = output;

    if (complete === queueRef.current.length) {
      isAnimatingRef.current = false;
      if (resolveRef.current) {
        resolveRef.current();
        resolveRef.current = null;
      }
    } else {
      const timeoutId = setTimeout(() => {
        frameRequestRef.current = requestAnimationFrame(update);
      }, 1000 / 120); // 120 FPS
      frameRef.current++;
      return () => clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();

            // Start animation when in view
            setText(text);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-50px',
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (frameRequestRef.current) {
        cancelAnimationFrame(frameRequestRef.current);
      }
    };
  }, [text]);

  // Add hover effect
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      if (!isAnimatingRef.current) {
        setText(text);
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [text]);

  return (
    <div
      ref={elementRef}
      className={`scramble-text ${visible ? 'visible' : ''}`}
      data-text={text}
    >
      {text}
    </div>
  );
}