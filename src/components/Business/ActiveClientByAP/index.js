"use client";
import httpService from "@/utils/httpService";
import React, { useCallback, useContext, useEffect, useState } from "react";
import FilledLineChart from "../Charts/FilledLineChart";
import { Skeleton } from "@nextui-org/react";
import { AppContext } from "@/context/AppContext";
import { convertAPDetailsDataForGraph } from "@/utils/chartDataHelper";

const ActiveClientByAPContainer = () => {
  const { defaultLocation } = useContext(AppContext);
  const [apDetailsData, setAPDetailsData] = useState([]);
  const [chartData, setChartData] = useState();
  const [isLoading, setLoading] = useState(false);

  const getAPDetails = useCallback(async () => {
    const { campusName, buildingName, floorName } = defaultLocation;
    const location = `${campusName} > ${buildingName} > ${floorName}`;
    const res = await httpService.post("http://localhost:3000/api/apDetails", {
      body: {
        location: location,
      },
    });
    if (!res) {
      throw new Error("Failed to fetch data");
    }
    const { data } = res;
    setAPDetailsData(data);
    const chartData = convertAPDetailsDataForGraph(data);
    setChartData(chartData);
    setLoading(false);
  }, [defaultLocation]);

  useEffect(() => {
    setLoading(true);
    getAPDetails();
  }, [getAPDetails]);

  return (
    <div>
      {!isLoading && chartData && (
        <FilledLineChart
          labels={chartData.labels}
          datasets={chartData.datasets}
          name={`Active Client: ${defaultLocation.floorName}`}
          id="activeClient"
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

export default ActiveClientByAPContainer;
