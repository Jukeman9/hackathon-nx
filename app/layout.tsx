import './globals.css';
import type { Metadata } from 'next';
import { Inter, Source_Code_Pro, Quicksand } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sourceCodePro = Source_Code_Pro({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-source-code-pro'
});
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-quicksand'
});

export const metadata: Metadata = {
  title: 'Hackathon.dev - The World\'s Largest Hackathon',
  description: 'Join the world\'s largest hackathon with 100K builders, 24 hours, and $1M+ in prizes.',
  icons: {
    icon: '/favicon.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="no-fouc">
      <head>
        <script type="importmap" dangerouslySetInnerHTML={{
          __html: `
          {
              "imports": {
                  "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
                  "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
              }
          }
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Handle loading states
            document.addEventListener('DOMContentLoaded', () => {
              const loadingScreen = document.getElementById('loading-screen');
              
              // Wait for all content to load
              window.addEventListener('load', () => {
                // Scroll to top
                window.scrollTo(0, 0);
                
                // Show content
                document.body.classList.add('loaded');

                // Handle images
                document.querySelectorAll('img').forEach(img => {
                  if (img.complete) {
                    img.classList.add('loaded');
                  } else {
                    img.addEventListener('load', () => img.classList.add('loaded'));
                  }
                });

                // Remove loading screen with a slight delay
                setTimeout(() => {
                  if (loadingScreen) {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => loadingScreen.remove(), 500);
                  }
                }, 1000);
              });
            });
          `
        }} />
      </head>
      <body className={`${inter.variable} ${sourceCodePro.variable} ${quicksand.variable}`} suppressHydrationWarning>
        <div id="loading-screen" className="loading-screen">
          <div className="loading-content">
            <div className="loading-text">INITIALIZING...</div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}