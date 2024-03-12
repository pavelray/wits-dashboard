"use client";
import httpService from "@/utils/httpService";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import FilledLineChart from "../Charts/FilledLineChart";
import { Skeleton } from "@nextui-org/react";
import { AppContext } from "@/context/AppContext";
import { convertAPDetailsDataForGraph } from "@/utils/chartDataHelper";
import AccessPointsSelect from "../AccessPointsDDL";

const ActiveClientByAPContainer = ({
  buildingName,
  campusName,
  accessPointData,
}) => {
  const { chartData, apDetailsData } = accessPointData;

  return (
    <div>
      {chartData && (
        <Fragment>
          <AccessPointsSelect
            apList={apDetailsData.result}
            building={buildingName}
            campus={campusName}
          />
          <FilledLineChart
            labels={chartData.labels}
            datasets={chartData.datasets}
            name={`Active Client: ${buildingName}`}
            id="activeClient"
            xAxesTitle="Access Points"
            yAxesTitle="Clinet Count"
          />
        </Fragment>
      )}
    </div>
  );
};

export default ActiveClientByAPContainer;
