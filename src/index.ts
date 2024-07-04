import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { elysiaLogging, logger } from "./logger";
import { initializeRedis } from "./plugins/redis";
import apiRoutes from "./routes/api";
import { welcomeDetailResponse } from "./swagger";

const app = new Elysia();

async function startServer() {
	// Initialize Redis
	await initializeRedis();

	// Register plugins
	app.use(cors());
	app.use(
		swagger({
			documentation: {
				info: {
					title: "Rapid Mail Documentation",
					version: "1.0.0",
				},
			},
		})
	);

	// Register logger
	app.use(elysiaLogging);

	// Register routes
	app.get(
		"/",
		() => {
			return {
				status: "success",
				message: "Welcome to Rapid Mail API v1.0",
				data: {},
			};
		},
		{
			detail: welcomeDetailResponse,
		}
	);
	app.use(apiRoutes);

	// Start the server
	const port = process.env.PORT ?? 3000;
	app.listen({ port }, () => {
		logger.info(`🦊 Elysia is running at ${app.server?.hostname}:${port}`);
		logger.info(`👌 Swagger UI is available at localhost:${port}/swagger`);
	});
}

startServer().catch((err) => {
	console.error("Failed to start server", err);
});
