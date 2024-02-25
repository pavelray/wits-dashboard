import {
  getClientDetailsListRepository,
  getClientDetailsMock,
  getClientSessionDetailsRepository,
} from "../repository/clientDetailsRepository";

export const getClientListData = async (location) => {
  if (process.env.NEXT_PUBLIC_IS_MOCK_ENABLED === true) {
    return getClientDetailsMock(location);
  }
  const response = await getClientDetailsListRepository(location);
  return response;
};

export const getClientSessionData = async (requestBody) => {
  const response = await getClientSessionDetailsRepository(requestBody);
  return response;
};
