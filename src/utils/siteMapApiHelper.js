import httpService from "./httpService";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;
export const getSiteMapData = async () => {
  const res = await httpService.get(`${HOST_URL}/api/siteMapData`);
  if (!res) {
    throw new Error("Failed to Site Map data");
  }
  const { data } = res;
  return data;
};
