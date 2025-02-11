import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from ".";
import { relations } from "drizzle-orm";

export const sessionsTable = pgTable("session", {
	sessionToken: text().primaryKey(),
	userId: text()
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	expires: timestamp({ mode: "date" }).notNull(),
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [sessionsTable.userId],
		references: [usersTable.id],
	}),
}));
