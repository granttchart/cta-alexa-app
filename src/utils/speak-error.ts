import {
  ResponseBuilder,
} from "ask-sdk-core";
import { messages } from "../../src/constants";

export const speakError = (responseBuilder: ResponseBuilder) => responseBuilder.speak(messages.ERROR).getResponse();
