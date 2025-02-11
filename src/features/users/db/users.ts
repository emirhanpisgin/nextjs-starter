import { database } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateUser(id: string, data: Partial<typeof usersTable.$inferInsert>) {
	const [updatedUser] = await database.update(usersTable).set(data).where(eq(usersTable.id, id)).returning();
}
