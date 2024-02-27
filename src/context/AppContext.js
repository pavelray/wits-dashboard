"use client";
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children, ...props }) => {
  const {
    campus,
    building,
    floor,
    outdoor,
    defaultCampusName,
    defaultBuildingName,
    defaultFloorName,
  } = props;

  const [defaultLocation, setDefaultLocation] = useState({
    campusName: defaultCampusName,
    buildingName: defaultBuildingName,
    floorName: defaultFloorName,
  });
  const [selectedLocation, setSelectedLocation] = useState();

  const appContext = {
    campus,
    building,
    floor,
    outdoor,
    defaultLocation,
    selectedLocation,
    setDefaultLocation,
    setSelectedLocation,
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
