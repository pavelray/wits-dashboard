"use client";
import React, { useContext, useEffect } from "react";
import { BuildingStatsContainer } from "../StatsContainer";
import { getSelectedFloor } from "@/utils/helperMethods";
import { AppContext } from "@/context/AppContext";
import ActiveClientByAPContainer from "../ActiveClientByAP";
import ClientSessionContainer from "../ClientSession/ClientSessionActivity";

const BuildingStatsComponent = ({ buildingName, campusName, accessPointData }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row mb-4">
        <div className="w-full">
          <BuildingStatsContainer
            buildingName={buildingName}
            campusName={campusName}
          />
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <div className="w-full">
          <div className="mt-4 bg-white p-4">
            <div className="w-full flex-1">
              <ActiveClientByAPContainer
                buildingName={buildingName}
                campusName={campusName}
                accessPointData={accessPointData}
              />
            </div>
          </div>
        </div>
        {/* <div className="basis-1/2">
          <ClientSessionContainer />
        </div> */}
      </div>
    </div>
  );
};

export default BuildingStatsComponent;
