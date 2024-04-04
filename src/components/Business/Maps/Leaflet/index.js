import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";
import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { findCenterCoordinates } from "@/utils/helperMethods";
import { Button } from "@nextui-org/react";
import { DEFAULT_HEAT_MAP_CONFIG } from "@/utils/constants";

const PlotHeatMaps = ({ points }) => {
  const map = useMap();
  useEffect(() => {
    L.heatLayer(points, DEFAULT_HEAT_MAP_CONFIG).addTo(map);
  }, [map, points]);
  return null;
};

const RecenterAutomatically = ({ center, zoom, points }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, map, points, zoom]);
  return null;
};

const Leaflet = ({ data, zoom, onPopupActionClick }) => {
  console.log(data, zoom);
  const { latitude, longitude } = findCenterCoordinates(data);
  const mapCenter = [latitude, longitude];
  const defaultIcon = L.icon({
    iconUrl: "../images/marker-icon.png",
    shadowUrl: "../images/marker-shadow.png",
  });

  const points = data
    ? data.map((p) => {
        return [p.latitude, p.longitude, p.clientCount];
      })
    : [];

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-full h-unit-8xl max-h-screen mb-6"
      fadeAnimation
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((d, index) => {
        const lat = d.latitude;
        const long = d.longitude;
        const campus = d.name.split("/").slice(2)[0];
        const building = d.name.split("/").slice(2)[1];

        return (
          <Marker
            position={[lat, long]}
            icon={defaultIcon}
            key={`key-${index}`}
          >
            <Popup>
              <div className="flex flex-col gap-0">
                <div className="text-small text-default-500 p-0 m-1">
                  Campus: {campus}
                </div>
                <div className="text-small text-default-500 p-0 m-1">
                  Building: {building}
                </div>
                <div className="text-small text-default-500 p-0 m-1">
                  Access Points: {d.apCount}
                </div>
              </div>
              {d.apCount > 0 && (
                <div>
                  <Button
                    color="success"
                    onClick={() => onPopupActionClick(campus, building)}
                  >
                    View Details
                  </Button>
                </div>
              )}
            </Popup>
          </Marker>
        );
      })}
      <PlotHeatMaps points={points} />
      <RecenterAutomatically center={mapCenter} zoom={zoom} />
    </MapContainer>
  );
};

Leaflet.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Leaflet;
