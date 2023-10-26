import { HandlerInput } from "ask-sdk-core";

export const SessionEndedRequest = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput: HandlerInput) {
    console.log("Session ended");
    return handlerInput.responseBuilder.getResponse();
  },
};
