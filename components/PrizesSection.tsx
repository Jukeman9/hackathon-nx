'use client';

import { useEffect } from 'react';

export default function PrizesSection() {
  useEffect(() => {
    // Initialize chip grid animation
    const prizeCards = document.querySelectorAll('#prizes .bg-white');
    
    prizeCards.forEach(card => {
      // Create chip grid
      const chipGrid = document.createElement('div');
      chipGrid.className = 'chip-grid';
      
      // Create 100 cells (10x10 grid)
      for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.className = 'chip-cell';
        chipGrid.appendChild(cell);
      }
      
      // Add grid to card
      card.appendChild(chipGrid);
      
      // Animate the grid
      function animateChipGrid() {
        const cells = chipGrid.querySelectorAll('.chip-cell');
        
        cells.forEach(cell => {
          if (Math.random() > 0.95) {
            // Random brightness
            const brightness = Math.random();
            (cell as HTMLElement).style.backgroundColor = `rgba(0, 191, 255, ${brightness})`;
            
            // Fade out animation
            setTimeout(() => {
              (cell as HTMLElement).style.backgroundColor = 'rgba(0, 191, 255, 0.2)';
            }, Math.random() * 500 + 100);
          }
        });
      }
      
      // Start animation loop
      const animationInterval = setInterval(animateChipGrid, 50);
      
      // Cleanup on unmount
      return () => clearInterval(animationInterval);
    });
  }, []);

  return (
    <section id="prizes" className="py-20 bg-gray-800 section">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center gradient-text section-title scramble-on-hover" data-text="Prizes">Prizes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 section-title">1st Place</h3>
            <p className="hologram-text" data-text="$500,000">$500,000</p>
            <p className="text-gray-600">Plus mentorship and potential job opportunities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 section-title">2nd Place</h3>
            <p className="hologram-text" data-text="$250,000">$250,000</p>
            <p className="text-gray-600">Plus mentorship and potential job opportunities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 section-title">3rd Place</h3>
            <p className="hologram-text" data-text="$100,000">$100,000</p>
            <p className="text-gray-600">Plus mentorship and potential job opportunities</p>
          </div>
        </div>
      </div>
    </section>
  );
}