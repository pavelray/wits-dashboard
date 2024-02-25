import { ClientSessionContext } from "@/context/ClientSessionContext";
import { convertClientSessionDataForGraph } from "@/utils/helperMethods";
import React, { useContext, useEffect, useState } from "react";
import FilledLineChart from "../../Charts/FilledLineChart";

const SessionActivityLineChart = () => {
  const [chartData, setChartData] = useState();
  const { clientSessionData } = useContext(ClientSessionContext);
  useEffect(() => {
    const chartData = convertClientSessionDataForGraph(clientSessionData);
    setChartData(chartData);
  }, [clientSessionData]);

  return (
    <div>
      {chartData && (
        <FilledLineChart
          labels={chartData.labels}
          datasets={chartData.datasets}
          name={`Client Activity Last Day`}
        />
      )}
    </div>
  );
};

export default SessionActivityLineChart;
