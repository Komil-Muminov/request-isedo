import z from "zod";

//  Создает схему для объекта с указанными полями и их типами.
// export const GetRqstsScheme = z.object({
//   id: z.number(),
//   orgname: z.string(),
//   accountant: z.string(),
//   desc: z.string(),
//   reqType: z.string(),
//   reqStatus: z.string(),
//   dateTime: z.string(), // Так как после добавление dateTime zod не отображал другие данные и ошибка не падала, пришлось извлечь эту либу из запроса
// });

export interface GetRqstsType {
  id: number;
  orgname: string;
  accountant: string;
  desc: string;
  reqType: string;
  reqStatus: string;
  dateTime: string;
}

// Извлекает тип данных из схемы GetRqstsScheme. Это означает, что GetRqsts будет типом объекта с полями id, orgname, accountant, и desc, где значения соответствуют типам, указанным в схеме.
// export type GetRqsts = z.infer<typeof GetRqstsScheme>;

export const getRqsts = async (): Promise<GetRqstsType[]> => {
  const token = localStorage.getItem("token");
  console.log(`getRqtst Token :${token}`);
  return fetch(`http://localhost:3000/requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Недостаточно прав");
    }
    return response.json();
  });
  // Применяет схему GetRqstsScheme к каждому элементу массива данных, чтобы убедиться, что они соответствуют ожидаемому формату. Функция z.array(GetRqstsScheme) создает схему для массива объектов, соответствующих GetRqstsScheme.
  //   .then((data) => z.array(GetRqstsScheme).parse(data))
};
