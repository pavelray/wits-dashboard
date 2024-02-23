import {
  flattenObj,
  formatClientDetailsTableData,
} from "@/utils/helperMethods";
import React, { Fragment } from "react";

const ClientDetailsTable = ({ clientList }) => {
  const colNames = Object.keys(
    formatClientDetailsTableData(clientList[0]?.clientDetailsDTO)
  );
  return (
    <table className="max-w-full text-left text-sm font-light border">
      <thead className="border-b">
        <tr>
          {colNames.map((col) => (
            <th scope="col" className="px-6 py-4" key={`${col}-name`}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {clientList?.map((client, index) => {
          const { clientDetailsDTO } = client;
          const values = Object.values(
            formatClientDetailsTableData(clientDetailsDTO)
          );
          return (
            <tr key={`${index}-name`}>
              {values.map((val, i) => (
                <td className="px-6 py-4" key={`val_${i + 1}`}>
                  {val.toString()}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ClientDetailsTable;
