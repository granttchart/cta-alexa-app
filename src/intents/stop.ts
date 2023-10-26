import { HandlerInput } from "ask-sdk-core";
import { messages } from "../../src/constants";

export const StopIntent = {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.StopIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder.speak(messages.STOP).getResponse();
  },
};
