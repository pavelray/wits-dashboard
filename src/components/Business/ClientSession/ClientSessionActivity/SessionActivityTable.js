import Title from "@/components/UI/Heading/Title";
import ClientSessionTable from "@/components/UI/Table/ClientSessionTable";
import { Skeleton } from "@nextui-org/react";
import React from "react";

const SessionActivityTable = ({ clientSessionData, isLoading }) => {
  return (
    <div className="w-full flex-1">
      <Title text="User Activity Table Last Day"/>
      {!isLoading && !!clientSessionData?.length && (
        <ClientSessionTable data={clientSessionData} />
      )}
      {isLoading && (
        <Skeleton className="rounded-lg mt-4">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      )}
    </div>
  );
};

export default SessionActivityTable;
