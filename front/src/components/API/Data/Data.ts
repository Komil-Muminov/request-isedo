// import { z } from "zod";

// const RowsScheme = z.object({
// 	id: z.number(),
// 	date: z.date(),
// 	type: z.string(),
// 	region: z.string(),
// });

// const ColScheme = z.object({
// 	id: z.string(),
// 	date: z.string(),
// 	type: z.string(),
// 	region: z.string(),
// 	userName: z.string(),
// });

// export type RowType = z.infer<typeof RowsScheme>;
// export type ColType = z.infer<typeof ColScheme>;

// export const Col: ColType[] = [
// 	{
// 		id: "ID",
// 		date: "Дата",
// 		type: "Тип",
// 		region: "Регион",
// 		userName: "Пользователь",
// 	},
// ];

// export const Row: RowType[] = [
// 	{
// 		id: 1,
// 		date: new Date(),
// 		type: "Получение токена",
// 		region: "ГБАО",
// 	},
// ];
