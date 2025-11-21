import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { NewsArticleModel, NewsMetadataModel } from "@/models/News";

export async function POST() {
  try {
    await connectToDatabase();

    // Delete all news articles and metadata
    await NewsArticleModel.deleteMany({});
    await NewsMetadataModel.deleteMany({});

    return NextResponse.json({
      success: true,
      message:
        "News cache cleared successfully. Next request will fetch fresh news.",
    });
  } catch (error) {
    console.error("Error clearing news cache:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to clear news cache",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const articlesCount = await NewsArticleModel.countDocuments();
    const metadata = await NewsMetadataModel.findOne().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: {
        totalArticles: articlesCount,
        lastFetched: metadata?.lastFetched,
        cacheAge: metadata ? Date.now() - metadata.lastFetched.getTime() : null,
        shouldRefresh: metadata
          ? Date.now() - metadata.lastFetched.getTime() > 3 * 60 * 60 * 1000
          : true,
      },
    });
  } catch (error) {
    console.error("Error getting cache status:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get cache status",
      },
      { status: 500 }
    );
  }
}
