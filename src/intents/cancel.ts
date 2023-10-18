import {
  HandlerInput,
} from "ask-sdk-core";
import { messages } from "src/constants";

export const CancelIntent = {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.CancelIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder.speak(messages.GOODBYE).getResponse();
  },
};
