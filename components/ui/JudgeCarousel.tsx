'use client';

import { useEffect, useRef, useState } from 'react';

interface Judge {
  name: string;
  title: string;
  videoSrc: string;
}

const judges: Judge[] = [
  {
    name: "Pieter Levels",
    title: "Chief Shitposting Officer and a notable indie maker",
    videoSrc: "/video/pieter.mp4"
  },
  {
    name: "Sarah Guo",
    title: "Founder of Conviction focused on Software 3.0",
    videoSrc: "/video/sarah.mp4"
  },
  {
    name: "Logan Killpatrick",
    title: "Product leader at Google AI Studio",
    videoSrc: "/video/logan.mp4"
  },
  {
    name: "Theo Browne",
    title: "Founder of t3.gg",
    videoSrc: "/video/theo.mp4"
  },
  {
    name: "Evan You",
    title: "Creator of Vue.js",
    videoSrc: "/video/evan.mp4"
  },
  {
    name: "KP",
    title: "Tech Influencer & Developer",
    videoSrc: "/video/kp.mp4"
  },
  {
    name: "Alex Albert",
    title: "Head of Claude Relations at Anthropic",
    videoSrc: "/video/alex.mp4"
  },
  {
    name: "Ben Tossell",
    title: "At the forefront of no-code and product-building communities",
    videoSrc: "/video/ben.mp4"
  }
];

export default function JudgeCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, judges.length);
  }, []);

  // Handle video playback
  useEffect(() => {
    const playVideos = async () => {
      try {
        const promises = videoRefs.current.map(async (videoRef) => {
          if (videoRef) {
            videoRef.currentTime = 0;
            await videoRef.play();
          }
        });
        await Promise.all(promises);
      } catch (error) {
        console.error('Error playing videos:', error);
      }
    };

    playVideos();
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const cards = carousel.querySelectorAll('.judge-card');

    // Set initial card width
    if (cards.length > 0) {
      const firstCard = cards[0] as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const gap = 32; // Gap between cards
      setCardWidth(cardWidth + gap);
    }

    // Set up scroll event for updating active dot
    const handleScroll = () => {
      const scrollPosition = carousel.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveDotIndex(Math.min(newIndex, judges.length - 1));
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [cardWidth]);

  const handlePrevClick = () => {
    if (!carouselRef.current) return;
    
    const newIndex = activeDotIndex > 0 ? activeDotIndex - 1 : judges.length - 1;
    const scrollPosition = newIndex * cardWidth;
    
    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setActiveDotIndex(newIndex);
  };

  const handleNextClick = () => {
    if (!carouselRef.current) return;
    
    const newIndex = activeDotIndex < judges.length - 1 ? activeDotIndex + 1 : 0;
    const scrollPosition = newIndex * cardWidth;
    
    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setActiveDotIndex(newIndex);
  };

  const scrollToPosition = (index: number) => {
    if (!carouselRef.current || !cardWidth) return;
    
    const scrollPosition = index * cardWidth;
    
    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setActiveDotIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevClick();
      } else if (e.key === 'ArrowRight') {
        handleNextClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeDotIndex]);

  return (
    <div className="judge-carousel-container">
      <div className="carousel-arrow prev" onClick={handlePrevClick}></div>
      <div className="carousel-arrow next" onClick={handleNextClick}></div>
      <div className="judge-carousel" ref={carouselRef}>
        {judges.map((judge, index) => (
          <div key={index} className="judge-card">
            <video 
              ref={el => videoRefs.current[index] = el}
              autoPlay 
              loop 
              muted 
              playsInline 
              className="judge-video"
              onLoadedData={(e) => {
                const video = e.target as HTMLVideoElement;
                video.play().catch(err => console.error('Video play error:', err));
              }}
            >
              <source src={judge.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3>{judge.name}</h3>
            <p>{judge.title}</p>
          </div>
        ))}
      </div>
      <div className="carousel-nav">
        {judges.map((_, index) => (
          <div 
            key={index}
            className={`carousel-dot ${index === activeDotIndex ? 'active' : ''}`}
            onClick={() => scrollToPosition(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}