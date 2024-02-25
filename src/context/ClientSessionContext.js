"use client";
import { formatClientSessionData } from "@/utils/helperMethods";
import { createContext, useState } from "react";

const ClientSessionContext = createContext();

const ClientSessionProvider = ({ children, ...props }) => {
  const { defaultLocation, clientSessionData } = props;
  const formattedDataResponse = formatClientSessionData(clientSessionData);
  const clientContext = {
    defaultLocation,
    clientSessionData: formattedDataResponse,
  };

  return (
    <ClientSessionContext.Provider value={clientContext}>
      {children}
    </ClientSessionContext.Provider>
  );
};

export { ClientSessionContext, ClientSessionProvider };
