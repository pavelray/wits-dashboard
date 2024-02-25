import { camelCaseToWord } from "@/utils/helperMethods";
import React from "react";

const ClientSessionTable = ({ data }) => {
  const colNames = Object.keys(data[0]);
  return (
    <table className="table-fixed w-full text-left text-sm font-light border break-words">
      <thead className="border-b">
        <tr>
          {colNames.map((col) => (
            <th scope="col" className="px-6 py-4" key={`${col}-name`}>
              {camelCaseToWord(col)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="">
        {data?.map((client, index) => {
          const values = Object.values(client);
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

export default ClientSessionTable;
