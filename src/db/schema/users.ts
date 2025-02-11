import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { sessionsTable, authenticatorsTable, accountsTable } from ".";
import { createdAt, id } from "../schemaHelpers";

export const usersTable = pgTable("user", {
	id: id,
	name: text(),
	email: text().unique(),
	emailVerified: timestamp({ mode: "date" }),
	createdAt,
	image: text(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
	sessions: many(sessionsTable),
	authenticators: many(authenticatorsTable),
	accounts: many(accountsTable),
}));
