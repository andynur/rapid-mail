import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { elysiaLogging, logger } from "./logger";
import { initializeRedis } from "./plugins/redis";
import apiRoutes from "./routes/api";

const app = new Elysia();

async function startServer() {
	// Initialize Redis
	await initializeRedis();

	app.use(cors());

	// Register swagger
	app.use(
		swagger({
			path: "/v1/swagger",
		})
	);

	// Register logger
	app.use(elysiaLogging);

	// Register routes
	app.use(apiRoutes);

	// Start the server
	app.listen(
		{
			port: process.env.PORT ?? 3000,
			maxRequestBodySize: Number.MAX_SAFE_INTEGER,
		},
		() => {
			logger.info(
				`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
			);
		}
	);
}

startServer().catch((err) => {
	console.error("Failed to start server", err);
});
