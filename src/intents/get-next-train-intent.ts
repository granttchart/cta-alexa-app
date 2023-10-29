import { getNextTrainByStop } from './../api/get-next-train';
import { HandlerInput } from 'ask-sdk-core';

import { messages } from 'src/constants';
import { stopIds } from 'src/enums/stop-ids';

export const getNextTrainIntent = {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;
    const canHandle = request.type === "IntentRequest" && request.intent.name === "nextTrainIntent";

    console.log("getNextTrainIntent canHandle", canHandle);
    return canHandle;
  },
  async handle(handlerInput: HandlerInput) {
    const { responseBuilder } =
      handlerInput;

    try {
      let stopNameInput = '';

      const stopLookupResults = stopIds.filter((stop) => {
        return new RegExp(stopNameInput).test(stop.stopName);
      });

      if (!stopLookupResults.length) {
        return responseBuilder
          .speak(`Sorry, I didn't find a stop by the name ${stopNameInput}.`)
          .getResponse();
      }

      if (stopLookupResults.length > 1) {
        const multipleStopMessage = stopLookupResults.map((stop) => stop.stopName);
        return responseBuilder
          .speak(`I found multiple stops: ${multipleStopMessage.join(', ')}. Which one did you mean?`)
          .getResponse();
      }

      const singleStopResult = stopLookupResults[0];

      const nextTrainResponse = await getNextTrainByStop(
        `${singleStopResult.stopId}`
      );

      return responseBuilder
        .speak(`The next train for ${singleStopResult.stopName} is coming in ${nextTrainResponse}.`)
        .getResponse();
    } catch (error) {
      return responseBuilder.speak(messages.ERROR).getResponse();
    }
  },
};
