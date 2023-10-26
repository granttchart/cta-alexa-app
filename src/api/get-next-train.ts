import { HandlerInput } from "ask-sdk-core";

import { api } from "src/constants";
import ctaApiClient from "./cta-api-client";
import { getLocation } from "src/services/get-device-address";

export const getNextTrainByStop = async (
  handlerInput: HandlerInput,
  stopId: string
) => {
  console.log("getNextTrainByStop");

  let locationString = "";
  const locationResponse = await getLocation(handlerInput);
  if (typeof locationResponse === "string") {
    locationString = locationResponse;
  } else {
    return locationResponse;
  }

  return ctaApiClient().get(api.arrivals, {
    params: {
      // mapid: "",
      stp: stopId,
      max: "2",
      outputType: "JSON",
    },
  });
};
