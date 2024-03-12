import { generateRandomHexCodes } from "./helperMethods";

export const convertClientUsageDataForGraph = (clientSession) => {
  let labels = [];
  let dataReceived = [];
  let dataSent = [];

  clientSession?.forEach((session) => {
    const received = parseFloat(session.totalDataReceived);
    const sent = parseFloat(session.totalDataSent);
    labels.push(session.userName);
    dataReceived.push(received);
    dataSent.push(sent);
  });

  const backgroundColor = generateRandomHexCodes(dataSent.length);

  const datasets = [
    {
      data: dataReceived,
      label: "Downloaded (GB)",
      backgroundColor: backgroundColor,
    },
    {
      data: dataSent,
      label: "Uploaded (GB)",
      backgroundColor: backgroundColor,
    },
  ];

  return {
    labels,
    datasets,
  };
};

export const convertFrequencyDataForGraph = (data, labelName) => {
  console.log(data);
  const datesArr = Object.keys(data);
  let clientFrequencyByDate = [];
  let lablesArr = [];

  datesArr.forEach((date) => {
    const clientsByDate = Object?.groupBy(
      data[date],
      ({ clientSessionsDTO }) => clientSessionsDTO?.userName
    );
    const clientCount = Object?.keys(clientsByDate).length;
    clientFrequencyByDate.push({
      x: new Date(date).toISOString(),
      y: clientCount,
    });
    lablesArr.push(new Date(date).toISOString());
  });

  const datasets = [
    {
      data: clientFrequencyByDate,
      label: labelName,
      borderColor: "rgb(255, 205, 86)",
      backgroundColor: "rgb(255, 205, 86,0.5)",
      borderWidth: 2,
    },
  ];

  return {
    labels: lablesArr,
    datasets,
  };
};

export const convertClientSessionDataForGraph = (clientSession) => {
  let labels = [];
  let sessionDuration = [];

  clientSession?.forEach((session) => {
    const sessionValue = parseFloat(session.sessionDuration.split(" ")[0]);
    labels.push(session.userName);
    sessionDuration.push(sessionValue);
  });

  const datasets = [
    {
      data: sessionDuration,
      label: "Session Duration in Hrs",
      borderColor: "rgb(255, 205, 86)",
      backgroundColor: "rgb(255, 205, 86,0.5)",
      borderWidth: 2,
    },
  ];

  return {
    labels,
    datasets,
  };
};

export const convertAPDetailsDataForGraph = (apDetailsData) => {
  const { result } = apDetailsData;
  console.log(result);
  let labels = [];
  let totalCounts = [];
  let total2ghzCount = [];
  let total5ghzCount = [];

  result.forEach(({ accessPointDetailsDTO }) => {
    labels.push(accessPointDetailsDTO.name);
    totalCounts.push(accessPointDetailsDTO.clientCount);
    total2ghzCount.push(accessPointDetailsDTO.clientCount_2_4GHz);
    total5ghzCount.push(accessPointDetailsDTO.clientCount_5GHz);
  });

  const datasets = [
    {
      data: totalCounts,
      label: "Total Clients",
      borderColor: "rgb(109, 253, 181)",
      backgroundColor: "rgb(109, 253, 181,0.5)",
      borderWidth: 2,
    },
    {
      data: total2ghzCount,
      label: "2.4GHz",
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgb(75, 192, 192,0.5)",
      borderWidth: 2,
    },
    {
      data: total5ghzCount,
      label: "5GHz",
      borderColor: "rgb(255, 205, 86)",
      backgroundColor: "rgb(255, 205, 86,0.5)",
      borderWidth: 2,
    },
  ];

  return {
    labels,
    totalCounts,
    total2ghzCount,
    total5ghzCount,
    datasets,
  };
};
