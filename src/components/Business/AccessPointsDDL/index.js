import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

const AccessPointsSelect = ({ apList, building, campus }) => {
  const router = useRouter();
  const [selectedAPName, setSelectedAPName] = useState();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setSelectedAPName({
      [name]: value,
    });
  };

  const handleOnClick = () => {
    const apName = JSON.parse(selectedAPName.apName);
    const { macAddress, name } = apName;
    router.push(
      `/${campus}/${building}/${macAddress}`,
      `/${campus}/${building}/${name}?macAddress=${macAddress}`
    );
  };

  return (
    <div className="flex flex-row gap-4 items-center">
      {!!apList.length && (
        <Select
          items={apList}
          selectionMode="single"
          label="Access Points"
          placeholder="Select a Access Point to view details"
          className="max-w-xs rounded-none"
          //   defaultSelectedKeys={new Set([defaultLocation.floorName])}
          //   selectedKeys={new Set([defaultLocation.floorName])}
          name="apName"
          onChange={handleOnChange}
        >
          {({ accessPointDetailsDTO }) => (
            <SelectItem
              key={JSON.stringify({
                macAddress: accessPointDetailsDTO.macAddress.octets,
                name: accessPointDetailsDTO.name,
              })}
            >
              {accessPointDetailsDTO.name}
            </SelectItem>
          )}
        </Select>
      )}
      <Button
        variant="flat"
        color="success"
        type="button"
        onClick={handleOnClick}
        className="rounded-none"
      >
        View Details
      </Button>
    </div>
  );
};

export default AccessPointsSelect;
