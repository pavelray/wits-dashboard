"use client";
import React, { Fragment, useState } from "react";
import ClientFrequencyLineChart from "./ClientFrequencyLineChart";
import { getDateRange } from "@/utils/helperMethods";
import { getClientSession } from "@/utils/clientApiHelper";
import { Select, SelectItem } from "@nextui-org/react";
import { DateRangePicker } from "rsuite";

import {
  DATA_FREQUENCY,
  DATA_FREQUENCY_VALUES,
  DATE_RANGE_TYPES,
} from "@/utils/constants";
import { fortmatDataByFrequencyType } from "@/utils/clientDataTransformer";

const ClientSessionContainer = ({
  clientSessionData,
  campusName,
  buildingName,
  apName,
}) => {
  const { startDate, endDate } = getDateRange(DATE_RANGE_TYPES.LAST_WEEK);
  const { afterToday } = DateRangePicker;
  const defaultFrequencyType = [DATA_FREQUENCY.HOUR];

  const dataByClientFrequencyType = fortmatDataByFrequencyType(
    clientSessionData.result,
    defaultFrequencyType[0]
  );

  const [dateRange, setDateRange] = useState([startDate, endDate]);
  const [dataFrequencyType, setDataFrequencyType] =
    useState(defaultFrequencyType);
  const [sessionData, setSessionData] = useState(dataByClientFrequencyType);
  const [isLoading, setIsLoading] = useState(false);

  const getClientSessionData = async (selectedDate, frequencyType) => {
    const startDate = Date.parse(selectedDate[0]);
    const endDate = Date.parse(selectedDate[1]);
    const clientResponse = await getClientSession({
      campusName,
      buildingName,
      apName,
      startDate,
      endDate,
    });
    const dataByClientFrequencyType = fortmatDataByFrequencyType(
      clientResponse.result,
      frequencyType
    );
    setDataFrequencyType([frequencyType]);
    setSessionData(dataByClientFrequencyType);
    setIsLoading(false);
  };

  const handleDateChange = async (selectedDate) => {
    setIsLoading(true);
    await getClientSessionData(selectedDate, dataFrequencyType[0]);
  };

  const handleOnChange = async (event) => {
    setIsLoading(true);
    const { value } = event.target;
    setDataFrequencyType([value]);
    await getClientSessionData(dateRange, value);
  };

  return (
    <Fragment>
      <div className="bg-white p-4 mt-4">
        <div className="flex flex-row gap-4">
          <DateRangePicker
            placeholder="Select Date Range"
            shouldDisableDate={afterToday()}
            value={dateRange}
            onChange={setDateRange}
            onOk={handleDateChange}
          />
          <Select
            items={DATA_FREQUENCY_VALUES}
            selectionMode="single"
            label="Frequency"
            className="max-w-xs rounded-none"
            defaultSelectedKeys={dataFrequencyType}
            name="dataFrequency"
            onChange={handleOnChange}
          >
            {(data) => <SelectItem key={data.key}>{data.value}</SelectItem>}
          </Select>
        </div>

        <ClientFrequencyLineChart
          clientSessionData={sessionData}
          isLoading={isLoading}
        />
      </div>
    </Fragment>
  );
};

export default ClientSessionContainer;
