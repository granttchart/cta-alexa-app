export const SKILL_NAME = "Next CTA train or bus";

export const messages = {
  FALLBACK_MESSAGE: `Sorry, ${SKILL_NAME} skill can't help you with that.`,
  FALLBACK_REPROMPT: "What can I help you with?",
  WELCOME: `Hi there! Try asking, when is the next red line train?`,
  WHAT_DO_YOU_WANT: "What do you want to ask?",
  NOTIFY_MISSING_PERMISSIONS:
    "Please enable Location permissions in the Amazon Alexa app.",
  NO_ADDRESS:
    "It looks like you don't have an address set. You can set your address from the companion app.",
  ADDRESS_AVAILABLE: "Here is your full address: ",
  ERROR: "Sorry, something went wrong.",
  LOCATION_FAILURE:
    "There was an error with the Device Address API. Please try again.",
  UNHANDLED: "This skill doesn't support that. Please ask something else.",
  HELP: "You can use this skill by asking something like: whats my address?",
  STOP: "Bye! Thanks for using the Sample Device Address API Skill!",
};

export const api = {
  arrivals: "https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx",
};

export const permissions = ["read::alexa:device:all:address"];

export default {
  messages,
  api,
  permissions,
};