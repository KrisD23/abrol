"use client";

import React from 'react';
import { FiX } from 'react-icons/fi';
import GlassSurface from './GlassSurface';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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
            <h2 className="text-3xl font-bold text-white mb-6">Privacy Policy</h2>
            
            <div className="text-white/90 space-y-6 text-sm leading-relaxed font-dm-sans">
              <section>
                <h3 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, such as when you create an account, request services, or contact us. This may include personal and financial information necessary to provide our services.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h3>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, process transactions, send communications, and comply with legal obligations.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h3>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">4. Data Security</h3>
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">5. Data Retention</h3>
                <p>
                  We retain your information for as long as necessary to provide services and comply with legal obligations. Client records are maintained in accordance with professional requirements.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">6. Your Rights</h3>
                <p>
                  You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">7. Cookies and Tracking</h3>
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our website and analyze usage patterns.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h3>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">9. Contact Us</h3>
                <p>
                  If you have any questions about this privacy policy, please contact us at privacy@abrolassociates.com.au
                </p>
              </section>
            </div>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
};

export default PrivacyModal;