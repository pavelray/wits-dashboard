import {
  getSiteMapDataRepository,
  getSiteMapMockData,
} from "../repository/siteMapDataRepository";

export const getSiteMapData = async () => {
  // if (process.env.NEXT_PUBLIC_IS_MOCK_ENABLED ===  "true") {
  //   return getSiteMapMockData();
  // }
  const response = await getSiteMapDataRepository();
  return response;
};
