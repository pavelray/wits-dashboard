import { getDefaultLocation } from "@/utils/helperMethods";
import { getSiteMapDataRepository } from "../repository/siteMapDataRepository";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/utils/constants";

export const getSiteMapDataService = async (hasCookie) => {
  const { data } = await getSiteMapDataRepository();
  const { FLOORAREA, BUILDING, CAMPUS, OUTDOORAREA } = data.result;
  const { defaultBuildingName, defaultCampusName, defaultFloorName } =
    getDefaultLocation({
      campus: CAMPUS,
      building: BUILDING,
      floor: FLOORAREA,
      outdoor: OUTDOORAREA,
    }) || {};

  const responseData = {
    ...data.result,
    DEFAULT_LOCATION: {
      campusName: defaultCampusName,
      buildingName: defaultBuildingName,
      floorName: defaultFloorName,
    },
  };
  if (!hasCookie) {
    cookies().set(COOKIE_NAMES.DEFAULT_CAMPUS_NAME, defaultCampusName);
    cookies().set(COOKIE_NAMES.DEFAULT_BUILDING_NAME, defaultBuildingName);
    cookies().set(COOKIE_NAMES.DEFAULT_FLOOR_NAME, defaultFloorName);
  }
  return { data: responseData };
};
