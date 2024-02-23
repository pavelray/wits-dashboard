"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";

import { AppContext } from "@/context/AppContext";
import { getSelectedFloor, setLocationCookie } from "@/utils/helperMethods";

const LocationModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    campus,
    building,
    floor,
    outdoor,
    defaultLocation,
    selectedLocation,
    setDefaultLocation,
    setSelectedLocation,
  } = useContext(AppContext);

  const [saveAsDefault, setSaveAsDefault] = useState(false);

  const [campusBuildings, setCampusBuildings] = useState([]);

  useEffect(() => {
    const selectedCampusBuilding = building.filter(
      (build) =>
        build.name.includes(defaultLocation.campusName) && build.latitude
    );
    setCampusBuildings(selectedCampusBuilding);
  }, [building, defaultLocation.campusName]);

  const loadSelectedCampusBuildings = (campusName) => {
    const selectedCampusBuilding = building.filter(
      (building) => building.name.includes(campusName) && building.latitude
    );
    setCampusBuildings(selectedCampusBuilding);
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setSelectedLocation({
      ...selectedLocation,
      [name]: value,
    });
    if (name === "campusName") {
      loadSelectedCampusBuildings(value);
    }
  };

  const handleOnSaveDefault = () => {
    setSaveAsDefault(!saveAsDefault);
  };

  const handleOnLocationSave = () => {
    const { buildingName, campusName } = selectedLocation;
    if (saveAsDefault) {
      setLocationCookie(campusName, buildingName);
    }
    const defaultFloorName = getSelectedFloor(buildingName, floor, outdoor);
    setDefaultLocation({ ...selectedLocation, floorName: defaultFloorName });
    onClose();
  };

  return (
    <>
      {defaultLocation && (
        <Button color="success" onPress={onOpen} variant="ghost" radius="none">
          {defaultLocation.campusName} &gt; {defaultLocation.buildingName}
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Location
              </ModalHeader>
              <ModalBody>
                <Select
                  items={campus}
                  label="Campus"
                  placeholder="Select a campus"
                  className="max-w-xs"
                  defaultSelectedKeys={[defaultLocation.campusName]}
                  onChange={handleOnChange}
                  name="campusName"
                >
                  {(campus) => (
                    <SelectItem key={campus.groupName}>
                      {campus.groupName}
                    </SelectItem>
                  )}
                </Select>
                <Select
                  items={campusBuildings}
                  label="Buildings"
                  placeholder="Select a Building"
                  className="max-w-xs"
                  defaultSelectedKeys={[defaultLocation.buildingName]}
                  name="buildingName"
                  onChange={handleOnChange}
                >
                  {(building) => (
                    <SelectItem key={building.groupName}>
                      {building.groupName}
                    </SelectItem>
                  )}
                </Select>
                <div>
                  <Checkbox
                    value={saveAsDefault}
                    onChange={handleOnSaveDefault}
                  >
                    Save as default location
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleOnLocationSave}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LocationModal;
