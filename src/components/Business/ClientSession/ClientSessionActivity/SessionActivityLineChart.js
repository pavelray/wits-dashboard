import { ClientSessionContext } from "@/context/ClientSessionContext";
import { convertClientFrequesncyDataForGraph, convertClientSessionDataForGraph } from "@/utils/helperMethods";
import React, { useContext, useEffect, useState } from "react";
import FilledLineChart from "../../Charts/FilledLineChart";
import { Skeleton } from "@nextui-org/react";

const SessionActivityLineChart = ({ clientSessionData, isLoading }) => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const chartData = convertClientFrequesncyDataForGraph(clientSessionData);
    setChartData(chartData);
  }, [clientSessionData]);

  return (
    <div>
      {!isLoading && chartData && (
        <FilledLineChart
          labels={chartData.labels}
          datasets={chartData.datasets}
          name={`Client Frequency`}
          id="clientSessionChart"
        />
      )}
      {isLoading && (
        <Skeleton className="rounded-lg mt-4">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      )}
    </div>
  );
};

export default SessionActivityLineChart;
