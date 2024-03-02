import { NextResponse } from "next/server";
import { getSiteMapDataService } from "../../../service/siteMapDataService";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/utils/constants";

export async function GET() {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has(COOKIE_NAMES.DEFAULT_CAMPUS_NAME)
  const response = await getSiteMapDataService(hasCookie);
  return NextResponse.json({ data: response.data });
}
