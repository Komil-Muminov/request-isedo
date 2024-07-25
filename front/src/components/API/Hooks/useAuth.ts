import { z } from "zod";

export const RegScheme = z.object({
	username: z.string(),
	password: z.string().min(3),
	uType: z.string().min(1),
});

export type RegType = z.infer<typeof RegScheme>;

export const LogScheme = z.object({
	username: z.string(),
	password: z.string(),
});

export type LogType = z.infer<typeof LogScheme>;

export const PhotoScheme = z.object({
	username: z.string(),
	photo: z.string(),
});

export type PhotoType = z.infer<typeof PhotoScheme>;

export const useAuth = () => {
	// Функция для получения токена из localStorage или другого источника
	// const getToken = (): string | null => {
	// 	return localStorage.getItem("token");
	// };

	// Валидация ответа от сервера
	const validateResponse = async (response: Response): Promise<Response> => {
		if (!response.ok) {
			throw Error(await response.text());
		}
		return response;
	};

	// Регистрация пользователя
	const regMe = async (regData: RegType): Promise<void> => {
		return fetch("http://localhost:3000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(regData),
		}).then(() => undefined);
	};

	// Логин пользователя
	const logMe = async (logData: LogType): Promise<void> => {
		return fetch(`http://localhost:3000/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(logData),
		})
			.then(validateResponse)
			.then(async (response) => {
				return response.json().then((data) => {
					localStorage.setItem("token", data.token);
				});
			});
	};

	// Получение информации о текущем пользователе
	const getMeScheme = z.object({
		username: z.string(),
		uType: z.string(),
		photo: z.string().nullable(),
	});

	type GetMeType = z.infer<typeof getMeScheme>;

	const getMe = async (): Promise<GetMeType> => {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("Токен отсутствует");
		}

		return fetch(`http://localhost:3000/users/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(validateResponse)
			.then((response) => response.json())
			.then((data) => getMeScheme.parse(data));
	};

	return {
		regMe,
		logMe,
		getMe,
	};
};
