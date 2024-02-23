import clientDetailsMockResponse from "@/data/clientDetails.mock";
import axios from "axios";
import https from "https";

const getClientDetailsListRepository = async (
  location = "NHLS-Forensics > Forensics > 1st Floor"
) => {

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://10.192.48.150/webacs/api/v4/data/ClientDetails?.full=true&.firstResult=0&.maxResults=20&location="${location}"`,
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

export { getClientDetailsListRepository, getClientDetailsMock };
