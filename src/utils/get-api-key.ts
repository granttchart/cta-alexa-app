import {
  SecretsManagerClient,
  GetSecretValueCommand
} from "@aws-sdk/client-secrets-manager";

export const getApiKeySecret = async () => {
	const client = new SecretsManagerClient({
		region: "us-east-1",
	});

	try {
		return client.send(
			new GetSecretValueCommand({
				SecretId: "ctaApiKey",
			})
		);
	} catch (error) {
		console.error("Failed to fetch API key secret", error);
		throw error;
	}
}

export default getApiKeySecret;

