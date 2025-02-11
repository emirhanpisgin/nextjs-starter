import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

export async function uploadUserImage(imageUrl: string, userId: string) {
	const response = await fetch(imageUrl);

	if (!response.ok) {
		console.log("Fetch failed!");
		return;
	}

	const body = (await response.blob()) as Blob;

	const file = new File([body], userId, { type: body.type });

	const fileUrl = await uploadImage(file);

	return fileUrl;
}

export function imageURLToKey(imageUrl: string) {
	return imageUrl.split("/").pop()!;
}

export async function uploadImage(image: File) {
	const uploadResult = await utapi.uploadFiles(image);

	if (!uploadResult.error) {
		return uploadResult.data?.url;
	}
}
