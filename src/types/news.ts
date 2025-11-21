// News article interface for the application
export interface NewsArticle {
  _id?: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author?: string;
  category: string;
  tags: string[];
  featured: boolean;
  readTime: string;
  createdAt: Date;
  updatedAt: Date;
}

// External News API response interface (NewsAPI format)
export interface ExternalNewsResponse {
  status: string;
  totalResults: number;
  articles: ExternalNewsArticle[];
}

export interface ExternalNewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
}

// API response for our news endpoint
export interface NewsApiResponse {
  success: boolean;
  data: NewsArticle[];
  message?: string;
  lastFetched?: Date;
  fromCache: boolean;
}

// News categories
export enum NewsCategory {
  TAX_UPDATES = "Tax Updates",
  INDUSTRY_NEWS = "Industry News",
  REGULATORY = "Regulatory",
  BUSINESS = "Business",
  FINANCE = "Finance",
}

// News metadata for database
export interface NewsMetadata {
  _id?: string;
  lastFetched: Date;
  totalArticles: number;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}
