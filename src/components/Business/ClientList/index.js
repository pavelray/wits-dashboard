"use client";
import ClientDetailsTable from "@/components/UI/Table/ClientDetailsTable";
import httpService from "@/utils/httpService";
import React, { Fragment, useCallback, useEffect, useState } from "react";

const ClientList = ({ locationPath }) => {
  const [isLoading, setLoading] = useState(false);
  const [clientListResponse, setClientListResponse] = useState();
  const getData = useCallback(async () => {
    const clientDetailsReq = locationPath.map((location) => {
      return httpService.post("http://localhost:3000/api/clientDetails", {
        body: {
          location: location,
        },
      });
    });
    setLoading(true);
    const clientDetailsResp = await Promise.allSettled(clientDetailsReq);
    setLoading(false);
    return clientDetailsResp.map((resp) => resp.value);
  }, [locationPath]);

  useEffect(() => {
    getData().then((response) => {
      if (process.env.NEXT_PUBLIC_IS_MOCK_ENABLED === true) {
        setClientListResponse([response[0]]);
      } else {
        setClientListResponse(response);
      }
    });
  }, [getData]);

  return (
    <div className="overflow-hidden overflow-x-scroll scroll-m-0">
      {isLoading && <h1>Loading Client Details </h1>}
      {!isLoading && (
        <div>
          {clientListResponse?.map((resp, i) => (
            <Fragment key={`${resp.data.location}_${i}`}>
              <div>
                <b>Table: {resp.data.location} </b>{" "}
              </div>
              <div>
                <b>Data Showing: {resp.data.clientList.length} / {resp.data.total}</b>
              </div>
              {!!resp.data.clientList.length && (
                <ClientDetailsTable clientList={resp.data.clientList} />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientList;
