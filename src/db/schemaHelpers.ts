import { text, timestamp } from "drizzle-orm/pg-core";

export const id = text()
	.primaryKey()
	.$defaultFn(() => crypto.randomUUID());
export const createdAt = timestamp({ withTimezone: true }).notNull().defaultNow();
export const updatedAt = timestamp({ withTimezone: true })
	.notNull()
	.defaultNow()
	.$onUpdate(() => new Date());
