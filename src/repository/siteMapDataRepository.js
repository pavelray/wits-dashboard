import axios from "axios";
import https from "https";

const getSiteMapDataRepository = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://10.192.48.150/webacs/api/v4/op/groups/sites?.full=true",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    auth: {
      username: "AI_team",
      password: "@PrimeAI_API2081",
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };
  try {
    const response = await axios.request(config);
    if (response.data) {
      const {
        data: {
          mgmtResponse: { siteOpDTO },
        },
      } = response;
      const formattedDataResponse = Object.groupBy(
        siteOpDTO,
        ({ locationGroupType }) => locationGroupType
      );
      response.data = formattedDataResponse;
    }

    return response;
  } catch (ex) {
    console.log(ex);
    throw new Error("Failed to fetch data");
  }
};

export { getSiteMapDataRepository };
