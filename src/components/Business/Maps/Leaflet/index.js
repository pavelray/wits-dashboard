import React, { useEffect, useId, useState } from "react";
import L from "leaflet";
import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { findCenterCoordinates } from "@/utils/helperMethods";

const RecenterAutomatically = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, map, zoom]);
  return null;
};

const Leaflet = ({ data, zoom }) => {
  const id = useId();
  // const mapCenter = [data[0].latitude, data[0].longitude];
  const {latitude, longitude} = findCenterCoordinates(data);
  const mapCenter = [latitude, longitude];
  const defaultIcon = L.icon({
    iconUrl: "../images/marker-icon.png",
    shadowUrl: "../images/marker-shadow.png",
  });

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-full h-full mb-6"
      fadeAnimation
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((d,index) => {
        const lat = d.latitude;
        const long = d.longitude;

        return (
          <Marker
            position={[lat, long]}
            icon={defaultIcon}
            key={`key-${index}`}
          >
            <Popup>
              <b>Name:</b> {d.name.split('/').slice(2).join(" > ").toUpperCase()}<br/>
              <b>Clinet Connected:</b> {d.clientCount} <br />
              <b>Access Points:</b> {d.apCount},
            </Popup>
          </Marker>
        );
      })}
      <RecenterAutomatically center={mapCenter} zoom={zoom} />
    </MapContainer>
  );
};

Leaflet.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Leaflet;
