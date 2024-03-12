import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AccessPointsSelect = ({ apList, building, campus }) => {
  const router = useRouter();
  console.log(apList);
  const [selectedAPName, setSelectedAPName] = useState();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSelectedAPName({
      [name]: value,
    });
  };

  const handleOnClick = () => {
    const apName = selectedAPName.apName;
    // redirect to the AP page to get details of the clients details based on the AP Name
    // Connected client details and historic client details.
    router.push(`/${campus}/${building}/${apName}`, undefined, {
      shallow: false,
    });
    console.log(selectedAPName);
  };

  return (
    <div>
      {!!apList.length && (
        <Select
          items={apList}
          selectionMode="single"
          label="Access Points"
          placeholder="Select a Access Point to view details"
          className="max-w-xs"
          //   defaultSelectedKeys={new Set([defaultLocation.floorName])}
          //   selectedKeys={new Set([defaultLocation.floorName])}
          name="apName"
          onChange={handleOnChange}
        >
          {({ accessPointDetailsDTO }) => (
            <SelectItem key={accessPointDetailsDTO.macAddress.octets}>
              {accessPointDetailsDTO.name}
            </SelectItem>
          )}
        </Select>
      )}
      <Button variant="flat" type="button" onClick={handleOnClick}>
        View Details
      </Button>
    </div>
  );
};

export default AccessPointsSelect;
