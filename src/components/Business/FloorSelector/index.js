"use client";
import { AppContext } from "@/context/AppContext";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";

const FloorSelector = () => {
  const { defaultLocation, floor, outdoor, setDefaultLocation } =
    useContext(AppContext);
  const [floorData, setFloorData] = useState([]);

  useEffect(() => {
    const { buildingName } = defaultLocation;
    const selectedBuildingFloor = floor.filter((f) =>
      f.name.includes(buildingName)
    );
    const selectedBuildingOutdoor = outdoor.filter((o) =>
      o.name.includes(buildingName)
    );
    setFloorData([...selectedBuildingFloor, ...selectedBuildingOutdoor]);
  }, [defaultLocation, floor, outdoor]);

  const handleOnFloorChange = (e) => {
    const { name, value } = e.target;
    setDefaultLocation({
      ...defaultLocation,
      [name]: value,
    });
  };


  return (
    <div>
      {!!floorData.length && (
        <Select
          items={floorData}
          selectionMode="single"
          label="Floors & Outdoors"
          placeholder="Select a floor or outdoor"
          className="max-w-xs"
          defaultSelectedKeys={new Set([defaultLocation.floorName])}
          selectedKeys={new Set([defaultLocation.floorName])}
          name="floorName"
          onChange={handleOnFloorChange}
        >
          {(floor) => (
            <SelectItem key={floor.groupName}>{floor.groupName}</SelectItem>
          )}
        </Select>
      )}
    </div>
  );
};

export default FloorSelector;
