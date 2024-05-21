import { NextResponse } from "next/server";
import { getClientSessionDataService } from "@/service/clientDetailsService";

export async function POST(request) {
  const { location, startTime, endTime, groupBy, apName, hasBuildingArea } = await request.json();
  const requestBody = { location, startTime, endTime, groupBy , apName, hasBuildingArea};

  const response = await getClientSessionDataService(requestBody);
  return NextResponse.json({ data: response.data });
}
