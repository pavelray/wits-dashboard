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
  apName,
  first = 0,
  last = 999,
  startTime,
  endTime
) => {
  let url = `${CISCO_PRIME_API_URL}data/ClientSessions?.full=true&.firstResult=${first}&.maxResults=${last}&location="contains(${location})"&sessionStartTime=between(${startTime},${endTime})`;
  if (apName) {
    url = `${CISCO_PRIME_API_URL}data/ClientSessions?.full=true&.firstResult=${first}&.maxResults=${last}&apMacAddress="${apName}"&sessionStartTime=between(${startTime},${endTime})`;
  }
  return url;
};

export const getClientDetailsUrl = (
  location,
  first,
  last,
  startTime,
  endTime
) => {
  const url = `${CISCO_PRIME_API_URL}data/ClientDetails?.full=true&.firstResult=${first}&.maxResults=${last}&location="${location}"&firstSeenTime=between(${startTime},${endTime})`;
  return url;
};

export const getSiteMapUrl = () => {
  return `${CISCO_PRIME_API_URL}op/groups/sites?.full=true`;
};

export const getAPDetailsUrl = (location, max = 1000) => {
  return `${CISCO_PRIME_API_URL}data/AccessPointDetails?.full=true&.maxResults=${max}&locationHierarchy=contains("${location}")`;
};

export const applyGroupByFilter = (entity, groupBy, objectDTO) => {
  if (groupBy.includes("time") || groupBy.includes("Time")) {
    return Object.groupBy(entity, (object) => {
      const dateValue = object[objectDTO][groupBy];

      return new Date(dateValue).toDateString();
    });
  }
  if (objectDTO) {
    return Object.groupBy(entity, (object) => object[objectDTO[groupBy]]);
  }
  return Object.groupBy(entity, (object) => object[groupBy]);
};
