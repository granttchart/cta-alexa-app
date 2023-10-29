import {DefaultApiClient, SkillBuilders} from "ask-sdk-core";

import { LaunchRequest } from "./intents/launch";
import { SessionEndedRequest } from "./intents/session-ended";
import { HelpIntent } from "./intents/help";
import { CancelIntent } from "./intents/cancel";
import { StopIntent } from "./intents/stop";
import { FallbackHandler } from "./intents/fallback";
import { UnhandledIntent } from "./intents/unhandled";
import { getNextTrainIntent } from "./intents/get-next-train-intent";

const skillBuilder = SkillBuilders.custom();
const skill = skillBuilder
  .addRequestHandlers(
    LaunchRequest,
    SessionEndedRequest,
    HelpIntent,
    CancelIntent,
    StopIntent,
    FallbackHandler,
    UnhandledIntent,
    getNextTrainIntent
  )
  .withApiClient(new DefaultApiClient())
  .lambda();

export default skill;