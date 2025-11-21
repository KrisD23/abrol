'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import GlassSurface from './GlassSurface';

// Blog data

  const blogPosts = [
    {
      id: 1,
      slug: "5-structuring-mistakes-family-businesses",
      title: "5 Structuring Mistakes to Avoid in Family Businesses",
      excerpt: "Discover the most common structural pitfalls that family businesses encounter and learn how to avoid costly mistakes that could impact generations.",
      date: "March 15, 2025",
      readTime: "6 min read",
      category: "Family Business",
      featured: true,
      image: "/img1.jpg"
    },
    {
      id: 2,
      slug: "ato-audit-red-flags-private-companies-2025",
      title: "ATO Audit Red Flags for Private Companies in 2025",
      excerpt: "Stay ahead of ATO scrutiny by understanding the key red flags and compliance areas that trigger audits for private companies this year.",
      date: "March 10, 2025",
      readTime: "7 min read",
      category: "Tax Compliance",
      image: "/img2.jpg"
    },
    {
      id: 3,
      slug: "plan-exit-without-breaking-business",
      title: "How to Plan an Exit Without Breaking the Business",
      excerpt: "Strategic exit planning for family business owners. Learn how to preserve value, minimize tax, and ensure smooth succession transitions.",
      date: "March 5, 2025",
      readTime: "8 min read",
      category: "Exit Planning",
      image: "/coin.jpg"
    },
    {
      id: 4,
      slug: "cgt-concessions-family-business-guide",
      title: "CGT Concessions Every Family Business Should Know",
      excerpt: "Unlock significant tax savings with comprehensive guide to Capital Gains Tax concessions available to family businesses and how to qualify.",
      date: "February 28, 2025",
      readTime: "5 min read",
      category: "Tax Planning",
      image: "/img4.jpg"
    },
    {
      id: 5,
      slug: "financial-planning-high-net-worth",
      title: "Financial Planning for High Net Worth Individuals",
      excerpt: "Comprehensive wealth management strategies including estate planning, tax minimization, and asset protection for affluent families.",
      date: "February 20, 2025",
      readTime: "8 min read",
      category: "Financial Planning",
      image: "/img1.jpg"
    },
    {
      id: 6,
      slug: "gst-bas-obligations-simplified",
      title: "GST and BAS Obligations Made Simple",
      excerpt: "Understanding your GST obligations, BAS reporting requirements, and how to maintain compliance while optimizing cash flow.",
      date: "February 15, 2025",
      readTime: "6 min read",
      category: "Tax Planning",
      image: "/img2.jpg"
    }
  ];

interface BlogCarouselProps {
  className?: string;
}

export default function BlogCarousel({ className = "" }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate carousel
  useEffect(() => {
    const startAutoRotate = () => {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
      }, 5000); // Change slide every 5 seconds
    };

    startAutoRotate();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
  };

  const prevSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + blogPosts.length) % blogPosts.length);
  };

  const goToSlide = (index: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Carousel Container */}
      <GlassSurface textColor="text-white" className="relative overflow-hidden">
        <div className="h-96 md:h-[500px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  nextSlide();
                } else if (swipe > swipeConfidenceThreshold) {
                  prevSlide();
                }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex w-full h-full">
                {/* Blog Content */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 backdrop-blur-xl bg-background/80 text-black text-sm rounded-full font-medium border border-border/30 shadow-lg ring-1 ring-inset ring-white/10">
                        {blogPosts[currentIndex].category}
                      </span>
                      {blogPosts[currentIndex].featured && (
                        <span className="ml-2 inline-block px-3 py-1 bg-yellow-500 text-black text-sm rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-black mb-4 leading-tight font-heading">
                      {blogPosts[currentIndex].title}
                    </h3>
                    
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      {blogPosts[currentIndex].excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center text-gray-400 text-sm">
                        <span>{blogPosts[currentIndex].date}</span>
                        <span className="mx-2">•</span>
                        <span>{blogPosts[currentIndex].readTime}</span>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/blog/${blogPosts[currentIndex].slug}`}
                      className="group inline-flex items-center px-4 py-2 md:px-6 md:py-3 backdrop-blur-xl bg-background/80 hover:bg-background/90 text-black rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:shadow-lg border border-border/30 ring-1 ring-inset ring-white/10"
                    >
                      Read More
                      <svg className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>

                {/* Blog Image */}
                <div className="hidden md:block flex-1 relative">
                  <div 
                    className="w-full h-full bg-cover bg-center rounded-r-2xl"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%), url(${blogPosts[currentIndex].image})`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 backdrop-blur-xl bg-background/60 hover:bg-background/80 text-black rounded-full transition-all duration-300 hover:scale-110 border border-border/30 shadow-lg ring-1 ring-inset ring-white/10"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 backdrop-blur-xl bg-background/60 hover:bg-background/80 text-black rounded-full transition-all duration-300 hover:scale-110 border border-border/30 shadow-lg ring-1 ring-inset ring-white/10"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators - Desktop: bottom-6, Mobile: bottom-2 to avoid overlap */}
        <div className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {blogPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'backdrop-blur-xl bg-background/80 scale-125 border border-border/30 shadow-lg ring-1 ring-inset ring-white/10'
                  : 'backdrop-blur-xl bg-background/50 hover:bg-background/70 border border-border/30 shadow-lg ring-1 ring-inset ring-white/10'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </GlassSurface>

      {/* Blog Grid Preview */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(0, 3).map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => goToSlide(blogPosts.indexOf(post))}
          >
            <GlassSurface textColor="text-white" className="overflow-hidden hover:bg-white/20 transition-all duration-300">
              <div 
                className="h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%), url(${post.image})`
                }}
              ></div>
              
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 bg-white/20 text-xs rounded font-medium">
                    {post.category}
                  </span>
                </div>
                
                <h4 className="font-semibold mb-2 group-hover:opacity-80 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h4>
                
                <p className="text-sm mb-4 line-clamp-2 opacity-80">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs opacity-60">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </GlassSurface>
          </motion.div>
        ))}
      </div>
    </div>
  );
}