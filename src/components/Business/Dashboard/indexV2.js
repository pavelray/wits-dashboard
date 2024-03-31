"use client";
import React from "react";
import MapContainer from "@/components/Business/MapContainer";
import { AllLocationStatsContainer } from "../StatsContainer";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row mb-4">
        <div className="w-full">
          <AllLocationStatsContainer />
        </div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="w-full">
          <MapContainer />
        </div>
      </div>
      {/* <div className="flex flex-row gap-8">
        <div className="basis-1/2">
          <div className="mt-4 bg-white p-4">
            <div className="w-full flex-1">
              <ActiveClientByAPContainer />
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <ClientSessionContainer />
        </div>
      </div> */}
      <div className="flex flex-row gap-8 my-4"></div>
    </div>
  );
};

export default Dashboard;
