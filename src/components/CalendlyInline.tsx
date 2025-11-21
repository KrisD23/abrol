// components/CalendlyInline.tsx
import Script from 'next/script';
import { useEffect, useState } from 'react';

interface CalendlyInlineProps {
  url?: string;
  height?: string;
  minWidth?: string;
  className?: string;
}

const CalendlyInline: React.FC<CalendlyInlineProps> = ({
  url = "https://calendly.com/mohnishsingh03/30min",
  height = "700px",
  minWidth = "320px",
  className = ""
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div 
        className={`calendly-loading ${className}`}
        style={{ 
          minWidth, 
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px'
        }}
      >
        <div style={{ textAlign: 'center', color: '#6c757d' }}>
          <div style={{ marginBottom: '16px' }}>
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ animation: 'spin 1s linear infinite' }}
            >
              <path d="M21 12c0 1.2-0.2 2.4-0.7 3.6-0.5 1.2-1.3 2.3-2.3 3.2-0.9 0.9-2 1.7-3.2 2.3-1.2 0.5-2.4 0.7-3.6 0.7-1.2 0-2.4-0.2-3.6-0.7-1.2-0.5-2.3-1.3-3.2-2.3-0.9-0.9-1.7-2-2.3-3.2-0.5-1.2-0.7-2.4-0.7-3.6 0-1.2 0.2-2.4 0.7-3.6 0.5-1.2 1.3-2.3 2.3-3.2 0.9-0.9 2-1.7 3.2-2.3 1.2-0.5 2.4-0.7 3.6-0.7"/>
            </svg>
          </div>
          <p>Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Load Calendly script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
        onError={(e) => {
          console.error('Failed to load Calendly script:', e);
        }}
      />
      
      {/* Calendly inline widget */}
      <div 
        className={`calendly-inline-widget ${className}`}
        data-url={url}
        style={{ 
          minWidth, 
          height,
          border: 'none',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      />
      
      {/* Loading indicator styles */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .calendly-inline-widget {
          background: transparent;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .calendly-inline-widget {
            min-width: 280px !important;
            height: 600px !important;
          }
        }
        
        @media (max-width: 480px) {
          .calendly-inline-widget {
            min-width: 100% !important;
            height: 500px !important;
          }
        }
      `}</style>
    </>
  );
};

export default CalendlyInline;