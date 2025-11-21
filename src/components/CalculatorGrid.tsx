'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  PiggyBank, 
  Calculator, 
  Calendar, 
  FileText, 
  Scale, 
  BarChart3, 
  CreditCard, 
  Clock, 
  Building2 
} from 'lucide-react';

// Calculator data with Lucide React icons
const calculatorData = [
  {
    id: 1,
    title: "Achieve My Savings Target",
    description: "Calculate how much you need to save monthly to reach your financial goals within a specific timeframe.",
    category: "Savings",
    icon: PiggyBank
  },
  {
    id: 2,
    title: "Basic Loan Payments",
    description: "Determine your monthly loan payments based on principal amount, interest rate, and loan term.",
    category: "Loans",
    icon: Calculator
  },
  {
    id: 3,
    title: "Bi-Monthly Calculator",
    description: "Calculate payments and interest savings when making bi-monthly payments instead of monthly.",
    category: "Payments",
    icon: Calendar
  },
  {
    id: 4,
    title: "Budget Calculator",
    description: "Plan and track your income, expenses, and savings to maintain a healthy financial balance.",
    category: "Budgeting",
    icon: FileText
  },
  {
    id: 5,
    title: "Comparison Rate Calculator",
    description: "Compare different loan offers by calculating the true cost including fees and charges.",
    category: "Comparison",
    icon: Scale
  },
  {
    id: 6,
    title: "Complete Loan Comparison",
    description: "Comprehensive tool to compare multiple loan options side by side with detailed breakdowns.",
    category: "Analysis",
    icon: BarChart3
  },
  {
    id: 7,
    title: "Extra Repayments Calculator",
    description: "See how additional payments can reduce your loan term and save on interest costs.",
    category: "Optimization",
    icon: CreditCard
  },
  {
    id: 8,
    title: "How Long to Repay?",
    description: "Calculate the time needed to repay your debt based on payment amounts and interest rates.",
    category: "Timeline",
    icon: Clock
  },
  {
    id: 9,
    title: "How Much Can I Borrow?",
    description: "Determine your borrowing capacity based on income, expenses, and lending criteria.",
    category: "Capacity",
    icon: Building2
  }
];

interface CalculatorGridProps {
  className?: string;
}

export default function CalculatorGrid({ className = "" }: CalculatorGridProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {calculatorData.map((calculator) => (
          <motion.div
            key={calculator.id}
            variants={cardVariants}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredCard(calculator.id)}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <div className="bg-[#181818] border border-gray-800 rounded-2xl p-6 h-full transition-all duration-300 hover:border-gray-600 group-hover:shadow-2xl group-hover:shadow-black/50">
              
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full font-medium border border-gray-700">
                  {calculator.category}
                </span>
              </div>

              {/* Icon and Title */}
              <div className="mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl mb-2 group-hover:bg-white/20 transition-colors duration-300">
                    <calculator.icon size={24} className="text-white" />
                  </div>
                </div>
                <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-gray-100 transition-colors duration-300">
                  {calculator.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                {calculator.description}
              </p>

              {/* Action Button */}
              <div className="mt-auto">
                <motion.button 
                  className="w-full py-3 px-4 bg-white/5 border border-gray-700 rounded-xl text-white text-sm font-medium hover:bg-white/10 hover:border-gray-600 transition-all duration-300 group-hover:transform group-hover:scale-105"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    Calculate Now
                    <motion.svg 
                      className="ml-2 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: hoveredCard === calculator.id ? 3 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </span>
                </motion.button>
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === calculator.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-16 text-center"
      >
        <div className="bg-[#181818] border border-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-white text-xl font-semibold mb-4">Need Help Choosing?</h3>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            Our legal calculators are designed to help you make informed decisions about your financial and legal matters. 
            Each tool provides accurate estimates based on current rates and legal frameworks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/?section=contact"
              className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300 text-center"
            >
              Contact for Guidance
            </Link>
            <Link 
              href="/services"
              className="px-6 py-3 border border-gray-600 text-white rounded-xl font-medium hover:border-gray-500 hover:bg-white/5 transition-all duration-300 text-center"
            >
              View All Services
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}