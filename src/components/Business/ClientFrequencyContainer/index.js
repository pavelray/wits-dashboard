"use client";

import { fortmatDataByFrequencyType } from "@/utils/clientDataTransformer";
import ClientFrequencyForm from "./ClientFrequencyForm";
import { getClientSession } from "@/utils/clientApiHelper";
import { useState } from "react";
import {
  convertFrequencyDataForGraph,
  convertFrequencyDataForGraphV2,
} from "@/utils/chartDataHelper";
import LineChart from "../Charts/LineChart";
import { groupBy } from "@/utils/helperMethods";

const ClientFrequencyContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState();

  const generateReport = async ({ dateRange, location, frequencyType }) => {
    setIsLoading(true);
    let locationStr = `${location.campus}`;
    if (location.building) {
      locationStr = `${locationStr} > ${location.building}`;
    }
    if (location.buildingArea) {
      locationStr = `${locationStr} > ${location.buildingArea}`;
    }
    const startDate = Date.parse(dateRange[0]);
    const endDate = Date.parse(dateRange[1]);
    const clientResponse = await getClientSession({
      location: locationStr,
      startDate,
      endDate,
    });
    const groupLevel = location.buildingArea ? "macAddress" : "buildingArea";
    const levelByData = groupBy(
      clientResponse.result,
      (obj) => obj[groupLevel]
    );
    console.log(levelByData);
    const datasets = [];

    Object.keys(levelByData).forEach((level) => {
      const dataByClientFrequencyType = fortmatDataByFrequencyType(
        levelByData[level],
        frequencyType
      );
      console.log(level, dataByClientFrequencyType);
      const { chartData } = convertFrequencyDataForGraphV2(
        dataByClientFrequencyType
      );
      console.log(level, chartData);
      datasets.push({
        data: chartData,
        label: level,
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgb(255, 205, 86,0.5)",
        borderWidth: 2,
      });
    });
    console.log(datasets);
    setChartData(datasets);
    setIsLoading(false);
  };

  return (
    <div>
      <ClientFrequencyForm submitForm={generateReport} isLoading={isLoading} />

      {!isLoading && chartData && (
        <LineChart
          labels={[]}
          datasets={chartData}
          name={`Client Frequency`}
          id="clientSessionChart"
        />
      )}
    </div>
  );
};

export default ClientFrequencyContainer;
