import { NextResponse } from "next/server";
import { getGrandOpeningStats } from "@/lib/grand-opening/stats";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getGrandOpeningStats();
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "no-store" },
  });
}
