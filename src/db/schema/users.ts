import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sessionsTable, authenticatorsTable, accountsTable } from ".";

export const usersTable = pgTable("user", {
	id: uuid().primaryKey().defaultRandom(),
	name: text(),
	email: text().unique(),
	emailVerified: timestamp({ mode: "date" }),
	image: text(),
});

export const usersRelations = relations(usersTable, ({ many, one }) => ({
	sessions: many(sessionsTable),
	authenticators: many(authenticatorsTable),
	accounts: many(accountsTable),
}));
