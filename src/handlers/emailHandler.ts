import { emailService } from "../services/emailService";

export const emailHandler = {
	getEmail: async ({ set }: any) => {
		const data = await emailService.getEmails();
		return {
			status: "success",
			message: "Get email data",
			data,
		};
	},
	postEmail: async ({ body, set }: any) => {
		await emailService.addEmailToQueue(body);

		set.status = 201;
		return {
			status: "success",
			message: "Email enqueued successfully",
			data: body,
		};
	},
};
