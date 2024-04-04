import { getDefaultLocation } from "@/utils/helperMethods";
import { getSiteMapDataRepository } from "../repository/siteMapDataRepository";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/utils/constants";

const getDefaultLocationValue = (
  hasCookie,
  FLOORAREA,
  BUILDING,
  CAMPUS,
  OUTDOORAREA
) => {
  if (hasCookie) {
    const campusName = cookies().get(COOKIE_NAMES.DEFAULT_CAMPUS_NAME).value;
    const buildingName = cookies().get(
      COOKIE_NAMES.DEFAULT_BUILDING_NAME
    ).value;
    const floorName = cookies().get(COOKIE_NAMES.DEFAULT_FLOOR_NAME).value;

    return {
      campusName,
      buildingName,
      floorName,
    };
  }
  const { defaultBuildingName, defaultCampusName, defaultFloorName } =
    getDefaultLocation({
      campus: CAMPUS,
      building: BUILDING,
      floor: FLOORAREA,
      outdoor: OUTDOORAREA,
    });

  return {
    campusName: defaultCampusName,
    buildingName: defaultBuildingName,
    floorName: defaultFloorName,
  };
};

export const getSiteMapDataService = async () => {
  const data = await getSiteMapDataRepository();
  return data;
};
