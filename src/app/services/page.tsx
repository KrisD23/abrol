"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CalendlyModal from "../../components/CalendlyModal";
import { Globe } from "../../components/Globe";
import GlassSurface from "../../components/GlassSurface";
import Squares from "../../components/Squares";
import TiltedCard from "../../components/TiltedCard";
import { ExpandableServiceCards } from "../../components/ExpandableServiceCards";
import { AuroraBackground } from "../../components/ui/aurora-background";
import Link from "next/link";

// Service interface
interface Service {
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
}

// Three Pillars data
const threePillars = [
  {
    title: "Connected Compliance",
    description:
      "Tax returns, BAS lodgements, Xero reporting, and ASIC updates — but not just for the sake of it. We tie every return and statement back to your bigger goals.",
  },
  {
    title: "Strategic Structure",
    description:
      "We help you plan, restructure, and scale with purpose — using family trusts, companies, and SMSFs as the tools to build lasting legacies.",
  },
  {
    title: "Private Advisory",
    description:
      "Business mentoring, succession planning, intergenerational wealth transfer, board-level input — we're the sounding board you didn't know you needed.",
  },
];

// Carousel data - 3 sets with 4 cards each
const carouselSets = [
  {
    title: "Accounting & Compliance",
    services: [
      {
        title: "BAS & IAS Lodgements",
        shortDescription: "Quarterly and monthly business activity statements",
        fullDescription:
          "We handle all your BAS and IAS lodgements with precision and timing, ensuring compliance while optimizing your cash flow position. Our team stays up-to-date with ATO requirements and lodges on time, every time.",
        features: [
          "Quarterly BAS preparation",
          "Monthly IAS lodgements",
          "GST compliance",
          "Activity statement reviews",
          "ATO correspondence handling",
        ],
      },
      {
        title: "Financial Statement Preparation",
        shortDescription:
          "Professional financial statements for all entity types",
        fullDescription:
          "Comprehensive financial statement preparation that meets Australian Accounting Standards and regulatory requirements. We provide clear, accurate financial reporting that helps you understand your business position.",
        features: [
          "AASB compliant statements",
          "Management reporting",
          "Director declarations",
          "Note disclosures",
          "Comparative analysis",
        ],
      },
      {
        title: "Company, Trust & Partnership Tax Returns",
        shortDescription: "Tax return preparation for all business structures",
        fullDescription:
          "Expert tax return preparation across all entity types, ensuring maximum deductions and compliance. We identify tax-saving opportunities while maintaining full ATO compliance.",
        features: [
          "Company tax returns",
          "Trust distributions",
          "Partnership returns",
          "Individual schedules",
          "Tax planning advice",
        ],
      },
      {
        title: "Xero & Cloud Bookkeeping",
        shortDescription: "Modern cloud-based bookkeeping solutions",
        fullDescription:
          "Complete Xero setup and ongoing bookkeeping services that keep your financial records accurate and up-to-date. Real-time reporting and seamless integration with your business processes.",
        features: [
          "Xero implementation",
          "Daily transaction processing",
          "Bank reconciliations",
          "Payroll integration",
          "Real-time reporting",
        ],
      },
    ],
  },
  {
    title: "Tax Planning & Structuring",
    services: [
      {
        title: "Business Restructuring",
        shortDescription: "Strategic restructuring for tax efficiency",
        fullDescription:
          "Comprehensive business restructuring services that optimize your tax position while protecting assets. We analyze your current structure and recommend improvements for long-term success.",
        features: [
          "Structure analysis",
          "Rollover relief strategies",
          "Asset transfers",
          "Stamp duty optimization",
          "Implementation support",
        ],
      },
      {
        title: "Family Trusts & Investment Entities",
        shortDescription: "Trust structures for wealth management",
        fullDescription:
          "Establishment and management of family trusts and investment entities designed to protect wealth and provide tax-effective income distribution to family members.",
        features: [
          "Discretionary trusts",
          "Unit trusts",
          "Hybrid structures",
          "Distribution strategies",
          "Trust deed preparation",
        ],
      },
      {
        title: "Division 7A & UPE Management",
        shortDescription: "Managing private company arrangements",
        fullDescription:
          "Expert management of Division 7A compliance and unpaid present entitlements, ensuring your private company arrangements don't trigger unexpected tax consequences.",
        features: [
          "Div 7A compliance",
          "Loan agreements",
          "UPE strategies",
          "Distribution planning",
          "ATO liaison",
        ],
      },
      {
        title: "CGT Small Business Concessions",
        shortDescription: "Maximizing capital gains tax concessions",
        fullDescription:
          "Strategic planning to maximize your eligibility for CGT small business concessions, potentially saving hundreds of thousands in tax on business disposals.",
        features: [
          "15-year exemption",
          "50% active asset reduction",
          "Retirement exemption",
          "Rollover relief",
          "Eligibility optimization",
        ],
      },
    ],
  },
  {
    title: "Business Advisory",
    services: [
      {
        title: "Business Health Checks",
        shortDescription: "Comprehensive business performance analysis",
        fullDescription:
          "In-depth analysis of your business performance, identifying strengths, weaknesses, and opportunities for improvement. We provide actionable insights to drive growth.",
        features: [
          "Financial analysis",
          "KPI development",
          "Benchmarking",
          "Risk assessment",
          "Improvement roadmap",
        ],
      },
      {
        title: "Budgeting & Cash Flow Forecasting",
        shortDescription: "Financial planning and forecasting services",
        fullDescription:
          "Detailed budgeting and cash flow forecasting that helps you plan for the future and make informed business decisions. We create realistic projections based on your business model.",
        features: [
          "Budget preparation",
          "Cash flow modeling",
          "Scenario planning",
          "Variance analysis",
          "Regular reviews",
        ],
      },
      {
        title: "Growth Strategy & Scaling",
        shortDescription: "Strategic planning for business expansion",
        fullDescription:
          "Strategic advisory services focused on sustainable growth and scaling. We help you identify opportunities, plan expansion, and implement growth strategies.",
        features: [
          "Market analysis",
          "Growth planning",
          "Resource allocation",
          "Risk management",
          "Implementation support",
        ],
      },
      {
        title: "Succession Planning",
        shortDescription: "Planning for business continuity and exit",
        fullDescription:
          "Comprehensive succession planning services that ensure smooth business transitions, whether for family succession or third-party sales. We plan for optimal tax outcomes.",
        features: [
          "Exit planning",
          "Valuation services",
          "Tax optimization",
          "Family succession",
          "Transition strategies",
        ],
      },
    ],
  },
];

