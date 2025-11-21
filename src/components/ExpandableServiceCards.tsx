"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

// Define service types
interface Service {
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
}

interface ServiceCard {
  title: string;
  src: string;
  ctaText: string;
  services: Service[];
}

// Service data array - using existing carousel structure
const serviceCards: ServiceCard[] = [
  {
    title: "Accounting & Compliance",
    src: "/acc.jpg",
    ctaText: "Learn More",
    services: [
      {
        title: "BAS & IAS Lodgements",
        shortDescription: "Quarterly and monthly business activity statements",
        fullDescription: "We handle all your BAS and IAS lodgements with precision and timing, ensuring compliance while optimizing your cash flow position. Our team stays up-to-date with ATO requirements and lodges on time, every time.",
        features: ["Quarterly BAS preparation", "Monthly IAS lodgements", "GST compliance", "Activity statement reviews", "ATO correspondence handling"]
      },
      {
        title: "Financial Statement Preparation", 
        shortDescription: "Professional financial statements for all entity types",
        fullDescription: "Comprehensive financial statement preparation that meets Australian Accounting Standards and regulatory requirements. We provide clear, accurate financial reporting that helps you understand your business position.",
        features: ["AASB compliant statements", "Management reporting", "Director declarations", "Note disclosures", "Comparative analysis"]
      },
      {
        title: "Company, Trust & Partnership Tax Returns",
        shortDescription: "Tax return preparation for all business structures",
        fullDescription: "Expert tax return preparation across all entity types, ensuring maximum deductions and compliance. We identify tax-saving opportunities while maintaining full ATO compliance.",
        features: ["Company tax returns", "Trust distributions", "Partnership returns", "Individual schedules", "Tax planning advice"]
      },
      {
        title: "Xero & Cloud Bookkeeping",
        shortDescription: "Modern cloud-based bookkeeping solutions",
        fullDescription: "Complete Xero setup and ongoing bookkeeping services that keep your financial records accurate and up-to-date. Real-time reporting and seamless integration with your business processes.",
        features: ["Xero implementation", "Daily transaction processing", "Bank reconciliations", "Payroll integration", "Real-time reporting"]
      }
    ]
  },
  {
    title: "Tax Planning & Structuring", 
    src: "/taxplanning.jpg",
    ctaText: "Learn More",
    services: [
      {
        title: "Business Restructuring",
        shortDescription: "Strategic restructuring for tax efficiency",
        fullDescription: "Comprehensive business restructuring services that optimize your tax position while protecting assets. We analyze your current structure and recommend improvements for long-term success.",
        features: ["Structure analysis", "Rollover relief strategies", "Asset transfers", "Stamp duty optimization", "Implementation support"]
      },
      {
        title: "Family Trusts & Investment Entities",
        shortDescription: "Trust structures for wealth management",
        fullDescription: "Establishment and management of family trusts and investment entities designed to protect wealth and provide tax-effective income distribution to family members.",
        features: ["Discretionary trusts", "Unit trusts", "Hybrid structures", "Distribution strategies", "Trust deed preparation"]
      },
      {
        title: "Division 7A & UPE Management",
        shortDescription: "Managing private company arrangements",
        fullDescription: "Expert management of Division 7A compliance and unpaid present entitlements, ensuring your private company arrangements don't trigger unexpected tax consequences.",
        features: ["Div 7A compliance", "Loan agreements", "UPE strategies", "Distribution planning", "ATO liaison"]
      },
      {
        title: "CGT Small Business Concessions",
        shortDescription: "Maximizing capital gains tax concessions",
        fullDescription: "Strategic planning to maximize your eligibility for CGT small business concessions, potentially saving hundreds of thousands in tax on business disposals.",
        features: ["15-year exemption", "50% active asset reduction", "Retirement exemption", "Rollover relief", "Eligibility optimization"]
      }
    ]
  },
  {
    title: "Business Advisory",
    src: "/advisory.jpg",
    ctaText: "Learn More",
    services: [
      {
        title: "Business Health Checks",
        shortDescription: "Comprehensive business performance analysis",
        fullDescription: "In-depth analysis of your business performance, identifying strengths, weaknesses, and opportunities for improvement. We provide actionable insights to drive growth.",
        features: ["Financial analysis", "KPI development", "Benchmarking", "Risk assessment", "Improvement roadmap"]
      },
      {
        title: "Budgeting & Cash Flow Forecasting",
        shortDescription: "Financial planning and forecasting services",
        fullDescription: "Detailed budgeting and cash flow forecasting that helps you plan for the future and make informed business decisions. We create realistic projections based on your business model.",
        features: ["Budget preparation", "Cash flow modeling", "Scenario planning", "Variance analysis", "Regular reviews"]
      },
      {
        title: "Growth Strategy & Scaling",
        shortDescription: "Strategic planning for business expansion",
        fullDescription: "Strategic advisory services focused on sustainable growth and scaling. We help you identify opportunities, plan expansion, and implement growth strategies.",
        features: ["Market analysis", "Growth planning", "Resource allocation", "Risk management", "Implementation support"]
      },
      {
        title: "Succession Planning",
        shortDescription: "Planning for business continuity and exit",
        fullDescription: "Comprehensive succession planning services that ensure smooth business transitions, whether for family succession or third-party sales. We plan for optimal tax outcomes.",
        features: ["Exit planning", "Valuation services", "Tax optimization", "Family succession", "Transition strategies"]
      }
    ]
  }
];

interface ExpandableServiceCardsProps {
  onServiceClick?: (service: Service) => void;
}

export function ExpandableServiceCards({ onServiceClick }: ExpandableServiceCardsProps = {}) {
  const [active, setActive] = useState<ServiceCard | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  // Type guard to check if active is a ServiceCard
  const isServiceCard = (value: ServiceCard | boolean | null): value is ServiceCard => {
    return value !== null && typeof value === "object" && "services" in value;
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (isServiceCard(active)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {isServiceCard(active) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isServiceCard(active) ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-sm md:max-w-4xl h-fit max-h-[85vh] md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden mx-4"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-40 md:h-80 lg:h-80 rounded-tr-2xl rounded-tl-2xl md:rounded-tr-3xl md:rounded-tl-3xl object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="flex-1">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 text-xl mb-2"
                    >
                      {active.title}
                    </motion.h3>
                  </div>
                </div>
                <div className="pt-4 relative px-4 pb-10">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-sm md:text-base space-y-6 max-h-96 overflow-auto"
                  >
                    <div className="space-y-4">
                      {active.services?.map((service: Service, idx: number) => (
                        <div key={idx} className="space-y-3">
                          <button
                            onClick={() => onServiceClick?.(service)}
                            className="text-lg font-semibold text-black hover:underline text-left transition-all duration-200"
                          >
                            {service.title} : {service.shortDescription}
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="w-full gap-4 space-y-3 expandable-service-card">
        {serviceCards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="px-2 py-2 md:p-4 flex flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg cursor-pointer border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
          >
            <div className="flex gap-2 md:gap-4 flex-row items-center flex-1 min-w-0 overflow-hidden">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-8 w-8 md:h-14 md:w-14 rounded object-cover object-top flex-shrink-0"
                />
              </motion.div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-left text-xs md:text-lg truncate"
                >
                  {card.title}
                </motion.h3>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-bold bg-white hover:bg-black hover:text-white transition-colors flex-shrink-0"
              style={{ color: '#000000' }}
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};