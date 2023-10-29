import axios from "axios";

import { getApiKeySecret } from "src/utils/get-api-key";
import constants from "src/constants";

let apiKey = "";

export const ctaApiClient = () => {
  if (!apiKey) {
    getApiKeySecret()
      .then((resp) => {
        apiKey = resp.SecretString!;
      })
      .catch((err) => {
        console.error("Could not fetch API key secret", err);
      });
  }

  return axios.create({
    baseURL: constants.api.arrivals,
    headers: {
      Accept: "application/json",
      "Content-Encoding": "application/json",
    },
    params: {
      key: apiKey,
      outputType: "JSON",
    },
  });
};
export default ctaApiClient;
