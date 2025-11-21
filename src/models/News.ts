import mongoose from "mongoose";
import { NewsArticle, NewsMetadata } from "@/types/news";

const NewsArticleSchema = new mongoose.Schema<NewsArticle>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    urlToImage: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: String,
      required: true,
    },
    source: {
      id: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        required: true,
      },
    },
    author: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Tax Updates",
        "Industry News",
        "Regulatory",
        "Business",
        "Finance",
      ],
      default: "Business",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
NewsArticleSchema.index({ publishedAt: -1 });
NewsArticleSchema.index({ category: 1 });
NewsArticleSchema.index({ featured: -1 });
NewsArticleSchema.index({ url: 1 }, { unique: true });

const NewsMetadataSchema = new mongoose.Schema<NewsMetadata>(
  {
    lastFetched: {
      type: Date,
      required: true,
      default: Date.now,
    },
    totalArticles: {
      type: Number,
      required: true,
      default: 0,
    },
    source: {
      type: String,
      required: true,
      default: "NewsAPI",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
export const NewsArticleModel =
  mongoose.models.NewsArticle ||
  mongoose.model<NewsArticle>("NewsArticle", NewsArticleSchema);
export const NewsMetadataModel =
  mongoose.models.NewsMetadata ||
  mongoose.model<NewsMetadata>("NewsMetadata", NewsMetadataSchema);
