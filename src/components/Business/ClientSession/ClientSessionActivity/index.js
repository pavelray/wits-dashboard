import { ClientSessionContext } from "@/context/ClientSessionContext";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SessionActivityLineChart from "./SessionActivityLineChart";
import SessionActivityTable from "./SessionActivityTable";
import { formatClientSessionData } from "@/utils/helperMethods";
import { getClientFrequency, getClientSession } from "@/utils/apiHelper";
import { AppContext } from "@/context/AppContext";
import ClientDataUsageChart from "./ClientDataUsageChart";

const ClientSessionContainer = () => {
  const { defaultLocation, selectedLocation } = useContext(AppContext);
  const { clientSessionData } = useContext(ClientSessionContext);
  const [sessionData, setSessionData] = useState(clientSessionData);
  const [isLoading, setIsLoading] = useState(false);

  const loadSessionDataOnLocationChange = useCallback(async () => {
    const { campusName, buildingName, floorName } = defaultLocation;
    const sessionData = await getClientFrequency(
      campusName,
      buildingName,
      floorName
    );
    //const formattedDataResponse = formatClientSessionData(sessionData);
    setSessionData(sessionData);
    setIsLoading(false);
  }, [defaultLocation]);

  useEffect(() => {
    console.log(defaultLocation, selectedLocation);
    if (
      selectedLocation &&
      defaultLocation.buildingName === selectedLocation.buildingName
    ) {
      setIsLoading(true);
      loadSessionDataOnLocationChange();
    }
  }, [defaultLocation, loadSessionDataOnLocationChange, selectedLocation]);

  return (
    <Fragment>
      <div className="basis-1/2">
        <div className="bg-white p-4">
          <SessionActivityLineChart
            clientSessionData={sessionData}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="basis-1/2">
        <div className="bg-white p-4">
          {/* <ClientDataUsageChart
            clientSessionData={sessionData}
            isLoading={isLoading}
          /> */}
          {/* <SessionActivityTable
            clientSessionData={sessionData}
            isLoading={isLoading}
          /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default ClientSessionContainer;
