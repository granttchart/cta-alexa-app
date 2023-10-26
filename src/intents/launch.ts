import {
  HandlerInput,
} from "ask-sdk-core";
import { messages } from "../../src/constants";

export const LaunchRequest = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.WELCOME)
      .reprompt(messages.WHAT_DO_YOU_WANT)
      .getResponse();
  },
};

const SessionEndedRequest = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput: HandlerInput) {
    console.log("Session ended");
    return handlerInput.responseBuilder.getResponse();
  },
};