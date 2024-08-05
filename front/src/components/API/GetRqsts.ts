import z from "zod";

//  Создает схему для объекта с указанными полями и их типами.
const GetRqstsScheme = z.object({
	id: z.number(),
	orgname: z.string(),
	accountant: z.string(),
	desc: z.string(),
});

// Извлекает тип данных из схемы GetRqstsScheme. Это означает, что GetRqsts будет типом объекта с полями id, orgname, accountant, и desc, где значения соответствуют типам, указанным в схеме.
export type GetRqsts = z.infer<typeof GetRqstsScheme>;

export const getRqsts = async (): Promise<GetRqsts[]> => {
	const token = localStorage.getItem("token");
	console.log(`getRqtst Token :${token}`);
	return (
		fetch(`http://localhost:3000/requests`, {
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
			// Применяет схему GetRqstsScheme к каждому элементу массива данных, чтобы убедиться, что они соответствуют ожидаемому формату. Функция z.array(GetRqstsScheme) создает схему для массива объектов, соответствующих GetRqstsScheme.
			.then((data) => z.array(GetRqstsScheme).parse(data))
	);
};
