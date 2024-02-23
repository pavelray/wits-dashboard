import { NextResponse } from "next/server";
import { getAPDetailsListData } from "@/service/apDetailsService";

export async function POST(request) {
  const { location } = await request.json();

  const response = await getAPDetailsListData(location);
  return NextResponse.json({ data: response.data });
}
