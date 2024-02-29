import {
  getClientDetailsListRepository,
  getClientDetailsMock,
  getClientSessionDetailsRepository,
} from "../repository/clientDetailsRepository";

export const getClientListData = async (requestBody) => {
  const response = await getClientDetailsListRepository(requestBody);
  return response;
};

export const getClientSessionData = async (requestBody) => {
  const response = await getClientSessionDetailsRepository(requestBody);
  return response;
};
