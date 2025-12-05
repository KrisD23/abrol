'use client';

import React from 'react';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  borderRadius?: number;
  blur?: number;
  opacity?: number;
  backgroundOpacity?: number;
  hoverable?: boolean;
  textColor?: string;
}

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  className = '',
  style = {},
  onClick,
  borderRadius = 16,
  blur = 12,
  opacity = 0.25,
  backgroundOpacity = 0.05,
  hoverable = true,
  textColor = 'text-white',
}) => {
  const baseStyles: React.CSSProperties = {
    ...style,
    borderRadius: `${borderRadius}px`,
    background: `rgba(0, 0, 0, ${backgroundOpacity * 2})`,
    backdropFilter: `blur(${blur}px) saturate(1.5)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(1.5)`,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: `
      0 8px 32px 0 rgba(0, 0, 0, 0.1),
      0 2px 16px 0 rgba(0, 0, 0, 0.05),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)
    `,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  };

  const hoverStyles: React.CSSProperties = hoverable ? {
    transform: 'translateY(-1px) scale(1.02)',
    boxShadow: `
      0 16px 48px 0 rgba(0, 0, 0, 0.15),
      0 4px 24px 0 rgba(0, 0, 0, 0.08),
      inset 0 2px 0 0 rgba(255, 255, 255, 0.5),
      inset 0 -2px 0 0 rgba(255, 255, 255, 0.2),
      0 0 30px rgba(255, 255, 255, 0.3)
    `,
    backdropFilter: `blur(${blur + 6}px) saturate(1.8) brightness(1.1)`,
    WebkitBackdropFilter: `blur(${blur + 6}px) saturate(1.8) brightness(1.1)`,
    background: `rgba(0, 116, 255, ${backgroundOpacity + 0.08})`,
    border: '1px solid rgba(255, 255, 255, 0.4)',
  } : {};

  return (
    <div
      className={`glass-surface relative overflow-hidden ${className}`}
      style={baseStyles}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hoverable) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          Object.assign(e.currentTarget.style, baseStyles);
        }
      }}
    >
      {/* Glass refraction overlay - creates the shimmer effect */}
       {/* background: `
            linear-gradient(135deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.6) 40%, 
              rgba(255, 255, 255, 0.9) 50%, 
              rgba(255, 255, 255, 0.6) 60%, 
              transparent 100%
            )
          `, */}
      <div 
        className="absolute inset-0 opacity-0 transition-all duration-500 pointer-events-none glass-shimmer"
        style={{
          borderRadius: `${borderRadius}px`,
          transform: 'translateX(-100%) skewX(-15deg)',
        }}
      />
      
      {/* Frosted glass texture overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)
          `,
          borderRadius: `${borderRadius}px`,
        }}
      />
      
      {/* Content wrapper */}
      <div className={`relative z-20 h-full w-full flex items-center justify-center ${textColor}`}>
        {children}
      </div>

      <style jsx>{`
        .glass-surface {
          position: relative;
        }
        
        .glass-surface:hover .glass-shimmer {
          opacity: 1;
          transform: translateX(100%) skewX(-15deg);
        }


        
        .glass-surface:active {
          transform: scale(0.98) !important;
        }
      `}</style>
    </div>
  );
};

export default GlassSurface;