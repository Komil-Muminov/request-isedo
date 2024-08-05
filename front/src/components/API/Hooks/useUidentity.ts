import z from "zod";

export const PostUidentityScheme = z.object({
	orgName: z.string(),
	departmentName: z.string(),
	post: z.string(),
	file: z.string(),
});

export type PostUidentityType = z.infer<typeof PostUidentityScheme>;
export type GetUidentityType = z.infer<typeof PostUidentityScheme>;

export const useUidentity = async () => {
	const postUidentity = (data: PostUidentityType): Promise<void> => {
		return fetch(`http:localhost:3000/postUidentity`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then(undefined);
	};

	const getUidentity = async (
		data: GetUidentityType,
	): Promise<GetUidentityType | GetUidentityType[]> => {
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
