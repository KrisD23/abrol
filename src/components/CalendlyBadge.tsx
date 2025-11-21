// components/CalendlyBadge.tsx
import Script from 'next/script';
import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    Calendly: {
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color?: string;
        textColor?: string;
        branding?: boolean;
      }) => void;
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
      destroyBadgeWidget?: () => void;
    };
  }
}

interface CalendlyBadgeProps {
  url: string;
  text: string;
  color?: string;
  textColor?: string;
  branding?: boolean;
  hideGdprBanner?: boolean;
  primaryColor?: string;
  inline?: boolean;
  onInlineOpen?: () => void;
}

const CalendlyBadge: React.FC<CalendlyBadgeProps> = ({
  url,
  text,
  color = '#ffffff',
  textColor = '#ffffff',
  branding = false,
  hideGdprBanner = true,
  primaryColor = 'ffffff',
  inline = false,
  onInlineOpen
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const initTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inlineRef = useRef<HTMLDivElement>(null);

  // Build the complete URL with query parameters
  const buildCalendlyUrl = () => {
    const urlObj = new URL(url);
    
    if (hideGdprBanner) {
      urlObj.searchParams.set('hide_gdpr_banner', '1');
    }
    
    if (primaryColor) {
      urlObj.searchParams.set('primary_color', primaryColor);
    }
    
    return urlObj.toString();
  };

  // Enhanced mobile detection
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      const userAgent = window.navigator.userAgent;
      
      const isMobileDevice = width <= 768 || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkDeviceType();
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkDeviceType, 250);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', checkDeviceType);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', checkDeviceType);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Initialize Calendly widget
  const initializeCalendly = () => {
    if (typeof window !== 'undefined' && window.Calendly && isMounted && isScriptLoaded && !isInitialized) {
      
      // Clear any existing timeouts
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }

      // Destroy any existing widget first
      if (window.Calendly.destroyBadgeWidget) {
        try {
          window.Calendly.destroyBadgeWidget();
        } catch (error) {
          console.warn('Error destroying existing Calendly widget:', error);
        }
      }

      // If inline mode, don't initialize the badge widget
      if (inline) {
        setIsInitialized(true);
        return;
      }

      const delay = isMobile ? 3000 : 2000;

      initTimeoutRef.current = setTimeout(() => {
        try {
          window.Calendly.initBadgeWidget({
            url: buildCalendlyUrl(),
            text,
            color,
            textColor,
            branding
          });

          setIsInitialized(true);

          // Check if widget was created successfully
          checkTimeoutRef.current = setTimeout(() => {
            const widget = document.querySelector('.calendly-badge-widget');
            if (widget) {
              setShowFallback(false);
              // Force correct positioning
              const element = widget as HTMLElement;
              element.style.position = 'fixed';
              element.style.bottom = '20px';
              element.style.right = '20px';
              element.style.zIndex = '999999';
              element.style.display = 'block';
              element.style.visibility = 'visible';
              element.style.opacity = '1';
            } else {
              setShowFallback(true);
              setIsInitialized(false);
            }
          }, 2000);

        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
          setShowFallback(true);
          setIsInitialized(false);
        }
      }, delay);
    }
  };

  const handleInlineOpen = () => {
    if (onInlineOpen) {
      onInlineOpen();
    }
    
    // Initialize inline widget
    setTimeout(() => {
      if (inlineRef.current && window.Calendly && window.Calendly.initInlineWidget) {
        try {
          window.Calendly.initInlineWidget({
            url: buildCalendlyUrl(),
            parentElement: inlineRef.current
          });
        } catch (error) {
          console.error('Error initializing inline Calendly widget:', error);
        }
      }
    }, 100);
  };

  const handleFallbackClick = () => {
    const calendlyUrl = buildCalendlyUrl();
    window.open(calendlyUrl, '_blank', 'width=800,height=600');
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsInitialized(false);
    setShowFallback(false);
  }, []);

  useEffect(() => {
    if (isMounted && isScriptLoaded) {
      const timer = setTimeout(() => {
        initializeCalendly();
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isMounted, isScriptLoaded, initializeCalendly]);

  useEffect(() => {
    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Load Calendly assets */}
      <link 
        href="https://assets.calendly.com/assets/external/widget.css" 
        rel="stylesheet" 
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        type="text/javascript"
        strategy="afterInteractive"
        onLoad={() => {
          setIsScriptLoaded(true);
        }}
        onError={(e) => {
          console.error('Failed to load Calendly script:', e);
          setShowFallback(true);
        }}
      />
      
      {/* Fallback Badge - Only show when needed */}
      {showFallback && (
        <div
          onClick={handleFallbackClick}
          className="calendly-fallback-badge"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: color,
            color: textColor,
            padding: '12px 16px',
            borderRadius: '25px',
            cursor: 'pointer',
            zIndex: 999999,
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '200px',
            pointerEvents: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
          </span>
          <svg 
            width="16" 
            height="16" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ flexShrink: 0 }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" 
            />
          </svg>
        </div>
      )}
      
      {/* Enhanced CSS */}
      <style jsx global>{`
        /* Hide fallback when Calendly widget is present */
        .calendly-badge-widget ~ .calendly-fallback-badge {
          display: none !important;
        }

        .calendly-badge-widget {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 999999 !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        
        .calendly-badge-widget * {
          z-index: 999999 !important;
        }
        
        /* Responsive positioning */
        @media (max-width: 768px) {
          .calendly-badge-widget,
          .calendly-fallback-badge {
            bottom: 20px !important;
            right: 20px !important;
            transform: scale(0.9) !important;
            font-size: 14px !important;
          }
        }
        
        @media (max-width: 480px) {
          .calendly-badge-widget,
          .calendly-fallback-badge {
            bottom: 15px !important;
            right: 15px !important;
            transform: scale(0.85) !important;
            font-size: 13px !important;
            max-width: 160px !important;
          }
        }

        /* Ensure Canvas elements don't interfere */
        canvas {
          pointer-events: none !important;
          z-index: 1 !important;
        }
        
        /* Force correct positioning */
        .calendly-badge-widget {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          top: auto !important;
          left: auto !important;
        }
        
        .calendly-badge-widget:hover {
          transform: scale(1.05) !important;
          transition: transform 0.2s ease !important;
        }

        /* Prevent any top positioning */
        .calendly-badge-widget {
          top: auto !important;
          transform-origin: bottom right !important;
        }
      `}</style>
    </>
  );
};

export default CalendlyBadge;