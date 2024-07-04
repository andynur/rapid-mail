import { OpenAPIV3 } from "openapi-types";

export const welcomeDetailResponse: OpenAPIV3.OperationObject = {
	summary: "Welcome",
	responses: {
		"200": {
			description: "Rapid Mail Server API",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							status: {
								type: "string",
								example: "success",
							},
							message: {
								type: "string",
								example: "Welcome to Rapid Mail API v1.0",
							},
							data: {
								type: "object",
								properties: {},
							},
						},
					},
				},
			},
		},
	},
};

export const getEmailDetailResponse: OpenAPIV3.OperationObject = {
	summary: "Get all emails",
	responses: {
		"200": {
			description: "Get all emails​ data from database",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							status: {
								type: "string",
								example: "success",
							},
							message: {
								type: "string",
								example: "Get email data",
							},
							data: {
								type: "array",
								items: {
									type: "object",
									properties: {
										id: {
											type: "string",
											example: "123e4567-e89b-12d3-a456-426614174000",
										},
										sender: {
											type: "string",
											example: "sender@example.com",
										},
										recipient: {
											type: "string",
											example: "recipient@example.com",
										},
										subject: {
											type: "string",
											example: "Test Email",
										},
										text: {
											type: "string",
											example: "This is a test email.",
										},
										status: {
											type: "string",
											example: "sent",
										},
										createdAt: {
											type: "string",
											format: "date-time",
											example: "2023-07-01T00:00:00Z",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
};

export const addEmailDetailResponse: OpenAPIV3.OperationObject = {
	summary: "Add new email",
	responses: {
		"201": {
			description: "Add a new email to the queue",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							status: {
								type: "string",
								example: "success",
							},
							message: {
								type: "string",
								example: "Email enqueued successfully",
							},
							data: {
								type: "object",
								properties: {
									sender: {
										type: "string",
										example: "sender@example.com",
									},
									recipient: {
										type: "string",
										example: "recipient@example.com",
									},
									subject: {
										type: "string",
										example: "Test Email",
									},
									text: {
										type: "string",
										example: "This is a test email.",
									},
								},
							},
						},
					},
				},
			},
		},
	},
};
