import { RegType } from "../../Hooks/useAuth";
export const useAuth = () => {
	/**
	 *Валидация запросов
	 */

	const validateResponse = async (response: Response): Promise<Response> => {
		if (!response.ok) {
			throw Error(await response.text());
		}
		return response;
	};

	/**
	 *Регистрация пользователя
	 */
	const regUser = (RegData: RegType): Promise<void> => {
		return fetch(`regUrl`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(RegData),
		})
			.then(validateResponse)
			.then(undefined);
	};
	return {
		validateResponse,
		regUser,
	};
};

// const regUser = (regType: RegType): Promise<void> => {
//     return fetch(`apiUrl`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(regType),
//     })
//     .then(response => {
//         return validateResponse(response);
//     });
// };
