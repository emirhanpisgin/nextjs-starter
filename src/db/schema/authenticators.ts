import { boolean, integer, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { usersTable } from ".";
import { relations } from "drizzle-orm";

export const authenticatorsTable = pgTable(
	"authenticator",
	{
		credentialID: text().notNull().unique(),
		userId: uuid()
			.notNull()
			.references(() => usersTable.id, { onDelete: "cascade" }),
		providerAccountId: text().notNull(),
		credentialPublicKey: text().notNull(),
		counter: integer().notNull(),
		credentialDeviceType: text().notNull(),
		credentialBackedUp: boolean().notNull(),
		transports: text(),
	},
	(authenticator) => [
		{
			compositePK: primaryKey({
				columns: [authenticator.userId, authenticator.credentialID],
			}),
		},
	]
);

export const authenticatorsRelations = relations(authenticatorsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [authenticatorsTable.userId],
		references: [usersTable.id],
	}),
}));
