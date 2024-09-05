import z from "zod";

export const UidentityScheme = z.object({
	inn: z.string().optional(),
	organization: z.string().optional(),
	fullName: z.string().optional(),
	role: z.string().optional(),
	file: z.string().optional().optional(),
	sku: z.string().optional(),
	// department: z.string().optional(),
	// login: z.string().optional(),
	// certificatID: z.string().optional(),
	// Определить типы и ...
});

export type UidentityType = z.infer<typeof UidentityScheme>;

export const useUidentity = () => {
	const token = localStorage.getItem("token");
	// const;
	const postUidentity = async (data: UidentityType): Promise<void> => {
		return fetch(`http://localhost:3000/uidentity`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then(undefined);
	};

	const getUidentity = async (): Promise<UidentityType[]> => {
		return fetch(`http:localhost:3000/udentity`, {
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
			.then((data) => UidentityScheme.parse(data))
			.then(undefined);
	};
	return {
		postUidentity,
		getUidentity,
	};
};
