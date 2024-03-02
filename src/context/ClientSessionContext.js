"use client";
import { formatClientSessionData } from "@/utils/helperMethods";
import { createContext, useState } from "react";

const ClientSessionContext = createContext();

const ClientDataProvider = ({ children, ...props }) => {
  const { defaultLocation, clientSessionData } = props;
  const clientContext = {
    defaultLocation,
    clientSessionData,
  };

  return (
    <ClientSessionContext.Provider value={clientContext}>
      {children}
    </ClientSessionContext.Provider>
  );
};

export { ClientSessionContext, ClientDataProvider };
