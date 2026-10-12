import { NextResponse } from "next/server";
import { getDailyMediaNews } from "@/data/mediaNewsData";

// Cache for 24 hours (86,400 seconds) so news refreshes once a day
export const revalidate = 86400;

export async function GET() {
  const dailyData = getDailyMediaNews(new Date());

  return NextResponse.json(
    {
      success: true,
      data: dailyData.cards,
      dateKey: dailyData.dayKey,
      lastUpdated: dailyData.lastUpdatedFormatted,
      refreshInterval: "24h",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
      },
    }
  );
}
