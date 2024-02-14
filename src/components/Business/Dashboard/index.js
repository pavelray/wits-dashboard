"use client";
import Dropdown from "@/components/UI/Dropdown";
import React, { useState } from "react";
import Map from "../Maps";

const Dashboad = ({ data }) => {
  const { CAMPUS, BUILDING } = data;
  const [selectedCampus, setSelectedCampus] = useState([]);
  const [selectedBuildings, setSelectedBuildings] = useState([]);
  const [mapData, setMapData] = useState([]);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    if (name === "campus") {
      const filteredBuildings = BUILDING.filter((b) => b.name.includes(value));
      const selectedCampusData = CAMPUS.filter((c) => c.groupName === value);
      const filteredBuildingsForMap = BUILDING.filter(
        (b) => b.name.includes(value) && b.latitude
      );
      setSelectedBuildings(filteredBuildings);
      setSelectedCampus(selectedCampusData);
      setMapData([...selectedCampusData, ...filteredBuildingsForMap]);
    }
    if (name === "building") {
      const selectedBuildingData = BUILDING.filter(
        (c) => c.groupName === value
      );
      const selectedBuildingDataForMap = BUILDING.filter(
        (c) => c.groupName === value && b.latitude
      );
      setSelectedBuildings(selectedBuildingData);
      setMapData([...mapData, ...selectedBuildingDataForMap]);
    }
  };

  return (
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
            data={selectedBuildings}
            value="groupName"
            text="groupName"
            disabled="latitude"
            onChange={onChangeHandler}
            name="building"
          />
        </div>
      </div>
      <div className="flex justify-evenly p-5">
        {!!selectedCampus.length && (
          <div className="p-5 flex flex-col">
            <div className="m-4">
              <table className="min-w-full text-left text-sm font-light border">
                <caption className="caption-top text-left text-md font-bold">
                  Campus Stats Data
                </caption>
                <thead className="border-b">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      Group Name
                    </th>
                    <th scope="col" class="px-6 py-4">
                      AP Count
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Client Count
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Cleared Alarms
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Critical Alarms
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Major Alarms
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Minor Alarms
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Warning Alarms
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Lat & Lang
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCampus?.map((c) => (
                    <tr key={c.groupId}>
                      <td class="px-6 py-4">{c.groupName}</td>
                      <td class="px-6 py-4">{c.apCount}</td>
                      <td class="px-6 py-4">{c.clientCount}</td>
                      <td class="px-6 py-4">{c.clearedAlarms}</td>
                      <td class="px-6 py-4">{c.criticalAlarms}</td>
                      <td class="px-6 py-4">{c.majorAlarms}</td>
                      <td class="px-6 py-4">{c.minorAlarms}</td>
                      <td class="px-6 py-4">{c.warningAlarms}</td>
                      <td class="px-6 py-4">
                        {c.latitude} , {c.longitude}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-5">
        {!!selectedBuildings.length && (
          <div className="p-5 flex flex-col">
            <div className="m-4">
              <table className="min-w-full text-left text-sm font-light border">
                <caption className="caption-top text-left text-md font-bold">
                  Building Stats Data : Total ({selectedBuildings.length})
                </caption>
                <thead className="border-b">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      Group Id Count
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Group Name
                    </th>
                    <th scope="col" class="px-6 py-4">
                      AP Count
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Client Count
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Cleared Alarms
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Critical Alarms
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Major Alarms
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Minor Alarms
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Warning Alarms
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Lat & Lang
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBuildings?.map((c) => (
                    <tr key={c.groupId}>
                      <td class="px-6 py-4">{c.groupId}</td>
                      <td class="px-6 py-4">{c.groupName}</td>
                      <td class="px-6 py-4">{c.apCount}</td>
                      <td class="px-6 py-4">{c.clientCount}</td>
                      <td class="px-6 py-4">{c.clearedAlarms}</td>
                      <td class="px-6 py-4">{c.criticalAlarms}</td>
                      <td class="px-6 py-4">{c.majorAlarms}</td>
                      <td class="px-6 py-4">{c.minorAlarms}</td>
                      <td class="px-6 py-4">{c.warningAlarms}</td>
                      <td class="px-6 py-4">
                        {c.latitude} , {c.longitude}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {!!mapData.length && mapData && <Map mapData={mapData} />}
    </section>
  );
};

export default Dashboad;
