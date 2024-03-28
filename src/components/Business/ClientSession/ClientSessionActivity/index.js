"use client";
import { ClientSessionContext } from "@/context/ClientSessionContext";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ClientFrequencyLineChart from "./ClientFrequencyLineChart";
import SessionActivityTable from "./SessionActivityTable";
import { formatClientSessionData, getDateRange } from "@/utils/helperMethods";

import { AppContext } from "@/context/AppContext";
import ClientDataUsageChart from "./ClientDataUsageChart";
import { getClientFrequency, getClientSession } from "@/utils/clientApiHelper";
import { Select, SelectItem } from "@nextui-org/react";
import { DateRangePicker } from "rsuite";
import {
  DATA_FREQUENCY,
  DATA_FREQUENCY_VALUES,
  DATE_RANGE_TYPES,
  DEFAULT_DATE_RANGE,
} from "@/utils/constants";
import { format } from "date-fns";

const ClientSessionContainer = ({
  clientSessionData,
  campusName,
  buildingName,
  apName,
}) => {
  const { startDate, endDate } = getDateRange(DATE_RANGE_TYPES.LAST_WEEK);
  const { afterToday } = DateRangePicker;
  console.log(clientSessionData);

  const [dateRange, setDateRange] = useState([startDate, endDate]);
  const [sessionData, setSessionData] = useState(clientSessionData);
  const [isLoading, setIsLoading] = useState(false);

  const getClientSessionData = async (selectedDate) => {
    const startDate = Date.parse(selectedDate[0]);
    const endDate = Date.parse(selectedDate[1]);
    const clientResponse = await getClientSession({
      campusName,
      buildingName,
      apName,
      startDate,
      endDate,
    });

    setSessionData(clientResponse);
    setIsLoading(false);
  };

  const handleDateChange = async (selectedDate) => {
    setIsLoading(true);
    await getClientSessionData(selectedDate);
  };

  const handleOnChange = () => {

  }

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
            defaultSelectedKeys={[DATA_FREQUENCY.HOUR]}
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

      {/* <div className="basis-1/2">
        <div className="bg-white p-4">
          <ClientDataUsageChart
            clientSessionData={sessionData}
            isLoading={isLoading}
          />
          <SessionActivityTable
            clientSessionData={sessionData}
            isLoading={isLoading}
          />
        </div>
      </div> */}
    </Fragment>
  );
};

export default ClientSessionContainer;
