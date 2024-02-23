import { getAPDetailsListRepository } from "@/repository/apDetailsRepository";

export const getAPDetailsListData = async (location) => {
  const response = await getAPDetailsListRepository(location);
  return response;
};
