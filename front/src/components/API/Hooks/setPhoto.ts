export type CurrUserPhoto = {
	username: string;
	file: File;
};
export const setPhoto = ({ username, file }: CurrUserPhoto): Promise<void> => {
	const formData = new FormData();
	const token = localStorage.getItem("token");

	formData.append("image", file);

	return fetch(`http://localhost:3000/upload/${username}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	}).then(undefined);
};
