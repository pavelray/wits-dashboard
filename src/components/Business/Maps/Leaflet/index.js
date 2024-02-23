import React, { useEffect, useId, useState } from "react";
import L from "leaflet";
import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RecenterAutomatically = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, map, zoom]);
  return null;
};

const Leaflet = ({ data, zoom }) => {
  const id = useId();
  const mapCenter = [data[0].latitude, data[0].longitude];
  const defaultIcon = L.icon({
    iconUrl: "../images/marker-icon.png",
    shadowUrl: "../images/marker-shadow.png",
  });

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      className="sm:w-full sm:h-96 mb-6"
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
              Name: {d.name} <br /> Address: {d.locationAddress} <br />
              Clinet Connected: {d.clientCount} <br />
              Access Points: {d.apCount},
              id: {d.groupId}
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
