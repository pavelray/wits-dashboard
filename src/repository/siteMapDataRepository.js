import axios from "axios";
import siteMapMockResponse from "../data/siteMap.mock";
import {
  getSiteMapUrl,
  getCommonHeader,
  applyGroupByFilter,
} from "@/utils/apiHelper";

const getSiteMapDataRepository = async () => {
  let config = {
    method: "get",
    url: getSiteMapUrl(),
    ...getCommonHeader(),
  };
  try {
    const response = await axios.request(config);
    if (response.data) {
      const {
        data: {
          mgmtResponse: { siteOpDTO },
        },
      } = response;
      const formattedDataResponse = applyGroupByFilter(
        siteOpDTO,
        "locationGroupType"
      );
      response.data = {
        result: formattedDataResponse,
      };
    } else {
      response.data = {
        result: [],
      };
    }
    return response;
  } catch (ex) {
    console.log(ex);
    throw new Error("Failed to fetch data");
  }
};

const getSiteMapMockData = () => {
  const response = { data: siteMapMockResponse };
  if (response.data) {
    const {
      data: {
        mgmtResponse: { siteOpDTO },
      },
    } = response;
    const formattedDataResponse = Object.groupBy(
      siteOpDTO,
      ({ locationGroupType }) => locationGroupType
    );
    response.data = { result: formattedDataResponse };
  }

  return response;
};

export { getSiteMapDataRepository, getSiteMapMockData };
