import clientDetailsMockResponse from "@/data/clientDetails.mock";
import { getClientSessionUrl, getCommonHeader } from "@/utils/apiHelper";
import axios from "axios";

const getClientDetailsListRepository = async (
  location = "NHLS-Forensics > Forensics > 1st Floor"
) => {
  let config = {
    method: "get",
    url: `https://10.192.48.150/webacs/api/v4/data/ClientDetails?.full=true&.firstResult=0&.maxResults=20&location="${location}"`,
    ...getCommonHeader(),
  };
  try {
    const response = await axios.request(config);
    if (response.data && response.data.queryResponse["@count"] > 0) {
      const {
        data: {
          queryResponse: { entity, ...otherProps },
        },
      } = response;
      const formattedDataResponse = entity;
      response.data = {
        clientList: formattedDataResponse,
        total: otherProps["@count"],
        first: otherProps["@first"],
        last: otherProps["@last"],
        location: location,
      };
    } else {
      response.data = {
        clientList: [],
        location: location,
        total: response.data.queryResponse["@count"],
      };
    }
    return response;
  } catch (ex) {
    console.log(ex);
    throw new Error("Failed to fetch data");
  }
};

const getClientSessionDetailsRepository = async ({
  location,
  startTime,
  endTime,
  first = 0,
  last = 999,
  groupBy,
}) => {
  let config = {
    method: "get",
    url: getClientSessionUrl(location, first, last, startTime, endTime),
    ...getCommonHeader(),
  };
  try {
    const response = await axios.request(config);
    if (response.data && response.data.queryResponse["@count"] > 0) {
      const {
        data: {
          queryResponse: { entity, ...otherProps },
        },
      } = response;
      const formattedDataResponse = groupBy
        ? Object.groupBy(entity, ({ clientSessionsDTO }) => clientSessionsDTO[groupBy])
        : entity;
      response.data = {
        clientList: formattedDataResponse,
        total: otherProps["@count"],
        first: otherProps["@first"],
        last: otherProps["@last"],
        location: location,
      };
    } else {
      response.data = {
        clientList: [],
        location: location,
        total: response.data.queryResponse["@count"],
      };
    }
    return response;
  } catch (ex) {
    console.log(ex);
    throw new Error("Failed to fetch data");
  }
};

const getClientDetailsMock = (location) => {
  const response = { data: clientDetailsMockResponse };
  if (response.data && response.data.queryResponse["@count"] > 0) {
    const {
      data: {
        queryResponse: { entity, ...otherProps },
      },
    } = response;
    const formattedDataResponse = entity;
    response.data = {
      clientList: formattedDataResponse,
      total: otherProps["@count"],
      first: otherProps["@first"],
      last: otherProps["@last"],
      location: location,
    };
  } else {
    response.data = {
      clientList: [],
      location: location,
      total: response.data.queryResponse["@count"],
    };
  }
  return response;
};

export {
  getClientDetailsListRepository,
  getClientDetailsMock,
  getClientSessionDetailsRepository,
};
