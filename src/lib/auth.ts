import { database } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { updateUser } from "@/features/users/db/users";
import { uploadUserImage } from "./uploadthing";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(database),
	providers: [Google],
	events: {
		async createUser(user) {
			if (!user.user.image) return;

			const uploadedUserImage = await uploadUserImage(user.user.image, user.user.id!);

			await updateUser(user.user.id!, {
				image: uploadedUserImage,
			});
		},
	},
});
