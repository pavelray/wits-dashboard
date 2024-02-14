import { NextResponse } from "next/server";
import { getSiteMapData } from "../../../service/siteMapDataService";

export async function GET() {
  const response = await getSiteMapData();
  return NextResponse.json({ data: response.data });
}
