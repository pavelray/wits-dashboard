"use client";
import { Card, CardBody } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import Map from "../Maps";
import { AppContext } from "@/context/AppContext";

const MapContainer = () => {
  const { defaultLocation, campus, building } =
    useContext(AppContext);
  const [mapData, setMapData] = useState([]);
  const [zoom, setZoom ] = useState(14);

  useEffect(() => {
    const { campusName } = defaultLocation;
    const selectedCampusData = campus.filter(
      (c) => c.groupName === campusName && c.latitude
    );
    const campusBuildings = building.filter(
      (b) => b.name.includes(campusName) && b.latitude
    );
    setMapData([...selectedCampusData, ...campusBuildings]);
    setZoom(16);
  }, [building, campus, defaultLocation]);

  return (
    <Card className="rounded-none min-h-unit-96 h-full">
      <CardBody>
        <h1 className="mx-4 font-bold">{defaultLocation.campusName} - Buildings (Total: {mapData?.length})</h1>
        {!!mapData.length && mapData && <Map mapData={mapData} zoom={zoom} />}
      </CardBody>
    </Card>
  );
};

export default MapContainer;
