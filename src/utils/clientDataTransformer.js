export const formatClientSessionData = ({ clientList }) => {
  let userSessionData = [];

  const users = Object.keys(clientList);

  users.forEach((user) => {
    let userSessionObj = {
      userName: user,
    };
    let totalSessionDuration = 0;
    let totalThroughput = 0;
    let totalBytesReceived = 0;
    let totalBytesSent = 0;

    clientList[user].forEach((session) => {
      const sessionEndTime =
        session.clientSessionsDTO.sessionEndTime > Date.now()
          ? Date.now()
          : session.clientSessionsDTO.sessionEndTime;
      const sessionStartTime = session.clientSessionsDTO.sessionStartTime;
      const sessionDuration = sessionEndTime - sessionStartTime;
      totalSessionDuration += sessionDuration;
      totalThroughput += session.clientSessionsDTO.throughput;
      totalBytesReceived += session.clientSessionsDTO.bytesReceived;
      totalBytesSent += session.clientSessionsDTO.bytesSent;

      userSessionObj = {
        ...userSessionObj,
        ssid: session.clientSessionsDTO.ssid,
        totalDataReceived: bytesToGB(totalBytesReceived),
        totalDataSent: bytesToGB(totalBytesSent),
        totalThroughput,
      };
    });

    const sessionDurationInHours = millisecondsToHours(totalSessionDuration);
    userSessionData.push({
      ...userSessionObj,
      sessionDuration: sessionDurationInHours,
    });
  });

  return userSessionData;
};

export const formatClientDetailsTableData = (data) => {
  const formattedObj = {
    clientUserName: "Session Data",
    clientIpAddress: data.ipAddress?.address || "",
    clientMacAddress: data.macAddress.octets.match(/.{2}/g).join(":"),
    assotiationTime: formatDate(data.associationTime),
    vendor: data.vendor,
    apName: data.apName,
    radioType: "",
    deviceName: data.deviceName,
    mapLocation: data.location,
    ssid: data.ssid,
    profile: "Session Data",
    vlanId: data.vlan,
    protocol: data.protocol,
    sessionDuration: "Session Data",
    policyType: data.policyType,
    averageSessionThroughPut: "Session Data",
    hostName: "",
    clientType: data.wiredClientType,
    localUnique: "",
    globalUnique: "",
    linkLocal: "",
    speed: data.speed,
    endPointType: "",
    ccx: data.ccxVersion,
    apMacAddress: data.apMacAddress.octets.match(/.{2}/g).join(":"),
    apIpAddress: data.apIpAddress.address,
    deviceIpAddress: data.deviceIpAddress.address,
    controllerPort: "",
    anchorController: "",
    mobilityOracle: "",
    mobilityController: "",
    anchorMobilityController: "",
    switchPeerGroup: "",
    assotiationId: "",
    disassotiationTime: "",
    encryptionCipher: data.encryptionCypher,
    eapType: data.eapType,
    webSecurity: data.webSecurity,
    authenticationAlog: data.authenticationAlgorithm,
    byteSent: "Session Data",
    byteReceived: "Session Data",
    packetSent: "Session Data",
    packetReceived: "Session Data",
    snrDB: "Session Data",
    rssiDB: "Session Data",
    status: data.status,
    reason: "",
    e2e: "",
    dataRetries: "",
    rtsRetries: "",
    mobilityStatus: data.mobilityStatus,
    networkAccess: "",
    pmipState: "",
    pmipConnectedInterface: "",
    homeAddress: "",
    accessTechnologyType: "",
    localLinkIdentifier: "",
    sessionId: "",
    lma: "",
    interfaceName: data.clientInterface,
  };

  return formattedObj;
};

export const getClinetCountByDate = (data) => {
  const datesArr = Object.keys(data);
  let result = [];

  datesArr.forEach((date) => {
    const clientsByDate = Object.groupBy(
      data[date],
      ({ clientSessionsDTO }) => clientSessionsDTO?.userName
    );
    const clientCount = Object.keys(clientsByDate).length;
    result.push({ date: new Date(date).toISOString(), count: clientCount });
  });

  return result;
};
