/**
 * Кастомный хук внутри которого есть запросы
 */

import { z } from "zod";

export const RegScheme = z.object({
	username: z.string(),
	password: z.string().max(3),
	role: z.string().max(1),
});

export type RegType = z.infer<typeof RegScheme>;

const LogScheme = z.object({
	username: z.string(),
	password: z.string(),
});

export type LogType = z.infer<typeof LogScheme>;

// const getType = z.object({
// 	username: z.string(),
// 	role: z.string(),
// 	image: z.string().nullable(),
// });

// Надо реализовать запрос
const PhotoScheme = z.object({
	username: z.string(),
	photo: z.string(),
});
export type PhotoType = z.infer<typeof PhotoScheme>;

export const useAuth = () => {
	/**
	 * Валидация запросов
	 */
	const validateResponse = async (response: Response): Promise<Response> => {
		if (!response.ok) {
			throw Error(await response.text());
		}
		return response;
	};

	/**
	 * Регистрация
	 */
	const regMe = async (regData: RegType): Promise<void> => {
		return fetch("http://localhost:3000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(regData),
		}).then(() => undefined);
	};

	/**
	 * Логинация
	 */
	const logMe = (LogData: LogType): Promise<void> => {
		return fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(LogData),
		})
			.then(validateResponse)
			.then(() => undefined);
	};

	// const outMe = (): Promise<void> => {
	// 	return fetch("api/reg", {
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(regData),
	// 	});
	// };
	const getMe = (): Promise<RegType> => {
		return fetch("http://localhost:3000/users/")
			.then(validateResponse)
			.then((response) => response.json())
			.then((data) => RegScheme.parse(data));
	};

	return {
		regMe,
		logMe,
		getMe,
		// outMe,
	};
};
