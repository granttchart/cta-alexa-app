import { api } from "src/constants";
import ctaApiClient from "./cta-api-client";

export const getNextTrainByStop = async (
  stopId: string
) => {
  console.log("getNextTrainByStop invoked for stopId", stopId);

  return ctaApiClient().get(api.arrivals, {
    params: {
      stpid: stopId,
      max: "2",
      outputType: "JSON",
    },
  });
};
