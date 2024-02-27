import { CISCO_PRIME_API_URL } from "./constants";
import https from "https";
import httpService from "./httpService";

export const getCommonHeader = () => {
  return {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    auth: {
      username: "AI_team",
      password: "@PrimeAI_API2081",
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };
};

export const getClientSessionUrl = (
  location,
  first = 0,
  last = 999,
  startTime = 1708646400000,
  endTime = 1708713000000
) => {
  const url = `${CISCO_PRIME_API_URL}data/ClientSessions?.full=true&.firstResult=${first}&.maxResults=${last}&location="${location}"&sessionStartTime=between(${startTime},${endTime})`;
  return url;
};

export const getClientSession = async (campusName, buildingName, floorName) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const startTime = Date.parse(yesterday.toDateString());
  const endTime = Date.parse(today.toDateString());

  const location = `${campusName} > ${buildingName} > ${floorName}`;
  const res = await httpService.post(
    "http://localhost:3000/api/clientSessionDetails",
    {
      body: {
        location: location,
        startTime: startTime,
        endTime: endTime,
        groupBy: "userName",
      },
    }
  );
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  const { data } = res;
  return data;
};
