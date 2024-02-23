import { NextResponse } from "next/server";
import { getClientListData } from "@/service/clientDetailsService";

export async function POST(request) {
  const { location } = await request.json();

  const response = await getClientListData(location);
  return NextResponse.json({ data: response.data });
}
