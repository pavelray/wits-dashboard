import BuildingStatsComponent from "@/components/Business/BuildingStats";
import { convertAPDetailsDataForGraph } from "@/utils/chartDataHelper";
import { groupBy } from "@/utils/helperMethods";
import httpService from "@/utils/httpService";

const getAPDetails = async (campusName, buildingName) => {
  const location = `${campusName} > ${buildingName}`;
  const res = await httpService.post("http://localhost:3000/api/apDetails", {
    body: {
      location: location,
    },
  });
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  const { data } = res;
  const floorwiseAP = groupBy(data.result, (result) => result.buildingArea);
  const responseData = [];
  Object.keys(floorwiseAP).forEach((floor) => {
    const chartData = convertAPDetailsDataForGraph(floorwiseAP[floor]);
    responseData.push({
      apDetailsData: floorwiseAP[floor],
      chartData,
      name: floor,
    });
  });
  return responseData;
};

export default async function Building({ params }) {
  const campusName = decodeURI(params.campus);
  const buildingName = decodeURI(params.building);
  const accessPointData = await getAPDetails(campusName, buildingName);
  return (
    <section className="md:container md:mx-auto md:my-5">
      <BuildingStatsComponent
        campusName={decodeURI(params.campus)}
        buildingName={decodeURI(params.building)}
        accessPointData={accessPointData}
      />
    </section>
  );
}
