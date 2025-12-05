// "use client";

// import React, { useState, useEffect } from "react";
// import GlassSurface from "./GlassSurface";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const SimpleTestimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [cardsPerView, setCardsPerView] = useState(3);

//   const testimonials = [
//     {
//       id: 1,
//       text: "Abrol Associates transformed our financial structure. Their expertise saved us thousands in taxes.",
//       author: "Sarah M.",
//       company: "Tech Startup",
//     },
//     {
//       id: 2,
//       text: "Professional, reliable, and always available when we need them. Highly recommended.",
//       author: "David L.",
//       company: "Manufacturing",
//     },
//     {
//       id: 3,
//       text: "Their asset protection strategies gave us peace of mind for our family business.",
//       author: "Jennifer K.",
//       company: "Family Business",
//     },
//     {
//       id: 4,
//       text: "Outstanding service and attention to detail. They made complex tax matters simple.",
//       author: "Michael R.",
//       company: "Retail Chain",
//     },
//     {
//       id: 5,
//       text: "Their wealth planning expertise helped secure our family's future. Exceptional work.",
//       author: "Amanda S.",
//       company: "Investment Group",
//     },
//     {
//       id: 6,
//       text: "Reliable, knowledgeable, and always one step ahead. Can't recommend them enough.",
//       author: "Robert T.",
//       company: "Construction",
//     },
//     {
//       id: 7,
//       text: "They simplified our business structure and improved our tax efficiency significantly.",
//       author: "Lisa W.",
//       company: "Consulting Firm",
//     },
//     {
//       id: 8,
//       text: "Professional guidance that delivered real results. Our go-to financial advisors.",
//       author: "James H.",
//       company: "Healthcare",
//     },
//     {
//       id: 9,
//       text: "Their proactive approach saved us from costly mistakes. Truly grateful.",
//       author: "Emily C.",
//       company: "E-commerce",
//     },
//     {
//       id: 10,
//       text: "Expert advice delivered with genuine care. They understand our business needs.",
//       author: "Thomas A.",
//       company: "Hospitality",
//     },
//     {
//       id: 11,
//       text: "Seamless service and excellent communication. They make finance management easy.",
//       author: "Rachel B.",
//       company: "Digital Agency",
//     },
//     {
//       id: 12,
//       text: "Their strategic planning helped us navigate complex financial challenges successfully.",
//       author: "Daniel P.",
//       company: "Property Development",
//     },
//   ];

