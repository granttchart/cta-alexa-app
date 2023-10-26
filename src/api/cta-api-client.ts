import { getApiKeySecret } from "src/utils/get-api-key";
import axios from "axios";
import constants from "src/constants";

let apiKey = "";

export const ctaApiClient = () => {
  if (!apiKey) {
    getApiKeySecret().then((resp) => {
      apiKey = resp.SecretString!;
    });
  }

  return axios.create({
		baseURL: constants.api.base,
		headers: {
			"Accept": "application/json",
			"Content-Encoding": "application/json"
		},
    params: {
      key: apiKey,
      outputType: "JSON",
    },
  });
};
export default ctaApiClient;
