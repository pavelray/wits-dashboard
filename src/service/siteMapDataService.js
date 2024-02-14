import { getSiteMapDataRepository } from "../repository/siteMapDataRepository";

export const getSiteMapData = async () => {
  const response = await getSiteMapDataRepository();
  return response;
};
