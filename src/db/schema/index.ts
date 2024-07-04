import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const emailsTable = pgTable("emails", {
	id: uuid("id").primaryKey().defaultRandom(),
	sender: text("sender"),
	recipient: text("recipient"),
	subject: text("subject"),
	body: text("body"),
	status: text("status"),
	createdAt: timestamp("created_at").defaultNow(),
});

export type Email = InferSelectModel<typeof emailsTable>;
export type NewEmail = InferInsertModel<typeof emailsTable>;
