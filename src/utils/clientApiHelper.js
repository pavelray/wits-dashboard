import { DEFAULT_DATE_RANGE } from "./constants";
import { getDateRange } from "./helperMethods";
import httpService from "./httpService";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

export const getClientSession = async ({
  campusName,
  buildingName,
  floorName,
  apName,
  startDate,
  endDate,
  location
}) => {
  let locationStr = `${campusName} > ${buildingName}`;
  if (floorName) {
    locationStr = `${campusName} > ${buildingName} > ${floorName}`;
  }

  const res = await httpService.post(`${HOST_URL}/api/clientSessionDetails`, {
    body: {
      location: location || locationStr,
      apName: apName,
      startTime: startDate,
      endTime: endDate,
    },
  });
  if (!res) {
    throw new Error("Failed to fetch client session data");
  }
  const { data } = res;
  return data;
};

export const getClientFrequency = async (
  campusName,
  buildingName,
  floorName,
  range = DEFAULT_DATE_RANGE
) => {
  const { start, end } = getDateRange(range);
  const startTime = Date.parse(start);
  const endTime = Date.parse(end);
  const location = `${campusName} > ${buildingName} > ${floorName}`;
  const res = await httpService.post(`${HOST_URL}/api/clientDetails`, {
    body: {
      location,
      startTime: startTime,
      endTime: endTime,
      groupBy: "firstSeenTime",
    },
  });
  if (!res) {
    throw new Error("Failed to fetch client frequency data");
  }
  const { data } = res;
  return data;
};
