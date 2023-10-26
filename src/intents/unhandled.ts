import { HandlerInput } from "ask-sdk-core";
import { messages } from "../../src/constants";

export const UnhandledIntent = {
  canHandle() {
    return true;
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.UNHANDLED)
      .reprompt(messages.UNHANDLED)
      .getResponse();
  },
};
