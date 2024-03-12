"use client"
import { ClientSessionContext } from "@/context/ClientSessionContext";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ClientFrequencyLineChart from "./ClientFrequencyLineChart";
import SessionActivityTable from "./SessionActivityTable";
import { formatClientSessionData } from "@/utils/helperMethods";

import { AppContext } from "@/context/AppContext";
import ClientDataUsageChart from "./ClientDataUsageChart";
import { getClientFrequency } from "@/utils/clientApiHelper";

const ClientSessionContainer = ({ clientSessionData }) => {
  const [sessionData, setSessionData] = useState(clientSessionData);
  const [isLoading, setIsLoading] = useState(false);

  // const loadSessionDataOnLocationChange = useCallback(async () => {
  //   const { campusName, buildingName, floorName } = defaultLocation;
  //   const sessionData = await getClientFrequency(
  //     campusName,
  //     buildingName,
  //     floorName
  //   );
  //   setSessionData(sessionData);
  //   setIsLoading(false);
  // }, [defaultLocation]);

  // useEffect(() => {
  //   console.log(defaultLocation, selectedLocation);
  //   if (
  //     selectedLocation &&
  //     defaultLocation?.buildingName === selectedLocation?.buildingName
  //   ) {
  //     setIsLoading(true);
  //     loadSessionDataOnLocationChange();
  //   }
  // }, [defaultLocation, loadSessionDataOnLocationChange, selectedLocation]);

  return (
    <Fragment>
      <div className="bg-white p-4 mt-4">
        <ClientFrequencyLineChart
          clientSessionData={clientSessionData}
          isLoading={isLoading}
        />
      </div>

      {/* <div className="basis-1/2">
        <div className="bg-white p-4">
          <ClientDataUsageChart
            clientSessionData={sessionData}
            isLoading={isLoading}
          />
          <SessionActivityTable
            clientSessionData={sessionData}
            isLoading={isLoading}
          />
        </div>
      </div> */}
    </Fragment>
  );
};

export default ClientSessionContainer;
