import {DefaultApiClient, SkillBuilders} from "ask-sdk-core";

import { LaunchRequest } from "./intents/launch";
import { GetAddressError, GetAddressIntent } from "./intents/get-address";
import { SessionEndedRequest } from "./intents/session-ended";
import { HelpIntent } from "./intents/help";
import { CancelIntent } from "./intents/cancel";
import { StopIntent } from "./intents/stop";
import { FallbackHandler } from "./intents/fallback";
import { UnhandledIntent } from "./intents/unhandled";

const skillBuilder = SkillBuilders.custom();
const skill = skillBuilder
  .addRequestHandlers(
    LaunchRequest,
    GetAddressIntent,
    SessionEndedRequest,
    HelpIntent,
    CancelIntent,
    StopIntent,
    FallbackHandler,
    UnhandledIntent
  )
  .addErrorHandlers(GetAddressError)
  .withApiClient(new DefaultApiClient())
  .lambda();

export default skill;