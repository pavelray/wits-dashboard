"use client";
import { AppContext } from "@/context/AppContext";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React, { Fragment, useContext, useEffect, useState } from "react";

const BuildingStatsContainer = ({ buildingName, campusName }) => {
  const { building } = useContext(AppContext);
  const [statsData, setStatsData] = useState({});

  useEffect(() => {
    const selectedBuilding = building.find((b) => b.groupName === buildingName);
    setStatsData({
      accessPoints: selectedBuilding.apCount,
      clientConnected: selectedBuilding.clientCount,
      buildingName: buildingName,
      campusName: campusName,
    });
  }, [building, buildingName, campusName]);
  return (
    <Fragment>
      <Card className="rounded-none">
        <CardHeader>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <p className="text-small text-default-500">Campus</p>
              <p className="text-md">{statsData.campusName}</p>
            </div>
            <Divider orientation="vertical" />
            <div className="flex flex-col">
              <p className="text-small text-default-500">Building</p>
              <p className="text-md">{statsData.buildingName}</p>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-row gap-4">
            <Card className="basis-1/2 rounded-none shadow-sm border">
              <CardHeader>
                <div className="flex flex-col">
                  <p className="text-md">Access Points</p>
                  <p className="text-small text-default-500">Total</p>
                </div>
              </CardHeader>
              <CardBody>{statsData.accessPoints}</CardBody>
            </Card>
            <Card className="basis-1/2 rounded-none shadow-sm border">
              <CardHeader>
                <div className="flex flex-col">
                  <p className="text-md">Connected Clients</p>
                  <p className="text-small text-default-500">Total</p>
                </div>
              </CardHeader>
              <CardBody>{statsData.clientConnected}</CardBody>
            </Card>
          </div>

          {/* <div className="flex flex-col  mt-4">
          <p className="text-small text-default-500 mb-2">Change Floor</p>
          <FloorSelector />
        </div> */}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default BuildingStatsContainer;
