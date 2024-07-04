import { t } from "elysia";

export const emailSchemaValidation = t.Object({
	sender: t.String({
		format: "email",
	}),
	recipient: t.String({
		format: "email",
	}),
	subject: t.String({
		minLength: 1,
	}),
	text: t.String({
		minLength: 1,
	}),
});
