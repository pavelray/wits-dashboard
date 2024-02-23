"use client";
import { Card, CardBody } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import Map from "../Maps";
import { AppContext } from "@/context/AppContext";

const MapContainer = () => {
  const { defaultLocation, selectedLocation, campus, building } =
    useContext(AppContext);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const { campusName } = defaultLocation;
    const selectedCampusData = campus.filter(
      (c) => c.groupName === campusName && c.latitude
    );
    const campusBuildings = building.filter(
      (b) => b.name.includes(campusName) && b.latitude
    );
    setMapData([...selectedCampusData, ...campusBuildings]);
  }, [building, campus, defaultLocation]);

  return (
    <Card className="rounded-none">
      <CardBody>
        <h1>Campus and Buildings</h1>
        {!!mapData.length && mapData && <Map mapData={mapData} />}
      </CardBody>
    </Card>
  );
};

export default MapContainer;
