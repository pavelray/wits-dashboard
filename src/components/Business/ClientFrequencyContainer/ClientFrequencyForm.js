"use client";
import { useState } from "react";
import LocationFilter from "./LocationFilter";
import RangeSelector from "./RangeSelector";
import { getDateRange } from "@/utils/helperMethods";
import { DATA_FREQUENCY, DATE_RANGE_TYPES } from "@/utils/constants";

import { Button } from "@nextui-org/react";

const ClientFrequencyForm = ({ submitForm, isLoading }) => {
  const { startDate, endDate } = getDateRange(DATE_RANGE_TYPES.LAST_WEEK);

  const [location, setLocation] = useState({
    campus: "",
    building: "",
    buildingArea: "",
  });
  const [dateRange, setDateRange] = useState([startDate, endDate]);
  const [frequencyType, setFrequencyType] = useState(DATA_FREQUENCY.HOUR);

  const handleOnFrequencyChange = (event) => {
    const { value } = event.target;
    setFrequencyType(value);
  };

  const handleDateChange = (value) => {
    setDateRange(value);
  };

  const handleLocationChange = (locationObj) => {
    setLocation({ ...location, ...locationObj });
  };

  const onButtonClick = () => {
    console.log("dateRange", dateRange);
    console.log("locationObj", location);
    console.log("frequencyType", frequencyType);
    submitForm({ dateRange, location, frequencyType });
  };

  return (
    <div className="bg-white p-4 flex flex-col gap-4">
      <RangeSelector
        handleDateChange={handleDateChange}
        handleOnChange={handleOnFrequencyChange}
        startDate={startDate}
        endDate={endDate}
      />
      <LocationFilter handleLocationChange={handleLocationChange} />
      <div>
        <Button color="primary" isLoading={isLoading} onClick={onButtonClick}>
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default ClientFrequencyForm;