//   // Handle responsive cards per view
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       if (width >= 1024) {
//         setCardsPerView(3); // Desktop: 3 cards
//       } else if (width >= 768) {
//         setCardsPerView(2); // Tablet: 2 cards
//       } else {
//         setCardsPerView(1); // Mobile: 1 card
//       }
//     };

//     handleResize(); // Set initial value
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Reset currentIndex when cardsPerView changes
//   useEffect(() => {
//     const maxIndex = Math.max(0, testimonials.length - cardsPerView);
//     if (currentIndex > maxIndex) {
//       setCurrentIndex(0);
//     }
//   }, [cardsPerView, currentIndex, testimonials.length]);

//   const maxIndex = Math.max(0, testimonials.length - cardsPerView);

//   const nextSlide = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//     setTimeout(() => setIsAnimating(false), 500);
//   };

//   const prevSlide = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//     setTimeout(() => setIsAnimating(false), 500);
//   };

//   // Auto-play functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isAnimating) {
//         setIsAnimating(true);
//         setCurrentIndex((prev) => {
//           const maxIdx = Math.max(0, testimonials.length - cardsPerView);
//           return prev >= maxIdx ? 0 : prev + 1;
//         });
//         setTimeout(() => setIsAnimating(false), 500);
//       }
//     }, 5000); // Auto advance every 5 seconds

//     return () => clearInterval(interval);
//   }, [isAnimating, cardsPerView, testimonials.length]);

//   return (
//     <div className="bg-black text-white pb-5 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             What Our Clients Say
//           </h2>
//         </div> */}

//         <div className="relative">
//           {/* Left Arrow */}
//           <button
//             onClick={prevSlide}
//             disabled={isAnimating}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-6"
//           >
//             <GlassSurface
//               className="p-3 hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
//               borderRadius={50}
//               blur={16}
//               backgroundOpacity={0.08}
//               hoverable={true}
//             >
//               <ChevronLeft className="w-6 h-6 text-white" />
//             </GlassSurface>
//           </button>

//           {/* Right Arrow */}
//           <button
//             onClick={nextSlide}
//             disabled={isAnimating}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-6"
//           >
//             <GlassSurface
//               className="p-3 hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
//               borderRadius={50}
//               blur={16}
//               backgroundOpacity={0.08}
//               hoverable={true}
//             >
//               <ChevronRight className="w-6 h-6 text-white" />
//             </GlassSurface>
//           </button>

//           {/* Testimonials Container */}
//           <div className="overflow-hidden mx-8">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(-${
//                   currentIndex * (100 / cardsPerView)
//                 }%)`,
//                 gap: "1.5rem",
//               }}
//             >
//               {testimonials.map((testimonial, index) => (
//                 <div
//                   key={testimonial.id}
//                   className="flex-shrink-0"
//                   style={{
//                     width: `calc((100% - ${
//                       (cardsPerView - 1) * 1.5
//                     }rem) / ${cardsPerView})`,
//                     minWidth: `calc((100% - ${
//                       (cardsPerView - 1) * 1.5
//                     }rem) / ${cardsPerView})`,
//                   }}
//                 >
//                   <GlassSurface
//                     className="p-6 h-full min-h-[200px] flex flex-col justify-between"
//                     borderRadius={12}
//                     blur={16}
//                     backgroundOpacity={0.05}
//                     hoverable={false}
//                   >
//                     <div className="flex flex-col h-full">
//                       <div className="flex-grow mb-4">
//                         <p className="text-white/90  leading-relaxed font-sans">
//                           &ldquo;{testimonial.text}&rdquo;
//                         </p>
//                       </div>
//                       <div className="mt-auto">
//                         <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4"></div>
//                         <div className="text-center">
//                           <p className="text-white font-medium text-sm font-dm-sans mb-1">
//                             {testimonial.author}
//                           </p>
//                           {/* <p className="text-white/60 text-xs font-dm-sans">
//                             {testimonial.company}
//                           </p> */}
//                         </div>
//                       </div>
//                     </div>
//                   </GlassSurface>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Dots Indicator */}
//           <div className="flex justify-center mt-8 space-x-2">
//             {Array.from({ length: maxIndex + 1 }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   if (!isAnimating) {
//                     setIsAnimating(true);
//                     setCurrentIndex(index);
//                     setTimeout(() => setIsAnimating(false), 500);
//                   }
//                 }}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                   index === currentIndex
//                     ? "bg-white w-8"
//                     : "bg-white/30 hover:bg-white/50"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimpleTestimonials;
"use client";

import React, { useState, useEffect } from "react";
import GlassSurface from "./GlassSurface";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "@/components/TestimonialCard";

const SimpleTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [enableTransition, setEnableTransition] = useState(true);
  const [animate, setAnimate] = useState(true);
  const testimonials = [
    {
      id: 1,
      text: "Abrol Associates transformed our financial structure. Their expertise saved us thousands in taxes.",
      author: "Sarah M.",
      company: "Tech Startup",
      avatar: "/sampleTestimonials/sarah-j.jpg",
    },
    {
      id: 2,
      text: "Professional, reliable, and always available when we need them. Highly recommended.",
      author: "David L.",
      company: "Manufacturing",
      avatar: "/sampleTestimonials/david-l.jpg",
    },
    {
      id: 3,
      text: "Their asset protection strategies gave us peace of mind for our family business.",
      author: "Jennifer K.",
      company: "Family Business",
      avatar: "/sampleTestimonials/sarah-j.jpg",
    },
    {
      id: 4,
      text: "Outstanding service and attention to detail. They made complex tax matters simple.",
      author: "Michael R.",
      company: "Retail Chain",
      avatar: "/sampleTestimonials/david-l.jpg",
    },
    {
      id: 5,
      text: "Their wealth planning expertise helped secure our family's future. Exceptional work.",
      author: "Amanda S.",
      company: "Investment Group",
      avatar: "/sampleTestimonials/sarah-j.jpg",
    },
    {
      id: 6,
      text: "Reliable, knowledgeable, and always one step ahead. Can't recommend them enough.",
      author: "Robert T.",
      company: "Construction",
      avatar: "/sampleTestimonials/david-l.jpg",
    },
    {
      id: 7,
      text: "They simplified our business structure and improved our tax efficiency significantly, which has enabled us to focus on growth.",
      author: "Lisa W.",
      company: "Consulting Firm",
      avatar: "/sampleTestimonials/sarah-j.jpg",
    },
    {
      id: 8,
      text: "Professional guidance that delivered real results. Our go-to financial advisors.",
      author: "James H.",
      company: "Healthcare",
      avatar: "/sampleTestimonials/david-l.jpg",
    },
    {
      id: 9,
      text: "Their proactive approach saved us from costly mistakes. Truly grateful.",
      author: "Emily C.",
      company: "E-commerce",
      avatar: "/sampleTestimonials/david-l.jpg",
    },
    {
      id: 10,
      text: "Expert advice delivered with genuine care. They understand our business needs.",
      author: "Thomas A.",
      company: "Hospitality",
      avatar: "/sampleTestimonials/david-l.jpg",
    },
    {
      id: 11,
      text: "Seamless service and excellent communication. They make finance management easy.",
      author: "Rachel B.",
      company: "Digital Agency",
      avatar: "/sampleTestimonials/sarah-j.jpg",
    },
    {
      id: 12,
      text: "Their strategic planning helped us navigate complex financial challenges successfully.",
      author: "Daniel P.",
      company: "Property Development",
      avatar: "/sampleTestimonials/david-l.jpg",
    },
  ];

  // Handle responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCardsPerView(3);
      } else if (width >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };
