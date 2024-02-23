import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGF2ZWxyYXkiLCJhIjoiY2xzYm0yankwMDNjNjJtbWhlYmlrYTFpMyJ9.BmPoZvaiyeVe1VueOaAolw";

const Mapbox = ({ data }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  
  // const [lng, setLng] = useState(-103.5917);
  // const [lat, setLat] = useState(40.6699);
  // const [zoom, setZoom] = useState(3);

  const geoDataForMap = {
    features: [],
    type: "FeatureCollection",
  };
  data?.forEach((site) => {
    const feature = {
      type: "Feature",
      properties: {
        apCount: site.apCount,
        clientCount: site.clientCount,
        groupName: site.groupName,
        locationAddress: site.locationAddress,
        name: site.name,
      },
      geometry: {
        type: "Point",
        coordinates: [site.longitude, site.latitude],
      },
    };
    geoDataForMap.features.push(feature);
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [
        geoDataForMap.features[0].geometry.coordinates[0],
        geoDataForMap.features[0].geometry.coordinates[1],
      ],
      zoom: 14,
    });
    // Add our navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      // Nifty code to force map to fit inside container when it loads
      map.current.resize();

      map.current.addSource("earthquakes", {
        type: "geojson",
        // Use a URL for the value for the `data` property.
        data: geoDataForMap,
      });

      map.current.addLayer(
        {
          id: "earthquakes-heat",
          type: "heatmap",
          source: "earthquakes",
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "clientCount"],
              0,
              0,
              6,
              1,
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3,
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(33,102,172,0)",
              0.2,
              "rgb(103,169,207)",
              0.4,
              "rgb(209,229,240)",
              0.6,
              "rgb(253,219,199)",
              0.8,
              "rgb(239,138,98)",
              1,
              "rgb(178,24,43)",
            ],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20,
            ],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              1,
              9,
              0,
            ],
          },
        },
        "waterway-label"
      );
      map.current.addLayer(
        {
          id: "earthquakes-layer",
          type: "circle",
          source: "earthquakes",
          minzoom: 7,
          paint: {
            // Color circle by earthquake magnitude
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "clientCount"],
              5,
              "rgba(255,243,59,1)",
              10,
              "rgb(253,199,12)",
              50,
              "rgb(243,144,63)",
              100,
              "rgb(237,104,60)",
              300,
              "rgb(233,62,58)",
              500,
              "rgb(178,24,43)",
            ],
            "circle-stroke-color": "black",
            "circle-stroke-width": 1,
          },
        },
        "waterway-label"
      );
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: true,
    });

    // Here's on Popup window code
    // When the cursor moves over the earthquake layer
    map.current.on("click", "earthquakes-layer", (e) => {
      // Change the cursor style as a UI indicator.
      map.current.getCanvas().style.cursor = "pointer";

      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties;

      // build our popup html with our geoJSON properties
      const popupHtml = `<strong>Name: </strong>${properties.name}<br><strong>Total Access Points: </strong>${properties.apCount}<br><strong>Client Connected: </strong>${properties.clientCount}<br><strong>Address: </strong>${properties.locationAddress}`;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(popupHtml).addTo(map.current);
    });
    map.current.on("mouseenter", "earthquakes-layer", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });
    map.current.on("mouseleave", "earthquakes-layer", () => {
      map.current.getCanvas().style.cursor = "";
      // popup.remove();
    });
  }, [geoDataForMap]);
  return <div ref={mapContainer} className="sm:w-full sm:h-96 mb-6" />;
};

export default Mapbox;
