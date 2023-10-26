import { HandlerInput } from "ask-sdk-core";
import { messages } from "src/constants";
import { speakError } from "src/utils/speak-error";

export const getLocation = async (handlerInput: HandlerInput) => {
  const { requestEnvelope, serviceClientFactory, responseBuilder } =
    handlerInput;

  const consentToken =
    requestEnvelope.context.System.user.permissions &&
    requestEnvelope.context.System.user.permissions.consentToken;

  if (!consentToken) {
    return responseBuilder
      .speak(messages.NOTIFY_MISSING_PERMISSIONS)
      .withAskForPermissionsConsentCard([messages.NOTIFY_MISSING_PERMISSIONS])
      .getResponse();
  }

  try {
    const deviceId = requestEnvelope.context.System.device?.deviceId;
    if (!deviceId) return speakError(responseBuilder);

    const deviceAddressServiceClient =
      serviceClientFactory?.getDeviceAddressServiceClient();
    const address = await deviceAddressServiceClient?.getFullAddress(deviceId);

    console.log("Address successfully retrieved, responding to user.");

    let response;
    if (!address?.addressLine1) {
      response = responseBuilder.speak(messages.NO_ADDRESS).getResponse();
    } else {
      return `${address?.addressLine1}, ${address?.stateOrRegion}, ${address?.postalCode}`;
    }

    return response;
  } catch (error) {
    return responseBuilder.speak(messages.ERROR).getResponse();
  }
};
