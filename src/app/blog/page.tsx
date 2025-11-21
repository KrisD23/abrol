"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import GlassSurface from "@/components/GlassSurface";

export default function Blog() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const blogPosts = [
    {
      slug: "tax-optimization-strategies-2025",
      title: "Tax Optimization Strategies for 2025",
      excerpt:
        "Maximize your tax efficiency with proven strategies for individuals and businesses. Learn about deductions, credits, and planning opportunities.",
      date: "October 2, 2025",
      readTime: "5 min read",
      category: "Tax Planning",
      featured: true,
      image: "/tax23.png",
    },
    {
      slug: "ato-audit-red-flags-private-companies-2025",
      title: "ATO Audit Red Flags for Private Companies in 2025",
      excerpt:
        "Stay ahead of ATO scrutiny by understanding the key red flags and compliance areas that trigger audits for private companies this year.",
      date: "October 7, 2025",
      readTime: "7 min read",
      category: "Tax Compliance",
      featured: true,
      image: "/bg4.jpg",
    },
    {
      slug: "5-structuring-mistakes-family-businesses",
      title: "5 Structuring Mistakes to Avoid in Family Businesses",
      excerpt:
        "Discover the most common structural pitfalls that family businesses encounter and learn how to avoid costly mistakes that could impact generations.",
      date: "October 12, 2025",
      readTime: "6 min read",
      category: "Family Business",
      featured: true,
      image: "/fam.jpg",
    },
    {
      slug: "cgt-concessions-family-business",
      title: "CGT Concessions for Family Business",
      excerpt:
        "Unlock the power of capital gains tax concessions for your family business. Discover eligibility, strategies, and how to maximize your tax savings.",
      date: "October 15, 2025",
      readTime: "6 min read",
      category: "Business Structure",
      featured: true,
      image: "/coin.jpg",
    },
    {
      slug: "plan-exit-without-breaking-business",
      title: "How to Plan an Exit Without Breaking the Business",
      excerpt:
        "Strategic exit planning for family business owners. Learn how to preserve value and ensure smooth transitions.",
      date: "October 18, 2025",
      readTime: "8 min read",
      category: "Exit Planning",
      featured: true,
      image: "/img1.jpg",
    },
    {
      slug: "trust-structures-protecting-wealth",
      title: "Trust Structures: Protecting Your Wealth",
      excerpt:
        "Discover how family discretionary trusts and unit trusts can protect your assets while providing tax advantages and succession planning benefits.",
      date: "October 5, 2025",
      readTime: "7 min read",
      category: "Asset Protection",
      image: "/img2.jpg",
    },
    {
      slug: "business-structure-comparison",
      title: "Business Structure: Company vs Trust vs Partnership",
      excerpt:
        "Compare different business structures and their tax implications. Find the optimal setup for your business goals and risk profile.",
      date: "October 22, 2025",
      readTime: "6 min read",
      category: "Business Structure",
      image: "/coin.jpg",
    },
    {
      slug: "smsf-compliance-investment-strategies",
      title: "SMSF Compliance and Investment Strategies",
      excerpt:
        "Navigate SMSF regulations and discover investment strategies that maximize returns while maintaining compliance with ATO requirements.",
      date: "October 27, 2025",
      readTime: "4 min read",
      category: "Superannuation",
      image: "/img4.jpg",
    },
    // {
    //   slug: "financial-planning-high-net-worth",
    //   title: "Financial Planning for High Net Worth Individuals",
    //   excerpt:
    //     "Comprehensive wealth management strategies including estate planning, tax minimization, and asset protection for affluent families.",
    //   date: "February 20, 2025",
    //   readTime: "8 min read",
    //   category: "Financial Planning",
    //   image: "/img1.jpg",
    // },
    // {
    //   slug: "gst-bas-obligations-simplified",
    //   title: "GST and BAS Obligations Made Simple",
    //   excerpt:
    //     "Understanding your GST obligations, BAS reporting requirements, and how to maintain compliance while optimizing cash flow.",
    //   date: "February 15, 2025",
    //   readTime: "6 min read",
    //   category: "Tax Planning",
    //   image: "/img2.jpg",
    // },
  ];

  // Featured posts for the carousel
  const featuredPosts = blogPosts.filter((post) => post.featured);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featuredPosts.length]);

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />

      {/* Blog Hero Section - New Layout */}
      <div className="relative w-full bg-background text-black py-20 mt-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bebas-neue font-bold mb-4 text-center">
          Latest Insights
        </h1>
        <p className="text-lg md:text-xl text-black/50 max-w-2xl text-center mb-12">
          Stay informed with our latest financial insights, updates, and
          practical guidance
          <br />
          from our experienced accounting professionals.
        </p>
      </div>

      {/* Main Content - Featured Carousel and Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-0 relative z-10 mb-20">
        {/* Featured Blog Carousel */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-full flex justify-center">
            <GlassSurface
              textColor="text-white"
              className="relative w-full flex overflow-hidden shadow-xl min-h-[350px]"
            >
              {/* Left: Text */}
              <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
                <div className="flex gap-2 mb-4">
                  <span className="inline-block bg-primary/10 text-black px-4 py-1 rounded-full text-xs font-semibold">
                    {featuredPosts[carouselIndex].category}
                  </span>
                  <span className="inline-block bg-accent px-4 py-1 rounded-full text-xs font-semibold text-accent-foreground">
                    Featured
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bebas-neue mb-4">
                  {featuredPosts[carouselIndex].title}
                </h2>
                <p className="text-black/50 mb-6">
                  {featuredPosts[carouselIndex].excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-black/50 mb-6">
                  <span>{featuredPosts[carouselIndex].date}</span>
                  <span>•</span>
                  <span>{featuredPosts[carouselIndex].readTime}</span>
                </div>
                <Link
                  href={`/blog/${featuredPosts[carouselIndex].slug}`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-primary text-base w-fit"
                >
                  Read More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
              {/* Right: Image */}
              <div className="flex-1 relative min-h-[300px] hidden md:block">
                <Image
                  src={featuredPosts[carouselIndex].image}
                  alt={featuredPosts[carouselIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* Carousel Arrows */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full p-2 shadow-md z-10"
                onClick={() =>
                  setCarouselIndex(
                    (carouselIndex - 1 + featuredPosts.length) %
                      featuredPosts.length
                  )
                }
                aria-label="Previous"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full p-2 shadow-md z-10"
                onClick={() =>
                  setCarouselIndex((carouselIndex + 1) % featuredPosts.length)
                }
                aria-label="Next"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              {/* Carousel Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {featuredPosts.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      carouselIndex === idx ? "bg-primary" : "bg-muted"
                    }`}
                    onClick={() => setCarouselIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </GlassSurface>
          </div>
        </div>

        {/* Blog Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts
            .filter((post) => !post.featured)
            .map((post) => (
              <article
                key={post.slug}
                className="relative group cursor-pointer"
              >
                <GlassSurface
                  textColor="text-white"
                  className="overflow-hidden shadow-lg hover:bg-white/20 transition-all duration-300"
                >
                  <div className="h-48 relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-primary text-white rounded-full px-3 py-1 text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-sm opacity-70">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl tracking-wide  font-bebas-neue mb-3 group-hover:opacity-80 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mb-4 leading-relaxed opacity-80">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-70">{post.date}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className=" font-sans hover:opacity-80 transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </GlassSurface>
              </article>
            ))}
        </div>
      </div>
      {/* End main content wrapper */}

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