// Custom Card Component with mouse light effect
const ServiceCard = ({
  service,
  onClick,
}: {
  service: Service;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer overflow-hidden group"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <GlassSurface
        textColor="text-white"
        className="p-3 h-full min-h-[100px] relative"
        borderRadius={16}
        blur={16}
        backgroundOpacity={0.08}
        hoverable={false}
      >
        {/* Mouse light effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.3), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="font-semibold text-xl mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-sm opacity-80 leading-relaxed group-hover:opacity-100 transition-opacity duration-300 mt-auto">
            {service.shortDescription}
          </p>
        </div>
      </GlassSurface>
    </motion.div>
  );
};

// Enhanced 3D Service Card with Glass Surface
const Enhanced3DServiceCard = ({
  service,
  onClick,
}: {
  service: Service;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer overflow-hidden group h-[180px]"
      onClick={onClick}
      style={{ transformStyle: "preserve-3d" }}
    >
      <GlassSurface
        textColor="text-white"
        className="p-6 h-full relative overflow-hidden"
        borderRadius={20}
        blur={100}
        backgroundOpacity={85}
        hoverable={false}
      >
        {/* Advanced mouse light effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4), rgba(255,255,255,0.1) 40%, transparent 70%)`,
          }}
        />

        {/* Floating glass orb effect */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-xl"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            className="mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-blue-200 transition-colors duration-300">
              {service.title}
            </h3>
          </motion.div>

          <p className="text-sm opacity-85 leading-relaxed group-hover:opacity-100 transition-all duration-300 flex-grow">
            {service.shortDescription}
          </p>

          {/* Interactive bottom section */}
          {/* <motion.div 
            className="mt-4 pt-3 border-t border-white/20"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
          >
            <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
              Click to learn more →
            </span>
          </motion.div> */}
        </div>

        {/* Animated glass reflection */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Enhanced border glow */}
        {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" /> */}
      </GlassSurface>
    </motion.div>
  );
};

export default function ServicesPage() {
  const [currentCarouselSet, setCurrentCarouselSet] = useState(0);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentCarouselSet((prev) => (prev + 1) % carouselSets.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Force black text on DOM elements (similar to SVG stroke attribute)
  useEffect(() => {
    // Force ABN button text to stay black
    const abnButton = document.querySelector(".abn-button-text");
    if (abnButton) {
      const spans = abnButton.querySelectorAll("span, div");
      spans.forEach((span) => {
        (span as HTMLElement).style.setProperty(
          "color",
          "#000000",
          "important"
        );
        (span as HTMLElement).style.setProperty(
          "-webkit-text-fill-color",
          "#000000",
          "important"
        );
      });
    }

    // Force carousel active text to stay black
    const activeButtons = document.querySelectorAll(".carousel-active-text");
    activeButtons.forEach((button) => {
      (button as HTMLElement).style.setProperty(
        "color",
        "#000000",
        "important"
      );
      (button as HTMLElement).style.setProperty(
        "-webkit-text-fill-color",
        "#000000",
        "important"
      );
      const nested = button.querySelectorAll("span, div");
      nested.forEach((el) => {
        (el as HTMLElement).style.setProperty("color", "#000000", "important");
        (el as HTMLElement).style.setProperty(
          "-webkit-text-fill-color",
          "#000000",
          "important"
        );
      });
    });
  }, [currentCarouselSet]); // Re-run when carousel changes

  const handleServiceClick = (service: Service) => {
    setActiveService(service);
    setIsPaused(true);
  };

  const handleServiceClose = () => {
    setActiveService(null);
    setIsPaused(false);
  };

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />

      {/* Aurora Background */}
      <AuroraBackground className="fixed inset-0 w-full h-full z-0">
        <div></div>
      </AuroraBackground>

      {/* Hero Section: Globe on left, Services cards on right */}
      <section
        className="relative z-10 min-h-screen flex flex-col lg:flex-row justify-between items-center text-foreground px-2 lg:px-8"
        style={{ pointerEvents: "none" }}
      >
        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full h-full min-h-[400px]">
          {/* Left side: Globe with "OUR SERVICES" text */}
          <div
            className="flex flex-col justify-center items-center w-1/2 relative"
            style={{ pointerEvents: "auto" }}
          >
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
              {/* "OUR SERVICES" text at center of Globe */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase font-bebas-neue font-bold text-center" style={{ color: '#000000 !important', WebkitTextFillColor: '#000000' }}>
                  OUR SERVICES
                </h2>
              </div>
              {/* Globe */}
              <Globe className="!relative !inset-auto !top-0" />
            </div>
          </div>
          
          {/* Right side: Expandable Service Cards */}
          <div
            className="flex justify-center items-center w-1/2 pt-20"
            style={{ pointerEvents: "auto" }}
          >
            <div className="w-full max-w-lg">
              <ExpandableServiceCards onServiceClick={handleServiceClick} />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex lg:hidden flex-col w-full min-h-screen justify-center items-center space-y-6 py-8 overflow-x-hidden">
          {/* Globe with "OUR SERVICES" text - centered */}
          <div
            className="flex flex-col justify-center items-center relative"
            style={{ pointerEvents: "auto" }}
          >
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] flex items-center justify-center">
              {/* "OUR SERVICES" text at center of Globe */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <h2 className="text-xl sm:text-2xl md:text-3xl uppercase font-bebas-neue font-bold text-center px-2" style={{ color: '#000000 !important', WebkitTextFillColor: '#000000' }}>
                  OUR SERVICES
                </h2>
              </div>
              {/* Globe */}
              <Globe className="!relative !inset-auto !top-0" />
            </div>
          </div>
          
          {/* Expandable Service Cards - below globe */}
          <div
            className="flex justify-center items-center w-full px-2"
            style={{ pointerEvents: "auto" }}
          >
            <div className="w-full max-w-xs">
              <ExpandableServiceCards onServiceClick={handleServiceClick} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      {/* <section className="relative z-10 " style={{ pointerEvents: "none" }}>
        <div
          className="max-w-7xl mx-auto px-4 md:px-1 rounded-3xl"
          style={{ pointerEvents: "auto" }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-bebas-neue text-black">
              OUR SERVICES
            </h2>
          </motion.div> */}

          {/* Enhanced 3D Carousel Navigation */}
          {/* <div className="flex justify-center mb-12">
            <div className="flex space-x-4 p-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10">
              {carouselSets.map((set, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentCarouselSet(index)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium font-bebas-neue transition-all duration-300 ${
                    index === currentCarouselSet
                      ? "shadow-lg carousel-active-text"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={
                    {
                      transformStyle: "preserve-3d",
                      transform:
                        index === currentCarouselSet
                          ? "translateZ(10px)"
                          : "translateZ(0px)",
                      color:
                        index === currentCarouselSet
                          ? "#000000 !important"
                          : undefined,
                      backgroundColor:
                        index === currentCarouselSet
                          ? "#ffffff !important"
                          : undefined,
                      fontWeight:
                        index === currentCarouselSet ? "bold" : undefined,
                      WebkitTextFillColor:
                        index === currentCarouselSet ? "#000000" : undefined,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className={
                      index === currentCarouselSet ? "carousel-active-text" : ""
                    }
                    style={
                      {
                        color:
                          index === currentCarouselSet
                            ? "#000000 !important"
                            : undefined,
                        fontWeight:
                          index === currentCarouselSet
                            ? "bold !important"
                            : undefined,
                        WebkitTextFillColor:
                          index === currentCarouselSet ? "#000000" : undefined,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className={
                        index === currentCarouselSet
                          ? "carousel-active-text"
                          : ""
                      }
                      style={
                        {
                          color:
                            index === currentCarouselSet
                              ? "#000000 !important"
                              : undefined,
                          fontWeight:
                            index === currentCarouselSet
                              ? "bold !important"
                              : undefined,
                          WebkitTextFillColor:
                            index === currentCarouselSet
                              ? "#000000"
                              : undefined,
                        } as React.CSSProperties
                      }
                    >
                      {set.title}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div> */}

          {/* 3D Carousel */}
          {/* <div
            className="relative overflow-hidden pb-0 mb-0"
            style={{ perspective: "1200px", height: "250px" }}
          >
            <motion.div
              key={currentCarouselSet}
              initial={{ opacity: 0, rotateY: 90, z: -200 }}
              animate={{ opacity: 1, rotateY: 0, z: 0 }}
              exit={{ opacity: 0, rotateY: -90, z: -200 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute inset-0"
            >
              <motion.h3
                className="text-3xl font-semibold text-black text-center mb-8 font-sans"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {carouselSets[currentCarouselSet].title}
              </motion.h3> */}

              {/* 3D Services Grid */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {carouselSets[currentCarouselSet].services.map(
                  (service, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 50,
                        rotateX: 45,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                      }}
                      transition={{
                        delay: 0.4 + index * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 120,
                        damping: 15,
                      }}
                      whileHover={{
                        y: -10,
                        rotateY: 5,
                        rotateX: -5,
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Enhanced3DServiceCard
                        service={service}
                        onClick={() => handleServiceClick(service)}
                      />
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Three Pillars Section */}
      {/* <section
        className="relative z-10 pt-5 pb-0 mb-0"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="max-w-7xl mx-auto px-4 md:px-12 bg-transparent rounded-3xl"
          style={{ pointerEvents: "auto" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bebas-neue text-black mb-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Three Pillars
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {threePillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <TiltedCard
                  imageSrc={`/pillar${index + 1}.png`}
                  altText={pillar.title}
                  captionText={pillar.description}
                  containerHeight="300px"
                  containerWidth="300px"
                  imageHeight="300px"
                  imageWidth="300px"
                  rotateAmplitude={12}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <p className="tilted-card-demo-text">{pillar.title}</p>
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Schedule Consultation Section */}
      {/* <section
        className="relative z-10 py-20"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="max-w-4xl mx-auto px-4 md:px-12 text-center rounded-3xl"
          style={{ pointerEvents: "auto" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl  font-bebas-neue text-black mb-6">
              Ready to get started?
            </h2>
            <p className="text-black/50 mb-8 text-lg">
              Schedule a consultation to discuss how we can help scale your
              business.
            </p>
            <div className="flex justify-center">
              <Link href="/contact">
                <GlassSurface
                  // onClick={() => setIsCalendlyModalOpen(true)}
                  className="px-8 py-4 cursor-pointer flex items-center gap-3"
                  borderRadius={20}
                  blur={18}
                  backgroundOpacity={0.08}
                  hoverable={true}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-semibold text-lg ml-3 !text-white">
                    Schedule Consultation
                  </span>
                </GlassSurface>
              </Link>
            </div>
          </motion.div>
        </div>
      </section> */}

      <div className="relative z-10">
        <Footer />
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleServiceClose}
          >
            <motion.div
              className="bg-black rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {activeService.title}
                </h2>
                <button
                  onClick={handleServiceClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {activeService.fullDescription}
              </p>

              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Key Services:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeService.features.map(
                    (feature: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-300"
                      >
                        <span className="text-green-400 mr-3">•</span>
                        <span>{feature}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={isCalendlyModalOpen}
        onClose={() => setIsCalendlyModalOpen(false)}
        title="Schedule Your Financial Consultation"
      />
    </div>
  );
}
