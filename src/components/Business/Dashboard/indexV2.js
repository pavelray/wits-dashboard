"use client";
import React from "react";
import MapContainer from "@/components/Business/MapContainer";
import StatsContainer from "../StatsContainer";
import FloorSelector from "../FloorSelector";
import ActiveClientByAPContainer from "../ActiveClientByAP";
import ClientSessionContainer from "../ClientSession/ClientSessionActivity";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row gap-8">
        <div className="basis-1/2">
          <MapContainer />
        </div>
        <div className="basis-1/2">
          <StatsContainer />
          <div className="mt-4 bg-white p-4">
            <FloorSelector />
            <div className="w-full flex-1">
              <ActiveClientByAPContainer />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-8 my-4">
        <ClientSessionContainer />
      </div>
    </div>
  );
};

export default Dashboard;
