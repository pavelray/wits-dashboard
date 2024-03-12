"use client";
import { MAP_TYPE } from "@/utils/constants";
import React from "react";
import GoogleMap from "./Google";
import Mapbox from "./Mapbox";
import dynamic from "next/dynamic";

const DynamicLeafletMap = dynamic(() => import("./Leaflet"), { ssr: false });

const Map = ({
  onPopupActionClick,
  type = MAP_TYPE.LEAFLET,
  mapData,
  zoom = 14,
}) => {
  return (
    <div className="z-10 h-full">
      {type === MAP_TYPE.GOOGLE && <GoogleMap data={mapData} zoom={zoom} />}
      {type === MAP_TYPE.LEAFLET && (
        <DynamicLeafletMap
          data={mapData}
          zoom={zoom}
          onPopupActionClick={onPopupActionClick}
        />
      )}
      {type === MAP_TYPE.MAPBOX && <Mapbox data={mapData} zoom={zoom} />}
    </div>
  );
};

export default Map;
