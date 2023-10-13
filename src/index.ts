import {DefaultApiClient, HandlerInput, ResponseBuilder, SkillBuilders} from "ask-sdk-core";
import constants from "./constants";

const speakError = (responseBuilder: ResponseBuilder) => responseBuilder.speak(constants.messages.ERROR).getResponse();

const LaunchRequest = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak(constants.messages.WELCOME)
      .reprompt(constants.messages.WHAT_DO_YOU_WANT)
      .getResponse();
  },
};

const GetAddressIntent = {
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
        .speak(constants.messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard(constants.PERMISSIONS)
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
      if (address?.addressLine1 === null && address.stateOrRegion === null) {
        response = responseBuilder.speak(constants.messages.NO_ADDRESS).getResponse();
      } else {
        const ADDRESS_MESSAGE = `${
          constants.messages.ADDRESS_AVAILABLE + address?.addressLine1
          }, ${address?.stateOrRegion}, ${address?.postalCode}`;

        response = responseBuilder.speak(ADDRESS_MESSAGE).getResponse();
      }

      return response;
    } catch (error) {
      return responseBuilder.speak(constants.messages.ERROR).getResponse();
    }
  },
};

const SessionEndedRequest = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput: HandlerInput) {
    console.log('Session ended');
    return handlerInput.responseBuilder.getResponse();
  },
};

const UnhandledIntent = {
  canHandle() {
    return true;
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak(constants.messages.UNHANDLED)
      .reprompt(constants.messages.UNHANDLED)
      .getResponse();
  },
};

const HelpIntent = {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak(constants.messages.HELP)
      .reprompt(constants.messages.HELP)
      .getResponse();
  },
};

const CancelIntent = {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.CancelIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder.speak(constants.messages.GOODBYE).getResponse();
  },
};

const StopIntent = {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.StopIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder.speak(constants.messages.STOP).getResponse();
  },
};

const GetAddressError = {
  canHandle(handlerInput: HandlerInput, error: any) {
    return error.name === "ServiceError";
  },
  handle(handlerInput: HandlerInput, error: any) {
    if (error.statusCode === 403) {
      return handlerInput.responseBuilder
        .speak(constants.messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard(constants.PERMISSIONS)
        .getResponse();
    }
    return handlerInput.responseBuilder
      .speak(constants.messages.LOCATION_FAILURE)
      .reprompt(constants.messages.LOCATION_FAILURE)
      .getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak(constants.FALLBACK_MESSAGE)
      .reprompt(constants.FALLBACK_REPROMPT)
      .getResponse();
  },
};

const skillBuilder = SkillBuilders.custom();
const skill = skillBuilder
  .addRequestHandlers(
    LaunchRequest,
    GetAddressIntent,
    SessionEndedRequest,
    HelpIntent,
    CancelIntent,
    StopIntent,
    FallbackHandler,
    UnhandledIntent
  )
  .addErrorHandlers(GetAddressError)
  .withApiClient(new DefaultApiClient())
  .lambda();

export default skill;