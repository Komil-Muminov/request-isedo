import z from "zod";

const GetRqstsScheme = z.object({
	id: z.number(),
	orgname: z.string(),
	accountant: z.string(),
	desc: z.string(),
});

export type GetRqsts = z.infer<typeof GetRqstsScheme>;

export const getRqsts = async (): Promise<GetRqsts[]> => {
	const token = localStorage.getItem("token");
	console.log(`getRqtst Token :${token}`);
	return fetch(`http://localhost:3000/requests`, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Недостаточно прав"); // Ошибка сервера
			}
			return response.json();
		})
		.then((data) => z.array(GetRqstsScheme).parse(data));
};
