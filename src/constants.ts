const SKILL_NAME = "Device Address";

const constants = {
	SKILL_NAME: SKILL_NAME,
  FALLBACK_MESSAGE: `The ${SKILL_NAME} skill can\'t help you with that. It can help skills to request and access the configured address in the customer’s device settings if you where am I located. What can I help you with?`,
  FALLBACK_REPROMPT: "What can I help you with?",
  messages: {
		WELCOME:
			"Welcome to the Sample Device Address API Skill!  You can ask for the device address by saying what is my address.  What do you want to ask?",
		WHAT_DO_YOU_WANT: "What do you want to ask?",
		NOTIFY_MISSING_PERMISSIONS:
			"Please enable Location permissions in the Amazon Alexa app.",
		NO_ADDRESS:
			"It looks like you don't have an address set. You can set your address from the companion app.",
		ADDRESS_AVAILABLE: "Here is your full address: ",
		ERROR: "Uh Oh. Looks like something went wrong.",
		LOCATION_FAILURE:
			"There was an error with the Device Address API. Please try again.",
		GOODBYE: "Bye! Thanks for using the Sample Device Address API Skill!",
		UNHANDLED: "This skill doesn't support that. Please ask something else.",
		HELP: "You can use this skill by asking something like: whats my address?",
		STOP: "Bye! Thanks for using the Sample Device Address API Skill!",
	},
  PERMISSIONS: ["read::alexa:device:all:address"],
};

export default constants;