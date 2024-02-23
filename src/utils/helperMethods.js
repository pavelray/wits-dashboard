import { COOKIE_NAMES } from "./constants";

export const flattenObj = (ob) => {
  let result = {};

  // loop through the object "ob"
  for (const i in ob) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        // Store temp in result
        result[i + "." + j] = temp[j];
      }
    }

    // Else store ob[i] in result directly
    else {
      result[i] = ob[i];
    }
  }
  return result;
};

export const formatDate = (timestamp) => {
  if (timestamp === "" || timestamp === 0) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  return formattedDate;
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

export const setCookie = (name, value, daysToExpire = 365) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieString = `${name}=${encodeURIComponent(
    value
  )};expires=${expirationDate.toUTCString()};path=/`;
  document.cookie = cookieString;
};

export const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(name + "=") === 0) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return "";
};

export const deleteCookie = (name) => {
  setCookie(name, "", -1); // Set the expiration date to a past time
};

export const setLocationCookie = (campusName, buildingName) => {
  setCookie(COOKIE_NAMES.DEFAULT_BUILDING_NAME, buildingName);
  setCookie(COOKIE_NAMES.DEFAULT_CAMPUS_NAME, campusName);
};

export const getSelectedFloor = (buildingName, floor, outdoor) => {
  let defaultFloorName;
  const slectedBuildingFloor = floor.filter((fl) =>
    fl.name.includes(buildingName)
  );
  if (!!slectedBuildingFloor.length) {
    defaultFloorName = slectedBuildingFloor[0].groupName;
  } else {
    const slectedBuildingOutdoor = outdoor.filter((fl) =>
      fl.name.includes(buildingName)
    );
    defaultFloorName = slectedBuildingOutdoor[0].groupName;
  }

  return defaultFloorName;
};

export const getDefaultLocation = ({ campus, building, floor, outdoor }) => {
  let defaultCampusName = "";
  let defaultBuildingName = "";
  let defaultFloorName = "";
  // if (process.browser) {
  //   defaultCampusName = getCookie(COOKIE_NAMES.DEFAULT_CAMPUS_NAME);
  //   defaultBuildingName = getCookie(COOKIE_NAMES.DEFAULT_BUILDING_NAME);
  //   if (defaultCampusName && defaultBuildingName) {
  //     return {
  //       defaultCampusName,
  //       defaultBuildingName,
  //     };
  //   }
  // }
  campus.forEach((camp) => {
    if (camp.latitude && defaultBuildingName === "") {
      const campusBuildings = building.filter(
        (build) => build.name.includes(camp.groupName) && build.latitude
      );
      if (!campusBuildings.length) {
        return;
      }
      defaultCampusName = camp.groupName;
      defaultBuildingName = campusBuildings[0].groupName;
      defaultFloorName = getSelectedFloor(defaultBuildingName, floor, outdoor);
      // setCookie(COOKIE_NAMES.DEFAULT_BUILDING_NAME, defaultBuildingName);
      // setCookie(COOKIE_NAMES.DEFAULT_CAMPUS_NAME, defaultCampusName);
    }
  });
  return {
    defaultCampusName,
    defaultBuildingName,
    defaultFloorName,
  };
};

export const convertAPDetailsDataForGraph = (apDetailsData) => {
  const { apList } = apDetailsData;
  let labels = [];
  let totalCounts = [];
  let total2ghzCount = [];
  let total5ghzCount = [];

  apList.forEach(({ accessPointDetailsDTO }) => {
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
