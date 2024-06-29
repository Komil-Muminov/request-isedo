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

type LogType = z.infer<typeof LogScheme>;

const LogScheme = z.object({
	log: z.string(),
	password: z.string(),
});
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
		return fetch("api/reg", {
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
	// const getMe = (): Promise<void> => {
	// 	return fetch("api/reg", {
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(regData),
	// 	});
	// };
	return {
		regMe,
		logMe,
		// outMe,
		// getMe,
	};
};
