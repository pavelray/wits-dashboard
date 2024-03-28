import ClientSessionContainer from "@/components/Business/ClientSession/ClientSessionActivity";
import { getClientSession } from "@/utils/clientApiHelper";
import { DEFAULT_DATE_RANGE } from "@/utils/constants";
import { getDateRange } from "@/utils/helperMethods";

const getClientFrequencyByAP = async ({ campusName, buildingName, apName }) => {
  const { start, end } = getDateRange(DEFAULT_DATE_RANGE);
  const startDate = Date.parse(start);
  const endDate = Date.parse(end);
  const clientResponse = await getClientSession({
    campusName,
    buildingName,
    apName,
    startDate,
    endDate,
  });
  return clientResponse;
};

export default async function AccessPoint({ params }) {
  const campusName = decodeURI(params.campus);
  const buildingName = decodeURI(params.building);
  const apName = decodeURI(params.apName);
  const clientData = await getClientFrequencyByAP({
    campusName,
    buildingName,
    apName,
  });
  return (
    <section className="md:container md:mx-auto md:my-5">
      <ClientSessionContainer
        clientSessionData={clientData}
        campusName={campusName}
        buildingName={buildingName}
        apName={apName}
      />
    </section>
  );
}
