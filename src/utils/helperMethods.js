import { COOKIE_NAMES, DATE_RANGE_TYPES } from "./constants";

export const camelCaseToWord = (camelCaseString) => {
  // Insert space before every capital letter
  const readableString = camelCaseString.replace(/([A-Z])/g, " $1");

  // Capitalize the first letter and remove leading space
  return (
    readableString.charAt(0).toUpperCase() + readableString.slice(1).trim()
  );
};

export function generateRandomHexCodes(n) {
  const hexCodes = [];

  for (let i = 0; i < n; i++) {
    // Generate a random RGB color
    const rgbColor = [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ];

    // Convert RGB to hex
    const hexCode = `#${rgbColor
      .map((component) => component.toString(16).padStart(2, "0"))
      .join("")}`;

    hexCodes.push(hexCode);
  }

  return hexCodes;
}

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

export function getDateRange(period) {
  const currentDate = new Date();
  const startOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0,
    0
  );

  switch (period) {
    case DATE_RANGE_TYPES.LAST_WEEK:
      const lastWeekStartDate = new Date(startOfDay);
      lastWeekStartDate.setDate(startOfDay.getDate() - startOfDay.getDay() - 6);
      return {
        start: lastWeekStartDate.toDateString(),
        end: startOfDay.toDateString(),
        startDate: lastWeekStartDate,
        endDate: startOfDay,
      };

    case DATE_RANGE_TYPES.LAST_MONTH:
      const lastMonthStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      return {
        start: lastMonthStartDate.toDateString(),
        end: startOfDay.toDateString(),
      };

    case DATE_RANGE_TYPES.LAST_3_MONTH:
      const last3MonthsStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 2,
        1
      );
      return {
        start: last3MonthsStartDate.toDateString(),
        end: startOfDay.toDateString(),
      };

    case DATE_RANGE_TYPES.LAST_6_MONTH:
      const last6MonthsStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 5,
        1
      );
      return {
        start: last6MonthsStartDate.toDateString(),
        end: startOfDay.toDateString(),
      };

    default:
      return null;
  }
}

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

export const setLocationCookie = (campusName, buildingName, floorName) => {
  setCookie(COOKIE_NAMES.DEFAULT_BUILDING_NAME, buildingName);
  setCookie(COOKIE_NAMES.DEFAULT_CAMPUS_NAME, campusName);
  setCookie(COOKIE_NAMES.DEFAULT_FLOOR_NAME, floorName);
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
    defaultFloorName = slectedBuildingOutdoor[0]?.groupName;
  }

  return defaultFloorName;
};

export const getDefaultLocation = ({ campus, building, floor, outdoor }) => {
  let defaultCampusName = "";
  let defaultBuildingName = "";
  let defaultFloorName = "";
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
    }
  });
  return {
    defaultCampusName,
    defaultBuildingName,
    defaultFloorName,
  };
};

export const convertBytes = (byteValue) => {
  const gigabyte = 1024 * 1024 * 1024;
  const megabyte = 1024 * 1024;

  if (byteValue >= gigabyte) {
    // Convert to gigabytes
    const gigabytes = (byteValue / gigabyte).toFixed(2);
    return gigabytes + " GB";
  } else if (byteValue >= megabyte) {
    // Convert to megabytes
    const megabytes = (byteValue / megabyte).toFixed(2);
    return megabytes + " MB";
  } else {
    // Return in bytes for values less than 1 MB
    return byteValue + " bytes";
  }
};

export function bytesToGB(bytes) {
  if (bytes < 0) {
    throw new Error("Input must be a non-negative number.");
  }

  const gigabytes = bytes / (1024 * 1024 * 1024);
  return gigabytes.toFixed(2); // Keep two decimal places
}

export function FormatSessionTime(totalDuration) {
  const totalSeconds = Math.floor(totalDuration / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  FormatSessionTime.prototype.toString = function () {
    return `h:${hours}:m:${minutes}:s:${seconds}`;
  };

  FormatSessionTime.prototype.getValue = function () {
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };
}

export const millisecondsToHours = (milliseconds) => {
  if (isNaN(milliseconds) || milliseconds < 0) {
    return "Invalid input";
  }

  const hours = milliseconds / (1000 * 60 * 60);

  return `${hours.toFixed(2)} hours`;
};

export function findCenterCoordinates(locations) {
  if (locations.length === 0) {
    throw new Error("Input array is empty.");
  }
  let sumLat = 0;
  let sumLng = 0;

  locations.forEach((location) => {
    sumLat += location.latitude;
    sumLng += location.longitude;
  });

  const avgLat = sumLat / locations.length;
  const avgLng = sumLng / locations.length;

  return { latitude: avgLat, longitude: avgLng };
}

export function groupBy(array, keySelector) {
  return array.reduce((acc, currentItem) => {
    const key = keySelector(currentItem);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(currentItem);
    return acc;
  }, {});
}
