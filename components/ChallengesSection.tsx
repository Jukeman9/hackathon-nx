'use client';

import { useEffect, useState } from 'react';

export default function ChallengesSection() {
  const [titleText, setTitleText] = useState('Challenges');

  useEffect(() => {
    const corruptTextInterval = setInterval(() => {
      const text = 'Challenges';
      let result = '';

      for (let i = 0; i < text.length; i++) {
        if (Math.random() > 0.8) {
          // Replace with a glitched character
          const charCode = text.charCodeAt(i) + (Math.floor(Math.random() * 5) - 2);
          result += String.fromCharCode(charCode);
        } else {
          result += text[i];
        }
      }
      setTitleText(result);
    }, 100); // Update every 100ms

    return () => clearInterval(corruptTextInterval);
  }, []);

  return (
    <section id="challenges" className="py-20 bg-gray-900 section">
      <div className="container mx-auto px-4">
        <h2 className="corrupted-text text-center md:text-left section-title" data-text={titleText}>{titleText}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="matrix-bg p-6 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <h3 className="text-xl font-bold mb-4 section-title">AI & Machine Learning</h3>
            <p>Build innovative solutions using cutting-edge AI technologies</p>
          </div>
          <div className="matrix-bg p-6 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <h3 className="text-xl font-bold mb-4 section-title">Web3 & Blockchain</h3>
            <p>Create decentralized applications and blockchain solutions</p>
          </div>
          <div className="matrix-bg p-6 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <h3 className="text-xl font-bold mb-4 section-title">Sustainability</h3>
            <p>Develop solutions for environmental and social impact</p>
          </div>
        </div>
      </div>
    </section>
  );
}