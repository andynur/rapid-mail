import { Elysia } from "elysia";
import { emailHandler } from "../handlers/emailHandler";
import { emailSchemaValidation } from "../validations/emailSchemaValidation";

const apiRoutes = new Elysia();

apiRoutes.group("/api", (app) =>
	app
		.get("/", () => {
			return new Response("Welcome to Rapid Mail API v1.0!");
		})
		.get("/emails", emailHandler.getEmail)
		.post("/emails", emailHandler.postEmail, { body: emailSchemaValidation })
);

export default apiRoutes;
