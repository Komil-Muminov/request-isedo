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

export const useAuth = () => {
	const regMe = (regData: RegType): Promise<void> => {
		return fetch("api/reg", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(regData),
		}).then(() => undefined);
	};

	const LogScheme = z.object({
		log: z.string(),
		password: z.string(),
	});

	type LogType = z.infer<typeof LogScheme>;
	const validateLog = async (response: Response): Promise<Response> => {
		if (!response.ok) {
			throw new Error(await response.text());
		}
		return response;
	};
	const logMe = (LogData: LogType): Promise<void> => {
		return fetch("api/reg", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(LogData),
		})
			.then(validateLog)
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
