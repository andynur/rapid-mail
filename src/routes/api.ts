import { Elysia } from "elysia";
import { emailHandler } from "../handlers/emailHandler";
import { addEmailDetailResponse, getEmailDetailResponse } from "../swagger";
import { emailSchemaValidation } from "../validations/emailSchemaValidation";

const apiRoutes = new Elysia();

apiRoutes.group("/api", (app) =>
	app
		.get("/emails", emailHandler.getEmail, {
			detail: getEmailDetailResponse,
		})
		.post("/emails", emailHandler.postEmail, {
			body: emailSchemaValidation,
			detail: addEmailDetailResponse,
		})
);

export default apiRoutes;
