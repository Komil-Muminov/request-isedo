export interface PostRqstScheme {
	orgname: string;
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
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`Error on postRqst`);
		}
	});
};
