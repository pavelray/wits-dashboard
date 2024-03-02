import React, { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { convertFrequencyDataForGraph } from "@/utils/chartDataHelper";
import LineChart from "../../Charts/LineChart";

const ClientFrequencyLineChart = ({ clientSessionData, isLoading }) => {
  const [chartData, setChartData] = useState();
  const { result: clientFrequencyDetails } = clientSessionData;

  useEffect(() => {
    const chartData = convertFrequencyDataForGraph(
      clientFrequencyDetails,
      "Client Count"
    );
    setChartData(chartData);
  }, [clientFrequencyDetails]);

  return (
    <div>
      {!isLoading && chartData && (
        <LineChart
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

export default ClientFrequencyLineChart;
