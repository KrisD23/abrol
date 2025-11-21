"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import GlassSurface from "@/components/GlassSurface";
import { Calendar, Clock, Tag, TrendingUp, RefreshCw } from "lucide-react";
import { NewsArticle, NewsApiResponse } from "@/types/news";

export default function NewsPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [fromCache, setFromCache] = useState(false);

  const closeContactModal = () => setIsContactModalOpen(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/news");
      const data: NewsApiResponse = await response.json();

      if (data.success) {
        setNewsArticles(data.data);
        setLastFetched(data.lastFetched ? new Date(data.lastFetched) : null);
        setFromCache(data.fromCache);
      } else {
        setError(data.message || "Failed to fetch news");
      }
    } catch (err) {
      setError("Failed to load news articles");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Get unique categories from articles
  const categories = [
    "All",
    ...Array.from(new Set(newsArticles.map((article) => article.category))),
  ];

  const filteredArticles =
    selectedCategory === "All"
      ? newsArticles
      : newsArticles.filter((article) => article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative min-h-screen text-foreground overflow-hidden bg-background">
        {/* Background Image */}
        {/* <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bg10.jpg')`,
          }}
        /> */}

        {/* Overlay */}
        <div className="absolute inset-0 bg-background/60"></div>

        {/* Content */}
        <div className="relative z-10 pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-12">
            {/* Header Section */}
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-wide font-bebas-neue text-black mb-8">
                LATEST NEWS
              </h1>
              <p className="text-xl text-white  max-w-3xl mx-auto leading-relaxed">
                Stay informed with the latest updates in tax law, business
                regulations, and financial insights that matter to your
                business.
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <GlassSurface
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 cursor-pointer font-medium font-sans ${
                      selectedCategory === category
                        ? "ring-2 ring-white/30"
                        : ""
                    }`}
                    borderRadius={25}
                    blur={18}
                    backgroundOpacity={
                      selectedCategory === category ? 0.12 : 0.06
                    }
                    hoverable={true}
                  >
                    <span
                      className="!text-white font-sans"
                      // style={{ fontFamily: "sans-serif" }}
                    >
                      {category}
                    </span>
                  </GlassSurface>
                ))}
              </div>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <motion.div
                className="mb-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <RefreshCw className="animate-spin" size={24} />
                  <span className="text-white text-lg">
                    Loading latest news...
                  </span>
                </div>
              </motion.div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                className="mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-destructive/10 border border-destructive rounded-2xl p-6">
                  <p className="text-destructive text-lg">{error}</p>
                  <button
                    onClick={fetchNews}
                    className="mt-4 px-6 py-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/80 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}

            {/* Cache Status */}
            {lastFetched && !loading && (
              <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white/70 text-sm">
                  {fromCache
                    ? "Showing news of past hour"
                    : "Fresh news loaded"}{" "}
                  • Last updated: {lastFetched.toLocaleString()}
                </p>
              </motion.div>
            )}

            {/* Featured Article */}
            {selectedCategory === "All" &&
              filteredArticles.length > 0 &&
              !loading && (
                <motion.div
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="bg-card rounded-3xl overflow-hidden shadow-2xl border">
                    <div className="grid lg:grid-cols-5 lg:min-h-[380px]">
                      <div className="relative lg:col-span-2 h-64 lg:h-full">
                        <Image
                          src={filteredArticles[0].urlToImage || "/bg10.jpg"}
                          alt={filteredArticles[0].title}
                          fill
                          className="object-cover w-full h-full"
                          style={{ objectFit: "cover" }}
                          priority
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                            FEATURED
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden" />
                      </div>
                      <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>
                              {formatDate(filteredArticles[0].publishedAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{filteredArticles[0].readTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Tag size={16} />
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                              {filteredArticles[0].category}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bebas-neue text-foreground mb-4 leading-tight line-clamp-3">
                          {filteredArticles[0].title}
                        </h3>
                        <p className="text-muted-foreground text-base lg:text-lg mb-6 leading-relaxed line-clamp-3">
                          {filteredArticles[0].description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {filteredArticles[0].tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm hover:bg-muted/80 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={filteredArticles[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
                        >
                          <span>Read Full Article</span>
                          <TrendingUp
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            {/* News Grid */}
            {!loading && filteredArticles.length > 0 && (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {filteredArticles
                  .slice(selectedCategory === "All" ? 1 : 0)
                  .map((article, index) => (
                    <motion.div
                      key={article._id || index}
                      className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="relative h-48">
                        <Image
                          src={article.urlToImage || "/bg10.jpg"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3 text-muted-foreground text-sm">
                          <div className="flex items-center gap-1 font-sans">
                            <Calendar size={14} />
                            {formatDate(article.publishedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {article.readTime}
                          </div>
                        </div>

                        <h3 className="text-xl  font-sans font-bold text-foreground mb-3 leading-tight line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                          {article.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
                        >
                          Read More
                          <TrendingUp size={14} />
                        </a>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            )}

            {/* No Articles State */}
            {!loading && filteredArticles.length === 0 && !error && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white/70 text-lg">
                  No articles found for the selected category.
                </p>
              </motion.div>
            )}

            {/* Call to Action */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-primary rounded-3xl p-12 shadow-2xl">
                <h2 className="text-3xl  font-bebas-neue text-primary-foreground mb-4">
                  Need Expert Financial Advice?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Stay ahead of regulatory changes and market developments with
                  personalized guidance from our experienced team.
                </p>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full font-sans text-lg border-b-2  bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:from-accent hover:to-primary hover:scale-105 transition-all duration-300 inline-block focus:outline-none focus:ring-4 focus:ring-accent/40"
                >
                  Get Professional Advice
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
}
