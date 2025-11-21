// components/CalendlyModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalendlyInline from './CalendlyInline';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({
  isOpen,
  onClose,
  title = "Schedule a Consultation"
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="calendly-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(245, 239, 230, 0.6)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <motion.div
            className="calendly-modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(245, 239, 230, 0.9)',
              border: '1px solid rgba(242, 234, 211, 0.3)',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(242, 234, 211, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(245, 239, 230, 0.4)'
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#000000'
                }}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                style={{
                  backdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(245, 239, 230, 0.3)',
                  border: '1px solid rgba(242, 234, 211, 0.3)',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#000000',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 239, 230, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 239, 230, 0.3)';
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body - Calendly Widget */}
            <div style={{ padding: '0' }}>
              <CalendlyInline 
                height="600px"
                className="modal-calendly"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Additional responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .calendly-modal-content {
            margin: 10px !important;
            max-height: 95vh !important;
          }
          
          .modal-calendly {
            height: 550px !important;
          }
        }
        
        @media (max-width: 480px) {
          .calendly-modal-backdrop {
            padding: 10px !important;
          }
          
          .calendly-modal-content {
            margin: 0 !important;
            border-radius: 8px !important;
          }
          
          .modal-calendly {
            height: 500px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default CalendlyModal;