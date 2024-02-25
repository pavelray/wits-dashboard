import { CISCO_PRIME_API_URL } from "./constants";
import https from "https";

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
