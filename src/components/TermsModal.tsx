"use client";

import React from 'react';
import { FiX } from 'react-icons/fi';
import GlassSurface from './GlassSurface';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <GlassSurface
          className="relative p-8"
          borderRadius={16}
          blur={20}
          backgroundOpacity={0.1}
          hoverable={false}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>

          {/* Content */}
          <div className="max-h-[80vh] overflow-y-auto scrollbar-hide">
            <h2 className="text-3xl font-bold text-white mb-6">Terms of Service</h2>
            
            <div className="text-white/90 space-y-6 text-sm leading-relaxed font-dm-sans">
              <section>
                <h3 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using the services provided by Abrol Associates, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">2. Professional Services</h3>
                <p>
                  Abrol Associates provides accounting, tax, and financial advisory services. All services are provided in accordance with applicable professional standards and regulations.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">3. Client Responsibilities</h3>
                <p>
                  Clients are responsible for providing accurate and complete information necessary for the provision of services. Clients must inform us of any changes that may affect our services.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">4. Confidentiality</h3>
                <p>
                  We maintain strict confidentiality of all client information in accordance with professional ethical standards and applicable privacy laws.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">5. Limitation of Liability</h3>
                <p>
                  Our liability is limited to the fees paid for the specific service that gave rise to the claim. We are not liable for any indirect, consequential, or punitive damages.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">6. Professional Advice Disclaimer</h3>
                <p>
                  The information provided is general in nature and does not take into account your personal circumstances. Please seek professional advice before acting on any information provided.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">7. Governing Law</h3>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of Australia. Any disputes will be subject to the exclusive jurisdiction of Australian courts.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">8. Contact Information</h3>
                <p>
                  For questions about these terms, please contact us at info@abrolassociates.com.au
                </p>
              </section>
            </div>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
};

export default TermsModal;