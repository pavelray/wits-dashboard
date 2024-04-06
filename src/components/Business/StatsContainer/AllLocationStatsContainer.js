import { AppContext } from "@/context/AppContext";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useContext } from "react";

const AllLocationStatsContainer = () => {
  const { allLocation } = useContext(AppContext);
  return (
    <div className="flex flex-col text-left">
      <div className="flex flex-row gap-2">
        <Card className="basis-1/2 rounded-none">
          <CardHeader className="flex gap-1">
            <div className="flex flex-col">
              <p className="text-md">Access Points</p>
              <p className="text-small text-default-500">Total</p>
            </div>
          </CardHeader>
          <CardBody> {allLocation[0].apCount.toLocaleString("en-US")}</CardBody>
        </Card>
        <Card className="basis-1/2 rounded-none">
          <CardHeader className="flex gap-1">
            <div className="flex flex-col">
              <p className="text-md">Clients Connected</p>
              <p className="text-small text-default-500">Total</p>
            </div>
          </CardHeader>
          <CardBody>
            {allLocation[0].clientCount.toLocaleString("en-US")}
          </CardBody>
        </Card>
        <Card className="basis-1/2 rounded-none">
          <CardHeader className="flex gap-1">
            <div className="flex flex-col">
              <p className="text-md">Device Connected</p>
              <p className="text-small text-default-500">Total</p>
            </div>
          </CardHeader>
          <CardBody>
            {allLocation[0].deviceCount.toLocaleString("en-US")}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AllLocationStatsContainer;
