'use client';

import { useState, useEffect, useRef } from 'react';

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isFirstRender, setIsFirstRender] = useState(true);
  const timeUnitsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const hackingTextEffect = (element: HTMLDivElement | null, finalValue: string) => {
    if (!element) return;
    
    const chars = '01!@#$%^&*()_+-={}[]|;:,.<>?/';
    let iterations = 0;
    const maxIterations = 20;
    const interval = 100;

    const animate = () => {
      if (iterations >= maxIterations) {
        element.textContent = finalValue;
        element.classList.remove('hacking');
        return;
      }

      let result = '';
      for (let i = 0; i < finalValue.length; i++) {
        if (Math.random() > 0.7) {
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += finalValue[i];
        }
      }

      element.classList.add('hacking');
      element.textContent = result;
      iterations++;
      setTimeout(animate, interval);
    };

    animate();
  };

  useEffect(() => {
    const target = new Date(targetDate);

    const updateTimer = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setDays('00');
        setHours('00');
        setMinutes('00');
        setSeconds('00');
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      const newDays = d.toString().padStart(2, '0');
      const newHours = h.toString().padStart(2, '0');
      const newMinutes = m.toString().padStart(2, '0');
      const newSeconds = s.toString().padStart(2, '0');

      if (isFirstRender) {
        hackingTextEffect(timeUnitsRef.current['days'], newDays);
        hackingTextEffect(timeUnitsRef.current['hours'], newHours);
        hackingTextEffect(timeUnitsRef.current['minutes'], newMinutes);
        hackingTextEffect(timeUnitsRef.current['seconds'], newSeconds);
        setIsFirstRender(false);
      }

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate, isFirstRender]);

  return (
    <div className="timer-container">
      <div className="timer-segment">
        <div ref={el => timeUnitsRef.current['days'] = el} id="days" className="time-unit">{days}</div>
        <div className="unit-label">Days</div>
      </div>
      <div className="timer-segment">
        <div ref={el => timeUnitsRef.current['hours'] = el} id="hours" className="time-unit">{hours}</div>
        <div className="unit-label">Hours</div>
      </div>
      <div className="timer-segment">
        <div ref={el => timeUnitsRef.current['minutes'] = el} id="minutes" className="time-unit">{minutes}</div>
        <div className="unit-label">Minutes</div>
      </div>
      <div className="timer-segment">
        <div ref={el => timeUnitsRef.current['seconds'] = el} id="seconds" className="time-unit">{seconds}</div>
        <div className="unit-label">Seconds</div>
      </div>
    </div>
  );
}