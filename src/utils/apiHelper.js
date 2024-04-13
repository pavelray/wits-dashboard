import { CISCO_PRIME_API_URL } from "./constants";
import { groupBy } from "@/utils/helperMethods";
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
  perPage = 1000,
  startTime,
  endTime
) => {
  let url = `${CISCO_PRIME_API_URL}data/ClientSessions?.full=true&.firstResult=${first}&.maxResults=${perPage}&location=contains("${location}")&sessionStartTime=between(${startTime},${endTime})`;
  if (apName) {
    url = `${CISCO_PRIME_API_URL}data/ClientSessions?.full=true&.firstResult=${first}&.maxResults=${perPage}&apMacAddress="${apName}"&sessionStartTime=between(${startTime},${endTime})`;
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

export const formatClientSessionDataResponse = (entity) => {
  return entity.map(({ clientSessionsDTO }) => {
    const regex = /\s*>\s*/;
    const locationArr = clientSessionsDTO.location.trim().split(regex);
    return {
      id: clientSessionsDTO["@id"],
      sessionStartTime: clientSessionsDTO.sessionStartTime,
      sessionEndTime: clientSessionsDTO.sessionEndTime,
      apMacAddress: clientSessionsDTO.apMacAddress?.octets,
      location: clientSessionsDTO.location,
      userName: clientSessionsDTO.userName,
      ipAddress: clientSessionsDTO.ipAddress?.address,
      macAddress: clientSessionsDTO.macAddress?.octets,
      campus: locationArr[0],
      building: locationArr[1],
      buildingArea: locationArr.length > 2 ? locationArr[2] : "",
    };
  });
};

export const formatAPDataResponse = (entity) => {
  return entity.map(({ accessPointDetailsDTO }) => {
    const regex = /\s*>\s*/;
    const locationArr = accessPointDetailsDTO.locationHierarchy
      .trim()
      .split(regex);
    return {
      id: accessPointDetailsDTO["@id"],
      clientCount: accessPointDetailsDTO.clientCount,
      clientCount_2_4GHz: accessPointDetailsDTO.clientCount_2_4GHz,
      clientCount_5GHz: accessPointDetailsDTO.clientCount_5GHz,
      type: accessPointDetailsDTO.type,
      location: accessPointDetailsDTO.locationHierarchy,
      name: accessPointDetailsDTO.name,
      ipAddress: accessPointDetailsDTO.ipAddress?.address,
      macAddress: accessPointDetailsDTO.macAddress?.octets,
      campus: locationArr[0],
      building: locationArr[1],
      buildingArea: locationArr.length > 2 ? locationArr[2] : "",
    };
  });
};

export const applyGroupByFilter = (entity, groupByValue, objectDTO) => {
  if (groupByValue.includes("time") || groupByValue.includes("Time")) {
    return groupBy(entity, (object) => {
      const dateValue = object[objectDTO][groupByValue];
      const monthNumber = new Date(dateValue).getMonth() + 1;
      //const date = new Date(dateValue).toDateString();
      const date = new Date(dateValue);
      const day = new Date(dateValue).getDate();
      const month = monthNumber > 10 ? monthNumber : `0${monthNumber}`;
      const year = new Date(dateValue).getFullYear();
      const time = new Date(dateValue).toLocaleTimeString().split(":")[0];
      const newDate = `${year}-${month}-${day} ${time}:00:00`;
      return new Date(newDate).toString();
      // const year = date.getFullYear();
      // const month = date.getMonth() + 1; // Month is zero-based, so add 1
      // const key = `${year}-${month.toString().padStart(2, "0")}`;
      // const newDate = `${year}-${month}-${day}`;
      // return key;
      //return new Date(newDate).toDateString();
    });
  }
  if (objectDTO) {
    return groupBy(entity, (object) => object[objectDTO[groupBy]]);
  }
  return groupBy(entity, (obj) => {
    return obj[groupByValue];
  });
};
