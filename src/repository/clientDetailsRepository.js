import clientDetailsMockResponse from "@/data/clientDetails.mock";
import {
  applyGroupByFilter,
  formatClientSessionDataResponse,
  getClientDetailsUrl,
  getClientSessionUrl,
  getCommonHeader,
} from "@/utils/apiHelper";
import axios from "axios";

const getClientFrequencyRepository = async ({
  location,
  startTime,
  endTime,
  first = 0,
  last = 1000,
  groupBy,
}) => {
  let config = {
    method: "get",
    url: getClientDetailsUrl(location, first, last, startTime, endTime),
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
        ? applyGroupByFilter(entity, groupBy, "clientDetailsDTO")
        : entity;
      response.data = {
        result: formattedDataResponse,
        total: otherProps["@count"],
        first: otherProps["@first"],
        last: otherProps["@last"],
        location: location,
      };
    } else {
      response.data = {
        result: [],
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
  apName,
  first,
  perPage,
  groupBy,
  hasBuildingArea = false,
}) => {
  let config = {
    method: "get",
    url: getClientSessionUrl(
      location,
      apName,
      first,
      perPage,
      startTime,
      endTime,
      hasBuildingArea
    ),
    ...getCommonHeader(),
  };
  let formattedDataResponse = [];

  try {
    const response = await axios.request(config);
    if (response.data && response.data.queryResponse["@count"] > 0) {
      const {
        data: {
          queryResponse: { entity },
        },
      } = response;
      formattedDataResponse.push(...formatClientSessionDataResponse(entity));

      const total = response.data.queryResponse["@count"];
      const perPage = 1000;
      const requestArr = [];
      if (total > perPage) {
        const numPages = Math.floor(total / perPage);
        const remainder = total % perPage;

        for (let page = 2; page <= numPages; page++) {
          const startPage = perPage * (page - 1);
          config.url = getClientSessionUrl(
            location,
            apName,
            startPage,
            perPage,
            startTime,
            endTime
          );
          requestArr.push(axios.request(config));
        }
        if (remainder > 0) {
          const startPage = numPages * perPage;
          config.url = getClientSessionUrl(
            location,
            apName,
            startPage,
            perPage,
            startTime,
            endTime
          );
          requestArr.push(axios.request(config));
        }
      }
      const responseArr = await Promise.allSettled(requestArr);
      responseArr.forEach((response) => {
        const {
          data: {
            queryResponse: { entity },
          },
        } = response.value;
        formattedDataResponse.push(...formatClientSessionDataResponse(entity));
      });
      response.data = {
        result: formattedDataResponse,
        total,
        perPage,
        location: location,
      };
    } else {
      response.data = {
        result: formattedDataResponse,
        location: location,
        perPage,
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
      result: formattedDataResponse,
      total: otherProps["@count"],
      first: otherProps["@first"],
      last: otherProps["@last"],
      location: location,
    };
  } else {
    response.data = {
      result: [],
      location: location,
      total: response.data.queryResponse["@count"],
    };
  }
  return response;
};

export {
  getClientFrequencyRepository,
  getClientDetailsMock,
  getClientSessionDetailsRepository,
};
