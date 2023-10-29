export const SKILL_NAME = "Next CTA train or bus";

export const messages = {
  FALLBACK_MESSAGE: `Sorry, ${SKILL_NAME} skill can't help you with that.`,
  FALLBACK_REPROMPT: "What can I help you with?",
  WELCOME: `Hi there! Try asking, "when is the next red line train for Thorndale?"`,
  WHAT_DO_YOU_WANT: "What do you want to ask?",
  ERROR: "Sorry, something went wrong.",
  UNHANDLED: "This skill doesn't support that. Please ask something else.",
  HELP: `Try asking, "when is the next red line train for Thorndale," or, "when is the next 87 bus for Cottage Grove?"`,
  STOP: `Bye! Thanks for using the ${SKILL_NAME} Alexa Skill!`,
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