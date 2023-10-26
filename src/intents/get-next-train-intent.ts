import { HandlerInput } from 'ask-sdk-core';
import { stopIds } from 'src/enums/stop-ids';

export const getNextTrainIntent = {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return (
      request.type === "IntentRequest" &&
      request.intent.name === "GetNextTrainIntent"
    );
  },
  async handle(handlerInput: HandlerInput) {
    const { responseBuilder } =
      handlerInput;

    try {
      let stopInput = '';

      const stopLookupId = stopIds.filter((stop) => {
        return new RegExp(stopInput).test(stop.name);
      });

      if (!stopLookupId.length) {
        return responseBuilder
          .speak(`Sorry, I didn't find a stop by the name ${stopInput}.`)
          .getResponse();
      }
      

      response = responseBuilder.speak(ADDRESS_MESSAGE).getResponse();


      return response;
    } catch (error) {
      return responseBuilder.speak(messages.ERROR).getResponse();
    }
  },
};
