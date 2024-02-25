"use client";
import React, { useContext } from "react";
import MapContainer from "@/components/Business/MapContainer";
import StatsContainer from "../StatsContainer";
import FloorSelector from "../FloorSelector";
import FilledLineChart from "../Charts/FilledLineChart";
import ActiveClientByAPContainer from "../ActiveClientByAP";
import { AppContext } from "@/context/AppContext";
import ClientSessionActivityComponent from "../ClientSession/ClientSessionActivity";
import SessionActivityLineChart from "../ClientSession/ClientSessionActivity/SessionActivityLineChart";

const Dashboard = () => {
  const { defaultLocation } = useContext(AppContext);
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row gap-8">
        <div className="basis-2/5">
          <MapContainer />
        </div>
        <div className="basis-3/5">
          <StatsContainer />
          <div className="mt-4 bg-white p-4">
            <FloorSelector />
            <div className="w-full flex-1">
              <ActiveClientByAPContainer defaultLocation={defaultLocation} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-8 my-4">
        <div className="basis-1/2">
          <div className="bg-white p-4">
            <SessionActivityLineChart />
          </div>
        </div>
        <div className="basis-1/2">
          <div className="bg-white p-4">
            <ClientSessionActivityComponent defaultLocation={defaultLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
