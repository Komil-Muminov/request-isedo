export interface PostRqstScheme {
	boname: string;
	accountant: string;
	desc: string;
}

const token = localStorage.getItem("token");

console.log(token);

export const postRequest = async (data: PostRqstScheme): Promise<void> => {
	return fetch(`http://localhost:3000/requests`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then(undefined);
};
