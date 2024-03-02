"use client";
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children, ...props }) => {
  const { appProps } = props;
  const {
    CAMPUS,
    BUILDING,
    FLOORAREA,
    OUTDOORAREA,
    campusName,
    buildingName,
    floorName,
  } = appProps;

  const [defaultLocation, setDefaultLocation] = useState({
    campusName,
    buildingName,
    floorName,
  });
  const [selectedLocation, setSelectedLocation] = useState();

  const appContext = {
    campus: CAMPUS,
    building: BUILDING,
    floor: FLOORAREA,
    outdoor: OUTDOORAREA,
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
