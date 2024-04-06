"use client";
import { AppContext } from "@/context/AppContext";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { Fragment, useContext } from "react";

const BuildingStatsContainer = ({ buildingName, campusName }) => {
  const { building } = useContext(AppContext);
  const selectedBuilding = building.find((b) => b.groupName === buildingName);
  const connectedClient = selectedBuilding.clientCount;
  const accessPoints = selectedBuilding.apCount;
 
  return (
    <Fragment>
      <Card className="rounded-none">
        <CardHeader>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <p className="text-small text-default-500">Campus</p>
              <p className="text-md">{campusName}</p>
            </div>
            <Divider orientation="vertical" />
            <div className="flex flex-col">
              <p className="text-small text-default-500">Building</p>
              <p className="text-md">{buildingName}</p>
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
              <CardBody>{accessPoints}</CardBody>
            </Card>
            <Card className="basis-1/2 rounded-none shadow-sm border">
              <CardHeader>
                <div className="flex flex-col">
                  <p className="text-md">Connected Clients</p>
                  <p className="text-small text-default-500">Total</p>
                </div>
              </CardHeader>
              <CardBody>{connectedClient}</CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default BuildingStatsContainer;
