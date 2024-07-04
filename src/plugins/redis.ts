import { createClient, RedisClientType } from "redis";
import { logger } from "../logger";
let redisClient: RedisClientType;

export const initializeRedis = async (): Promise<void> => {
	redisClient = createClient({ url: process.env.REDIS_URL });

	redisClient.on("error", (err) => logger.error("Redis Client Error", err));

	await redisClient.connect();
	const redisUrl = new URL(process.env.REDIS_URL!);
	logger.info(`🚀 Redis is running at ${redisUrl.hostname}:${redisUrl.port}`);
};

export const getRedisClient = (): RedisClientType => {
	if (!redisClient) {
		throw new Error("Redis client is not initialized");
	}
	return redisClient;
};
