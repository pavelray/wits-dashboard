"use client";
import { AppContext } from "@/context/AppContext";
import { Card, CardBody } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";

const StatsContainer = () => {
  const { building, defaultLocation } = useContext(AppContext);
  const [statsData, setStatsData] = useState({});
  useEffect(() => {
    const { buildingName } = defaultLocation;
    const selectedBuilding = building.find((b) => b.groupName === buildingName);

    setStatsData({
      accessPoints: selectedBuilding.apCount,
      clientConnected: selectedBuilding.clientCount,
    });
  }, [building, defaultLocation]);
  return (
    <div className="flex flex-row gap-4">
      <Card className="basis-1/2 rounded-none">
        <CardBody>Access Points : {statsData.accessPoints}</CardBody>
      </Card>
      <Card className="basis-1/2 rounded-none">
        <CardBody>Connected Clients: {statsData.clientConnected}</CardBody>
      </Card>
    </div>
  );
};

export default StatsContainer;
