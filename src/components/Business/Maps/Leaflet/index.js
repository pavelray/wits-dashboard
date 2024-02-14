import React from "react";
import L from "leaflet";
import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Leaflet = ({ data, zoom }) => {
  let DefaultIcon = L.icon({
    iconUrl: "../images/marker-icon.png",
    shadowUrl: "../images/marker-shadow.png",
  });

  return (
    <MapContainer
      center={[data[0].latitude, data[0].longitude]}
      zoom={zoom}
      scrollWheelZoom={false}
      className="sm:w-full sm:h-96 mb-6"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data
        ?.filter((d) => d.latitude && d.longitude)
        .map((d) => {
          const lat = d.latitude;
          const long = d.longitude;
          return (
            <Marker position={[lat, long]} icon={DefaultIcon} key={d.index}>
              <Popup>
                Name: {d.name} <br /> Address: {d.locationAddress} <br />
                Clinet Connected: {d.clientCount} <br />
                Access Points: {d.apCount}
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

Leaflet.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Leaflet;
