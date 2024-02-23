import React from "react";

const Table = ({ data, title }) => {
  return (
    <table className="max-w-full text-left text-sm font-light border">
      <caption className="caption-top text-left text-md font-bold">
        {title}
      </caption>
      <thead className="border-b">
        <tr>
          <th scope="col" className="px-6 py-4">
            Group Id
          </th>
          <th scope="col" className="px-6 py-4">
            Group Name
          </th>
          <th scope="col" className="px-6 py-4">
            AP Count
          </th>
          <th scope="col" className="px-6 py-4">
            Client Count
          </th>
          <th scope="col" className="px-6 py-4">
            Cleared Alarms
          </th>
          <th scope="col" className="px-6 py-4">
            Critical Alarms
          </th>
          <th scope="col" className="px-6 py-4">
            Major Alarms
          </th>
          <th scope="col" className="px-6 py-4">
            Minor Alarms
          </th>
          <th scope="col" className="px-6 py-4">
            Warning Alarms
          </th>
          <th scope="col" className="px-6 py-4">
            Lat & Lang
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((c) => (
          <tr key={c.groupId}>
            <td className="px-6 py-4">{c.groupId}</td>
            <td className="px-6 py-4">{c.groupName}</td>
            <td className="px-6 py-4">{c.apCount}</td>
            <td className="px-6 py-4">{c.clientCount}</td>
            <td className="px-6 py-4">{c.clearedAlarms}</td>
            <td className="px-6 py-4">{c.criticalAlarms}</td>
            <td className="px-6 py-4">{c.majorAlarms}</td>
            <td className="px-6 py-4">{c.minorAlarms}</td>
            <td className="px-6 py-4">{c.warningAlarms}</td>
            <td className="px-6 py-4">
              {c.latitude} , {c.longitude}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
