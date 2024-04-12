"use client";
import React, { useContext, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { AppContext } from "@/context/AppContext";

const LocationFilter = ({ handleLocationChange }) => {
  const { campus, building, floor, outdoor } = useContext(AppContext);
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloorOrOutdoor, setSelectedFloorOrOutdoor] = useState("");

  const [selectedCampusBulindings, setSelectedCampusBuildings] = useState([]);
  const [selectedFloorAndOutDoor, setSelectedFloorAndOutdoor] = useState([]);

  const handleOnCampusChange = (value) => {
    console.log(value);
    const campusBuildings = building.filter((b) => b.name.includes(value));
    setSelectedCampus(value);
    setSelectedCampusBuildings(campusBuildings);
    handleLocationChange({ campus: value });
  };

  const handleOnBuildingChange = (value) => {
    console.log(value);
    const buildingFloor = floor.filter((f) => f.name.includes(value));
    const buildingOutdoor = outdoor.filter((o) => o.name.includes(value));
    setSelectedBuilding(value);
    setSelectedFloorAndOutdoor([...buildingFloor, ...buildingOutdoor]);
    handleLocationChange({ building: value });
  };

  const handleOnBuildingAreaChange = (value) => {
    console.log(value);
    setSelectedFloorOrOutdoor(value);
    handleLocationChange({ buildingArea: value });
  };

  return (
    <div className="flex gap-2 mt-0 z-0">
      <Autocomplete
        defaultItems={campus}
        label="Select a campus"
        className="max-w-xs"
        size="sm"
        labelPlacement="outside"
        color="primary"
        selectedKey={selectedCampus}
        onSelectionChange={handleOnCampusChange}
        name="campus"
      >
        {(campus) => (
          <AutocompleteItem key={campus.groupName}>
            {campus.groupName}
          </AutocompleteItem>
        )}
      </Autocomplete>

      <Autocomplete
        defaultItems={selectedCampusBulindings}
        label="Select a Building"
        className="max-w-xs"
        size="sm"
        labelPlacement="outside"
        color="primary"
        selectedKey={selectedBuilding}
        onSelectionChange={handleOnBuildingChange}
        name="building"
      >
        {(building) => (
          <AutocompleteItem key={building.groupName}>
            {building.groupName}
          </AutocompleteItem>
        )}
      </Autocomplete>

      <Autocomplete
        defaultItems={selectedFloorAndOutDoor}
        label="Select a Building Area"
        className="max-w-xs"
        size="sm"
        labelPlacement="outside"
        color="primary"
        selectedKey={selectedFloorOrOutdoor}
        onSelectionChange={handleOnBuildingAreaChange}
        name="floor"
      >
        {(floor) => (
          <AutocompleteItem key={floor.groupName} textValue={floor.groupName}>
            <div className="flex gap-2 items-center">
              {floor.locationGroupType === "OUTDOORAREA" ? (
                <Icon icon="lucide:tree-deciduous" width="16" height="16" />
              ) : (
                <Icon icon="lucide:building" width="16" height="16" />
              )}
              {floor.groupName}
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default LocationFilter;
