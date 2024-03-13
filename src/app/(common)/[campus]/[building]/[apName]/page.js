import ClientSessionContainer from "@/components/Business/ClientSession/ClientSessionActivity";
import { getClientSession } from "@/utils/clientApiHelper";

const getClientFrequencyByAP = async ({ campusName, buildingName, apName }) => {
  const clientResponse = await getClientSession({
    campusName,
    buildingName,
    apName,
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
      <ClientSessionContainer clientSessionData={clientData} />
    </section>
  );
}
