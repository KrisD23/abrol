import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { NewsArticleModel, NewsMetadataModel } from "@/models/News";
import {
  NewsApiResponse,
  ExternalNewsResponse,
  NewsCategory,
} from "@/types/news";
import axios from "axios";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/everything";

// Categories mapping for better categorization (Australian focused)
const categoryKeywords = {
  [NewsCategory.TAX_UPDATES]: [
    "tax",
    "taxes",
    "taxation",
    "ato",
    "gst",
    "income tax",
    "capital gains",
    "franking credits",
    "superannuation",
    "abn",
    "tfn",
  ],
  [NewsCategory.REGULATORY]: [
    "asic",
    "regulation",
    "compliance",
    "law",
    "legal",
    "policy",
    "australian securities",
    "corporations act",
    "audit",
    "apra",
  ],
  [NewsCategory.INDUSTRY_NEWS]: [
    "business",
    "industry",
    "market",
    "economic",
    "economy",
    "australian business",
    "sme",
    "small business",
    "startup",
  ],
  [NewsCategory.FINANCE]: [
    "finance",
    "financial",
    "investment",
    "banking",
    "accounting",
    "bookkeeping",
    "payroll",
    "cash flow",
    "financial planning",
  ],
};

function categorizeNews(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return category;
    }
  }

  return NewsCategory.BUSINESS;
}

function generateTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const allTags: string[] = [];

  // Updated tag patterns based on Australian business focus and user requirements
  const tagPatterns = [
    // Core user requirement tags
    { pattern: /\baccounting\b/g, tag: "Accounting" },
    { pattern: /\btax(es)?\b/g, tag: "Taxes" },
    { pattern: /\bbusiness\b/g, tag: "Business" },
    { pattern: /\bfinancial\b/g, tag: "Financial" },

    // Australian specific terms
    {
      pattern: /\b(ato|taxation office|australian taxation office)\b/g,
      tag: "ATO",
    },
    { pattern: /\bgst\b/g, tag: "GST" },
    { pattern: /\basic\b/g, tag: "ASIC" },
    { pattern: /\babn\b/g, tag: "ABN" },

    // Business types
    { pattern: /\bsmall business\b/g, tag: "Small Business" },
    { pattern: /\bfamily business\b/g, tag: "Family Business" },
    { pattern: /\bcorporate\b/g, tag: "Corporate" },

    // Financial services
    { pattern: /\bcompliance\b/g, tag: "Compliance" },
    { pattern: /\baudit\b/g, tag: "Audit" },
    { pattern: /\bbookkeeping\b/g, tag: "Bookkeeping" },
    { pattern: /\bpayroll\b/g, tag: "Payroll" },
    { pattern: /\bsuper(annuation)?\b/g, tag: "Superannuation" },

    // Investment and finance
    { pattern: /\binvestment\b/g, tag: "Investment" },
    { pattern: /\bbanking\b/g, tag: "Banking" },
    { pattern: /\binsurance\b/g, tag: "Insurance" },
  ];

  tagPatterns.forEach(({ pattern, tag }) => {
    if (pattern.test(text)) {
      allTags.push(tag);
    }
  });

  return allTags.slice(0, 5); // Limit to 5 tags
}

function estimateReadTime(content?: string): string {
  if (!content) return "3 min read";

  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return `${minutes} min read`;
}

async function fetchNewsFromAPI(): Promise<ExternalNewsResponse> {
  if (!NEWS_API_KEY) {
    throw new Error("NEWS_API_KEY environment variable is not set");
  }

  // Strictly fetch Australian news using domains parameter
  const query = "(accounting OR taxes OR business OR financial)";
  const params = {
    q: query,
    language: "en",
    sortBy: "publishedAt",
    pageSize: 50,
    domains: "abc.net.au,smh.com.au,theaustralian.com.au,news.com.au,afr.com",
    excludeDomains:
      "timesofindia.indiatimes.com,ndtv.com,indiatoday.in,hindustantimes.com,news18.com,economictimes.indiatimes.com,livemint.com,scroll.in,thehindu.com",
    apiKey: NEWS_API_KEY,
  };

  const response = await axios.get(NEWS_API_URL, { params });
  return response.data;
}

async function shouldRefreshNews(): Promise<boolean> {
  try {
    const metadata = await NewsMetadataModel.findOne().sort({ createdAt: -1 });

    if (!metadata) {
      return true; // No data exists, fetch news
    }

    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    return metadata.lastFetched < threeHoursAgo;
  } catch (error) {
    console.error("Error checking news refresh status:", error);
    return true; // In case of error, refresh the news
  }
}

async function deleteOldNews(): Promise<void> {
  try {
    await NewsArticleModel.deleteMany({});
    await NewsMetadataModel.deleteMany({});
    console.log("Old news data deleted successfully");
  } catch (error) {
    console.error("Error deleting old news:", error);
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const shouldRefresh = await shouldRefreshNews();

    if (!shouldRefresh) {
      // Return cached news
      const cachedNews = await NewsArticleModel.find()
        .sort({ publishedAt: -1 })
        .limit(50);

      const metadata = await NewsMetadataModel.findOne().sort({
        createdAt: -1,
      });

      return NextResponse.json<NewsApiResponse>({
        success: true,
        data: cachedNews,
        lastFetched: metadata?.lastFetched,
        fromCache: true,
      });
    }

    // Delete old news before fetching new ones
    await deleteOldNews();

    // Fetch fresh news
    const newsData = await fetchNewsFromAPI();

    if (!newsData.articles || newsData.articles.length === 0) {
      return NextResponse.json<NewsApiResponse>({
        success: false,
        data: [],
        message: "No news articles found",
        fromCache: false,
      });
    }

    // Transform and save news articles
    const transformedArticles = newsData.articles
      .filter(
        (article) =>
          article.title &&
          article.description &&
          article.urlToImage &&
          article.title !== "[Removed]"
      )
      .map((article, index) => ({
        title: article.title,
        description: article.description,
        content: article.content || article.description,
        url: article.url,
        urlToImage: article.urlToImage || "/bg10.jpg",
        publishedAt: article.publishedAt,
        source: article.source,
        author: article.author,
        category: categorizeNews(article.title, article.description),
        tags: generateTags(article.title, article.description),
        featured: index === 0, // Make first article featured
        readTime: estimateReadTime(article.content),
      }));

    // Save to database
    const savedArticles = await NewsArticleModel.insertMany(
      transformedArticles
    );

    // Save metadata
    const metadata = new NewsMetadataModel({
      lastFetched: new Date(),
      totalArticles: savedArticles.length,
      source: "NewsAPI",
    });
    await metadata.save();

    return NextResponse.json<NewsApiResponse>({
      success: true,
      data: savedArticles,
      lastFetched: metadata.lastFetched,
      fromCache: false,
    });
  } catch (error) {
    console.error("Error in news API:", error);

    // Try to return cached data in case of error
    try {
      await connectToDatabase();
      const cachedNews = await NewsArticleModel.find()
        .sort({ publishedAt: -1 })
        .limit(50);

      if (cachedNews.length > 0) {
        return NextResponse.json<NewsApiResponse>({
          success: true,
          data: cachedNews,
          message: "Returning cached data due to API error",
          fromCache: true,
        });
      }
    } catch (cacheError) {
      console.error("Error fetching cached news:", cacheError);
    }

    return NextResponse.json<NewsApiResponse>(
      {
        success: false,
        data: [],
        message:
          error instanceof Error ? error.message : "Failed to fetch news",
        fromCache: false,
      },
      { status: 500 }
    );
  }
}
