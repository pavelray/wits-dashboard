"use client";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import Map from "../Maps";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";


const MapContainer = () => {
  const router = useRouter();
  const { campus, building } = useContext(AppContext);
  const [mapData, setMapData] = useState([]);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    const campusBuildings = building.filter((b) => b.latitude); // Showing all the buildings on the map
    setMapData([...campusBuildings]);
    setZoom(16);
  }, [building, campus]);

  const handlePopupAction = (campus, building) => {
    console.log(campus, building);
    router.push(`/${campus}/${building}`);
  };

  return (
    <Card className="rounded-none min-h-unit-96 h-full">
      <CardHeader>
        <div className="flex flex-col">
          <p className="text-small text-default-500">
            Total Buildings: {mapData?.length}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {!!mapData.length && mapData && (
          <Map
            mapData={mapData}
            zoom={zoom}
            onPopupActionClick={handlePopupAction}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default MapContainer;
