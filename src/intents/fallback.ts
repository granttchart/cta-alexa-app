import { HandlerInput } from "ask-sdk-core";
import { messages } from "../../src/constants";

export const FallbackHandler = {
  canHandle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.FALLBACK_MESSAGE)
      .reprompt(messages.FALLBACK_REPROMPT)
      .getResponse();
  },
};
