import { NextRequest, NextResponse } from "next/server";

/** 兼容常见 RSS 路径，转到 /feed.xml */
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/feed.xml", request.url), 308);
}
