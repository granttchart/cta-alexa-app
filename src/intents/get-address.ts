import { HandlerInput } from "ask-sdk-core";
import { messages } from "src/constants";
import { speakError } from "../utils/speak-error";

export const GetAddressIntent = {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return (
      request.type === "IntentRequest" &&
      request.intent.name === "GetAddressIntent"
    );
  },
  async handle(handlerInput: HandlerInput) {
    const { requestEnvelope, serviceClientFactory, responseBuilder } =
      handlerInput;

    const consentToken =
      requestEnvelope.context.System.user.permissions &&
      requestEnvelope.context.System.user.permissions.consentToken;

    if (!consentToken) {
      return responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard(messages.PERMISSIONS)
        .getResponse();
    }

    try {
      const deviceId = requestEnvelope.context.System.device?.deviceId;
      if (!deviceId) return speakError(responseBuilder);

      const deviceAddressServiceClient =
        serviceClientFactory?.getDeviceAddressServiceClient();
      const address = await deviceAddressServiceClient?.getFullAddress(
        deviceId
      );

      console.log("Address successfully retrieved, responding to user.");

      let response;
      if (address?.addressLine1 === null && address.stateOrRegion === null) {
        response = responseBuilder.speak(messages.NO_ADDRESS).getResponse();
      } else {
        const ADDRESS_MESSAGE = `${
          messages.ADDRESS_AVAILABLE + address?.addressLine1
        }, ${address?.stateOrRegion}, ${address?.postalCode}`;

        response = responseBuilder.speak(ADDRESS_MESSAGE).getResponse();
      }

      return response;
    } catch (error) {
      return responseBuilder.speak(messages.ERROR).getResponse();
    }
  },
};

export const GetAddressError = {
  canHandle(handlerInput: HandlerInput, error: any) {
    return error.name === "ServiceError";
  },
  handle(handlerInput: HandlerInput, error: any) {
    if (error.statusCode === 403) {
      return handlerInput.responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard(messages.PERMISSIONS)
        .getResponse();
    }
    return handlerInput.responseBuilder
      .speak(messages.LOCATION_FAILURE)
      .reprompt(messages.LOCATION_FAILURE)
      .getResponse();
  },
};