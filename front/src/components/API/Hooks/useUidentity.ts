import z from "zod";

export const PostUidentityScheme = z.object({
	inn: z.string(),
	organization: z.string(),
	fullName: z.string(),
	post: z.string(),
	file: z.string().optional(),
	login: z.string(),
	role: z.string(),
	sku: z.string(),
	certificatID: z.string(),
	department: z.string().optional(),
});

export type PostUidentityType = z.infer<typeof PostUidentityScheme>;
export type GetUidentityType = z.infer<typeof PostUidentityScheme>;

export const useUidentity = () => {
	const token = localStorage.getItem("token");
	// const;
	const postUidentity = async (data: PostUidentityType): Promise<void> => {
		return fetch(`http://localhost:3000/uidentity`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then(undefined);
	};

	const getUidentity = async (): Promise<
		GetUidentityType | GetUidentityType[]
	> => {
		return fetch(`http:localhost:3000/getUdentity`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(`Ошибка в getUidentity запросе ${response.status}`);
				}
				return response.json();
			})
			.then((data) => PostUidentityScheme.parse(data));
	};
	return {
		postUidentity,
		getUidentity,
	};
};
