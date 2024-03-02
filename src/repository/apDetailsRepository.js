import { getAPDetailsUrl, getCommonHeader } from "@/utils/apiHelper";
import axios from "axios";

const getAPDetailsListRepository = async (location) => {
  let config = {
    method: "get",
    url: getAPDetailsUrl(location),
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
  } catch (ex) {
    console.log(ex);
    throw new Error("Failed to fetch data");
  }
};
export { getAPDetailsListRepository };
