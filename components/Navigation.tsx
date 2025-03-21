'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed w-full bg-transparent z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="#" className="text-2xl font-bold text-white">Hackathon.dev</Link>
          <div className="hidden md:flex space-x-4">
            <Link href="#overview" className="nav-link">Overview</Link>
            <Link href="#schedule" className="nav-link">Schedule</Link>
            <Link href="#challenges" className="nav-link">Challenges</Link>
            <Link href="#prizes" className="nav-link">Prizes</Link>
            <Link href="#sponsors" className="nav-link">Sponsors</Link>
            <Link href="#judges" className="nav-link">Judges</Link>
            <Link href="#contestants" className="nav-link">Contestants</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}