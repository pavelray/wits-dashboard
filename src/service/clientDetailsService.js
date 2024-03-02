import {
  getClientFrequencyRepository,
  getClientSessionDetailsRepository,
} from "../repository/clientDetailsRepository";

export const getClientFrequencyService = async (requestBody) => {
  const response = await getClientFrequencyRepository(requestBody);
  return response;
};

export const getClientSessionDataService = async (requestBody) => {
  const response = await getClientSessionDetailsRepository(requestBody);
  return response;
};