const nextSlide = () => {
  if (isAnimating) return;
  setIsAnimating(true);

  if (currentIndex === maxIndex) {
    // Step 1: disable animation so it jumps instantly
    setAnimate(false);
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    // Step 2: re-enable animation after jump
    setTimeout(() => {
      setAnimate(true);
      setIsAnimating(false);
    }, 50);

  } else {
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  }
};



    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset index when cardsPerView changes
  useEffect(() => {
    const maxIndex = Math.ceil(testimonials.length / cardsPerView) - 1;
    if (currentIndex > maxIndex) setCurrentIndex(0);
  }, [cardsPerView, currentIndex, testimonials.length]);

  const maxIndex = Math.ceil(testimonials.length / cardsPerView) - 1;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => {
  const next = prev + 1;
  return next > maxIndex ? 0 : next;
});
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentIndex((prev) => {
          const maxIdx = Math.max(0, testimonials.length - cardsPerView);
          return prev + 1 > maxIndex ? 0 : prev + 1;
        });
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating, cardsPerView, testimonials.length]);

  return (
    <div className="bg-black text-white pb-5 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative px-5 sm:px-16 lg:px-7">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-6"
          >
            <GlassSurface
              className="p-3 transition-all duration-300 disabled:opacity-50"
              borderRadius={50}
              blur={16}
              backgroundOpacity={0.08}
            >
              <ChevronLeft className="w-6 h-6 text-[var(--secondary-brand)]" />
            </GlassSurface>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-6"
          >
            <GlassSurface
              className="p-3 transition-all duration-300 disabled:opacity-50"
              borderRadius={50}
              blur={16}
              backgroundOpacity={0.08}
            >
              <ChevronRight className="w-6 h-6 text-[var(--secondary-brand)]" />
            </GlassSurface>
          </button>

          {/* Testimonials Row */}
          <div className="overflow-hidden mx-8">
            <div
              className={`flex ${animate ? "transition-transform duration-500 ease-in-out" : ""}`}
              style={{
                transform: `translateX(calc(-${currentIndex} * 100%))`,
              }}
            >
              {testimonials.map((testimonial) => {
                return (
                  <div
                    key={testimonial.id}
                    className="flex-shrink-0"
                    style={{
                      flex: `0 0 calc(100% / ${cardsPerView})`,
                      padding: "0 0.75rem",
                      boxSizing: "border-box",
                    }}
                  >
                    <TestimonialCard
                      author={testimonial.author}
                      company={testimonial.company}
                      text={testimonial.text}
                      avatar={testimonial.avatar}
                      rating={4.8}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTestimonials;
