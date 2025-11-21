import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  phone?: string;
  email?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  onHeightCalculated?: (height: number) => void;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
  onHeightCalculated
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo: ChromaItem[] = [
    {
      image: '/profile1.jpg',
      title: 'Sarah Mitchell',
      subtitle: 'Senior Partner',
      handle: '@sarahmitchell',
      phone: '+1 (555) 123-4567',
      email: 'sarah.mitchell@abrolassociates.com',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(145deg,#ffffff,#000)',
      url: 'https://linkedin.com/in/sarahmitchell'
    },
    {
      image: '/profile2.jpg',
      title: 'David Rodriguez',
      subtitle: 'Senior Tax Advisor',
      handle: '@davidrod',
      phone: '+1 (555) 234-5678',
      email: 'david.rodriguez@abrolassociates.com',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(210deg,#ffffff,#000)',
      url: 'https://linkedin.com/in/davidrod'
    },
    {
      image: '/profile3.jpg',
      title: 'Emily Chen',
      subtitle: 'Asset Protection Specialist',
      handle: '@emilychen',
      phone: '+1 (555) 345-6789',
      email: 'emily.chen@abrolassociates.com',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(165deg,#ffffff,#000)',
      url: 'https://linkedin.com/in/emilychen'
    },
    {
      image: '/profile4.jpg',
      title: 'Michael Thompson',
      subtitle: 'Business Structure Advisor',
      handle: '@mikethompson',
      phone: '+1 (555) 456-7890',
      email: 'michael.thompson@abrolassociates.com',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(195deg,#ffffff,#000)',
      url: 'https://linkedin.com/in/mikethompson'
    },
    {
      image: '/profile5.jpg',
      title: 'Jessica Park',
      subtitle: 'Estate Planning Specialist',
      handle: '@jessicapark',
      phone: '+1 (555) 567-8901',
      email: 'jessica.park@abrolassociates.com',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(225deg,#ffffff,#000)',
      url: 'https://linkedin.com/in/jessicapark'
    },
    {
      image: '/profile6.jpg',
      title: 'Robert Kumar',
      subtitle: 'Trust & Compliance Manager',
      handle: '@robertkumar',
      phone: '+1 (555) 678-9012',
      email: 'robert.kumar@abrolassociates.com',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg,#06B6D4,#000)',
      url: 'https://linkedin.com/in/robertkumar'
    }
  ];

  const data = items?.length ? items : demo;

  // Calculate number of rows and dynamic height
  const totalCards = data.length;
  const cardsPerRow = 3;
  const numberOfRows = Math.ceil(totalCards / cardsPerRow);
  const cardHeight = 380; // Approximate height of each card
  const rowSpacing = 48; // space-y-12 = 48px
  const dynamicHeight = numberOfRows * cardHeight + (numberOfRows - 1) * rowSpacing + 100; // +100 for padding

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  // Call height calculation callback when data changes
  useEffect(() => {
    if (onHeightCalculated) {
      onHeightCalculated(dynamicHeight);
    }
  }, [dynamicHeight, onHeightCalculated]);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = (phone?: string, e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent card click
    if (phone) {
      window.location.href = `tel:${phone.replace(/[^0-9+]/g, '')}`;
    }
  };

  const handleEmailClick = (email?: string, e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent card click
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-col items-center space-y-12 ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties
      }
    >
      {/* Desktop: 3 cards in one row, Mobile: 1 card per row (vertical stack) */}
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-8 md:space-y-0 pb-8 md:pb-0">
        {data.slice(0, 3).map((c, i) => (
          <article
            key={i}
            onMouseMove={handleCardMove}
            onClick={() => handleCardClick(c.url)}
            className="group relative flex flex-col w-[300px] mx-auto md:mx-0 rounded-[20px] overflow-hidden border border-gray-700 transition-colors duration-300 cursor-pointer bg-gray-900 mb-4 md:mb-0"
            style={
              {
                '--spotlight-color': 'rgba(255,255,255,0.3)'
              } as React.CSSProperties
            }
          >
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
              }}
            />
            <div className="relative z-10 h-64 p-[10px] box-border overflow-hidden">
              <Image 
                src={c.image} 
                alt={c.title} 
                fill
                className="object-cover rounded-[10px]" 
              />
            </div>
            <footer className="relative z-10 p-3 text-white font-sans">
              <div className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 mb-3">
                <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
                {c.handle && <span className="text-[0.95rem] opacity-80 text-right">{c.handle}</span>}
                <p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>
                {c.location && <span className="text-[0.85rem] opacity-85 text-right">{c.location}</span>}
              </div>
              
              {/* Contact Actions */}
              {(c.phone || c.email) && (
                <div className="flex items-center justify-start space-x-6 pt-2 border-t border-gray-700">
                  {c.phone && (
                    <button
                      onClick={(e) => handlePhoneClick(c.phone, e)}
                      className="group flex items-center space-x-1.5 text-[0.8rem] text-gray-300 hover:text-white transition-colors duration-200 relative"
                    >
                      {/* Phone Icon */}
                      <svg 
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                        />
                      </svg>
                      <span>Call</span>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></div>
                    </button>
                  )}
                  {c.email && (
                    <button
                      onClick={(e) => handleEmailClick(c.email, e)}
                      className="group flex items-center space-x-1.5 text-[0.8rem] text-gray-300 hover:text-white transition-colors duration-200 relative"
                    >
                      {/* Email Icon */}
                      <svg 
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                        />
                      </svg>
                      <span>Email</span>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></div>
                    </button>
                  )}
                </div>
              )}
            </footer>
          </article>
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          opacity: 1
        }}
      />
    </div>
  );
};

export default ChromaGrid;
