import React, { useEffect, useState } from "react";
import DoughnutChart from "../../Charts/DoughnutChart";
import { Skeleton } from "@nextui-org/react";
import { convertClientUsageDataForGraph } from "@/utils/helperMethods";

const ClientDataUsageChart = ({ clientSessionData, isLoading }) => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const chartData = convertClientUsageDataForGraph(clientSessionData);
    setChartData(chartData);
  }, [clientSessionData]);

  return (
    <div>
      {!isLoading && chartData && (
        <DoughnutChart
          labels={chartData.labels}
          datasets={chartData.datasets}
          name={`Data Usage Last Day`}
          id="clientUsageChart"
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

export default ClientDataUsageChart;
