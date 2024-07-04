import { db } from "../db";
import { emailsTable } from "../db/schema";
import { EmailBody } from "../interfaces/EmailBody";
import { logger } from "../logger";
import { getRedisClient } from "../plugins/redis";

export const emailService = {
	addEmailToQueue: async (email: EmailBody) => {
		const redisClient = getRedisClient();
		await redisClient.lPush("email_queue", JSON.stringify(email));
	},
	getEmails: async () => {
		const redisClient = getRedisClient();
		const cacheKey = "emails:all";

		// Check if emails are in the cache
		const cachedEmails = await redisClient.get(cacheKey);
		if (cachedEmails) {
			logger.info("Fetching emails from cache");
			return JSON.parse(cachedEmails);
		}

		// Fetch emails from the database
		logger.info("Fetching emails from database");
		const emails = await db.select().from(emailsTable);

		// Store the result in the cache
		await redisClient.set(cacheKey, JSON.stringify(emails), { EX: 3600 }); // Cache for 1 hour
		return emails;
	},
};
