import ClientSessionTable from "@/components/UI/Table/ClientSessionTable";
import { ClientSessionContext } from "@/context/ClientSessionContext";
import { formatClientSessionData } from "@/utils/helperMethods";
import httpService from "@/utils/httpService";
import React, { useCallback, useContext, useEffect, useState } from "react";

const ClientSessionActivityComponent = ({ defaultLocation }) => {
  const { clientSessionData } = useContext(ClientSessionContext);
  console.log(clientSessionData);
  return (
    <div className="w-full flex-1">
      <h2>User Activity Table Last Day</h2>
      <ClientSessionTable data={clientSessionData} />
    </div>
  );
};

export default ClientSessionActivityComponent;
