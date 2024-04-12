"use client";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { DateRangePicker } from "rsuite";
import { getDateRange } from "@/utils/helperMethods";
import {
  DATA_FREQUENCY,
  DATA_FREQUENCY_VALUES,
  DATE_RANGE_TYPES,
} from "@/utils/constants";

const RangeSelector = ({
  startDate,
  endDate,
  handleDateChange,
  handleOnChange,
}) => {
  const { afterToday } = DateRangePicker;
  const defaultFrequencyType = [DATA_FREQUENCY.HOUR];

  const [dateRange, setDateRange] = useState([startDate, endDate]);

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col">
        <label className="text-xs text-blue-800 mb-1">Select a date range</label>
        <DateRangePicker
          placeholder="Select Date Range"
          shouldDisableDate={afterToday()}
          value={dateRange}
          onChange={setDateRange}
          onOk={handleDateChange}
          className="z-10"
        />
      </div>
      <Select
        items={DATA_FREQUENCY_VALUES}
        selectionMode="single"
        label="Frequency"
        size="sm"
        labelPlacement="outside"
        color="primary"
        className="max-w-xs rounded-none"
        defaultSelectedKeys={defaultFrequencyType}
        name="dataFrequency"
        onChange={handleOnChange}
      >
        {(data) => <SelectItem key={data.key}>{data.value}</SelectItem>}
      </Select>
    </div>
  );
};

export default RangeSelector;
