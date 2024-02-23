"use client";
import { AppContext } from "@/context/AppContext";
import { convertAPDetailsDataForGraph } from "@/utils/helperMethods";
import httpService from "@/utils/httpService";
import React, { useCallback, useContext, useEffect, useState } from "react";
import FilledLineChart from "../Charts/FilledLineChart";

const ActiveClientByAPContainer = ({ defaultLocation }) => {
  const [apDetailsData, setAPDetailsData] = useState([]);
  const [chartData, setChartData] = useState();
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
  }, [defaultLocation]);

  useEffect(() => {
    getAPDetails();
  }, [getAPDetails]);

  return (
    <div>
      {chartData && (
        <FilledLineChart
          labels={chartData.labels}
          datasets={chartData.datasets}
          name={`Connected Clients of floor: ${defaultLocation.floorName}`}
        />
      )}
    </div>
  );
};

export default ActiveClientByAPContainer;
