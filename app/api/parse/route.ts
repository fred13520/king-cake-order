import { NextResponse } from "next/server";
import { parseOrderText } from "@/lib/parseOrder";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = parseOrderText(body.rawChatText || "", body.customerNickname || "");
  return NextResponse.json(parsed);
}
