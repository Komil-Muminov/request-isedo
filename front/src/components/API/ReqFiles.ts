import { validateResponse } from "./Hooks/useAuth";

export type ReqfilesType = {
	file?: File | string;
	token?: string | null;
	url?: string | undefined;
};

export const PostReqFiles = async ({
	file,
	token,
}: ReqfilesType): Promise<void> => {
	const formData = new FormData();
	if (!file || !token) {
		throw Error(`Ошибка при попытке получении токена и файла`);
	}
	formData.append("reqfiles", file);
	return fetch(`http://localhost:3000/reqfiles`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	}).then(undefined);
};

export const getReqfiles = async ({
	token,
}: ReqfilesType): Promise<ReqfilesType[]> => {
	return fetch(`http://localhost:3000/reqfiles`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then(validateResponse)
		.then((response) => response.json());
};
