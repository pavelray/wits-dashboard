import { NextResponse } from "next/server";
import { getClientListData } from "@/service/clientDetailsService";

export async function POST(request) {
  const { location, startTime, endTime, groupBy } = await request.json();
  const requestBody = { location, startTime, endTime, groupBy };
  console.log('requestBody', requestBody)

  const response = await getClientListData(requestBody);
  return NextResponse.json({ data: response.data });
}
