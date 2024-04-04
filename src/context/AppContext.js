"use client";
import { createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children, ...props }) => {
  const { appProps } = props;
  const { CAMPUS, BUILDING, FLOORAREA, OUTDOORAREA, DEFAULT } = appProps;

  const appContext = {
    campus: CAMPUS,
    building: BUILDING,
    floor: FLOORAREA,
    outdoor: OUTDOORAREA,
    allLocation: DEFAULT,
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
