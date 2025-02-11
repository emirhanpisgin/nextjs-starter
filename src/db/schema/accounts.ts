import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";
import { usersTable } from ".";
import { relations } from "drizzle-orm";

export const accountsTable = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => usersTable.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => [
		{
			compoundKey: primaryKey({
				columns: [account.provider, account.providerAccountId],
			}),
		},
	]
);

export const accountsRelations = relations(accountsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [accountsTable.userId],
		references: [usersTable.id],
	}),
}));
