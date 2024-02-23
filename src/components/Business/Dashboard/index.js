"use client";
import Dropdown from "@/components/UI/Dropdown";
import React, { Fragment, useContext, useState } from "react";
import Map from "../Maps";
import Table from "@/components/UI/Table";
import ClientList from "../ClientList";
import { AppContext } from "@/context/AppContext";

const Dashboad = () => {
  const {
    campus: CAMPUS,
    building: BUILDING,
    floor: FLOORAREA,
    outdoor: OUTDOORAREA,
    selectedLocation
  } = useContext(AppContext);

  console.log(selectedLocation);
  const [selectedCampus, setSelectedCampus] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState([]);
  const [ddlBuildingData, setDdlBuildingData] = useState([]);
  const [floorAndOutdoorData, setFloorAndOutdoorData] = useState([]);
  const [dataForClientDetails, setDataForClientDetails] = useState([]);
  const [mapData, setMapData] = useState([]);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    if (name === "campus") {
      const filteredBuildings = BUILDING.filter((b) => b.name.includes(value));
      const selectedCampusData = CAMPUS.filter((c) => c.groupName === value);
      const filteredBuildingsForMap = BUILDING.filter(
        (b) => b.name.includes(value) && b.latitude
      );
      setDdlBuildingData(filteredBuildings);
      setSelectedBuilding(filteredBuildings);
      setSelectedCampus(selectedCampusData);
      setMapData([...selectedCampusData, ...filteredBuildingsForMap]);
    }
    if (name === "building") {
      const selectedBuildingData = BUILDING.filter(
        (c) => c.groupName === value
      );
      const selectedBuildingDataForMap = BUILDING.filter(
        (c) => c.groupName === value && c.latitude
      );
      const filteredFloorsData = FLOORAREA.filter((b) =>
        b.name.includes(value)
      );
      const filteredOutdoorData = OUTDOORAREA.filter((b) =>
        b.name.includes(value)
      );
      const filteredFlooraAndOutdoorData = [
        ...filteredFloorsData,
        ...filteredOutdoorData,
      ];
      setSelectedBuilding(selectedBuildingData);
      setFloorAndOutdoorData(filteredFlooraAndOutdoorData);
      setMapData([...mapData, ...selectedBuildingDataForMap]);

      const clientLocationPath = filteredFlooraAndOutdoorData.map((d) => {
        const { name } = d;
        const formattedValue = name.split("/").splice(2).join(" > ");
        return formattedValue;
      });
      setDataForClientDetails(clientLocationPath);
    }
  };

  return (
    <Fragment>
      <section className="bg-white">
        <div className="flex justify-evenly p-5">
          <div className="flex flex-col">
            <Dropdown
              label="Campus"
              data={CAMPUS}
              value="groupName"
              text="groupName"
              disabled="latitude"
              onChange={onChangeHandler}
              name="campus"
            />
          </div>

          <div className="flex flex-col">
            <Dropdown
              label="Buildings"
              data={ddlBuildingData}
              value="groupName"
              text="groupName"
              disabled="latitude"
              onChange={onChangeHandler}
              name="building"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col grow w-screen p-4">
            {!!mapData.length && mapData && <Map mapData={mapData} />}
          </div>
          <div className="flex flex-col">
            <div className="flex justify-evenly">
              {!!selectedCampus.length && (
                <div className="flex flex-col">
                  <div className="m-4">
                    <Table title={`Campus Stats Data`} data={selectedCampus} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-evenly">
              {!!selectedBuilding.length && (
                <div className="flex flex-col">
                  <div className="m-4">
                    <Table
                      title={`Building Stats Data : Total (${selectedBuilding.length})`}
                      data={selectedBuilding}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-evenly">
              {!!floorAndOutdoorData.length && (
                <div className="flex flex-col">
                  <div className="m-4">
                    <Table
                      title={`Selected Buildings Stats Data : Total (${floorAndOutdoorData.length})`}
                      data={floorAndOutdoorData}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {!!dataForClientDetails.length && (
        <section>
          <ClientList locationPath={dataForClientDetails} />
        </section>
      )}
    </Fragment>
  );
};

export default Dashboad;
