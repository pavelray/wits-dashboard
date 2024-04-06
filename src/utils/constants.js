export const MAP_TYPE = {
  GOOGLE: "GOOGLE",
  LEAFLET: "LEAFLET",
  MAPBOX: "MAPBOX",
};

export const COOKIE_NAMES = {
  DEFAULT_CAMPUS_NAME: "DEFAULT_CAMPUS_NAME",
  DEFAULT_BUILDING_NAME: "DEFAULT_BUILDING_NAME",
  DEFAULT_FLOOR_NAME: "DEFAULT_FLOOR_NAME",
};

export const DATE_RANGE_TYPES = {
  LAST_WEEK: "lastWeek",
  LAST_MONTH: "lastMonth",
  LAST_3_MONTH: "last3Months",
  LAST_6_MONTH: "last6Months",
};

export const DATA_FREQUENCY = {
  HOUR: "hour",
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
};

export const DATA_FREQUENCY_VALUES = [
  {
    key: DATA_FREQUENCY.HOUR,
    value: "Hour",
  },
  {
    key: DATA_FREQUENCY.DAY,
    value: "Day",
  },
  {
    key: DATA_FREQUENCY.WEEK,
    value: "Week",
  },
  {
    key: DATA_FREQUENCY.MONTH,
    value: "Month",
  },
];

export const DEFAULT_HEAT_MAP_CONFIG = { max: 15, min: 1, radius: 25, blur: 18 };

export const DEFAULT_DATE_RANGE = DATE_RANGE_TYPES.LAST_WEEK;
export const DEFAULT_MAP_ZOOM_VALUE = 14;

export const CISCO_PRIME_API_URL = "https://10.192.48.150/webacs/api/v4/";

export const BRAND_LOGO_PATH = "/images/Wits_Centenary_Logo_Large.png";
