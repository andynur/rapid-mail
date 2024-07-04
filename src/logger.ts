import { ElysiaLogging, LogFormat, Logger } from "@otherguy/elysia-logging";

// Use console for logging
export const logger: Logger = console;

// Create ElysiaLogging instance
export const elysiaLogging = ElysiaLogging(logger, {
	// Log in short format
	format: LogFormat.SHORT,
});
