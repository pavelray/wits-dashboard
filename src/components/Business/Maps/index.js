"use client";
import { MAP_TYPE } from "@/utils/constants";
import React from "react";
import GoogleMap from "./Google";
import Leaflet from "./Leaflet";
import Mapbox from "./Mapbox";

const Map = ({ type = MAP_TYPE.LEAFLET, mapData, zoom = 14 }) => {
  console.log(mapData);
  return (
    <div className="flex p-10">
      {type === MAP_TYPE.GOOGLE && <GoogleMap data={mapData} zoom={zoom} />}
      {type === MAP_TYPE.LEAFLET && <Leaflet data={mapData} zoom={zoom} />}
      {type === MAP_TYPE.MAPBOX && <Mapbox data={mapData} zoom={zoom} />}
    </div>
  );
};

export default Map;
