"use client";
import React, { Fragment } from "react";
import FilledLineChart from "../Charts/FilledLineChart";
import AccessPointsSelect from "../AccessPointsDDL";
import Title from "@/components/UI/Heading/Title";

const ActiveClientByAPContainer = ({
  buildingName,
  campusName,
  accessPointData,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {accessPointData.map((data,i) => {
        const { chartData, apDetailsData, name } = data;
        return (
          <div key={`${name}_${i}`} className="mt-2 flex gap-2 flex-col">
            <Title text={`Active Client: ${name}`}></Title>
            <AccessPointsSelect
              apList={apDetailsData}
              building={buildingName}
              campus={campusName}
            />
            <FilledLineChart
              labels={chartData.labels}
              datasets={chartData.datasets}
              id={`activeClient_${name}`}
              xAxesTitle="Access Points"
              yAxesTitle="Client Count"
            />
            <hr/>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveClientByAPContainer;
