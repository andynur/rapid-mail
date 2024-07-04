import nodemailer from "nodemailer";
import { db } from "./db/index";
import { emailsTable } from "./db/schema";
import { EmailBody } from "./interfaces/EmailBody";
import { logger } from "./logger";
import { getRedisClient, initializeRedis } from "./plugins/redis";

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

const isHTML = (content: string): boolean => {
	return /<\/?[a-z][\s\S]*>/i.test(content);
};

const processQueue = async (): Promise<void> => {
	await initializeRedis();
	const redisClient = getRedisClient();

	while (true) {
		const result = await redisClient.brPop("email_queue", 0);
		if (!result) continue;

		const email = JSON.parse(result.element) as EmailBody;

		const mailOptions = {
			from: email.sender,
			to: email.recipient,
			subject: email.subject,
			text: isHTML(email.text) ? undefined : email.text,
			html: isHTML(email.text) ? email.text : undefined,
		};

		try {
			await transporter.sendMail(mailOptions);
			logger.info(`🔥 Email sent successfully to : ${email.recipient}`);
			await redisClient.del("emails:all"); // Invalidate cache
			await db.insert(emailsTable).values({
				sender: email.sender,
				recipient: email.recipient,
				subject: email.subject,
				body: email.text,
				status: "sent",
			});
		} catch (error) {
			logger.error(`Error sending email to: ${email.recipient}`, error);

			await db.insert(emailsTable).values({
				sender: email.sender,
				recipient: email.recipient,
				subject: email.subject,
				body: email.text,
				status: "failed",
			});
		}
	}
};

processQueue().catch((error) =>
	logger.error({ error }, "Error in processQueue")
);
