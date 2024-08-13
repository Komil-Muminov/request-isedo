import { validateResponse } from "./useAuth";
// Этот код определяет тип данных для пользователя с фотографией и функцию для загрузки фотографии на сервер.
// export type CurrUserPhoto: Определяет и экспортирует новый тип данных CurrUserPhoto, который представляет объект с двумя свойствами:
// username: строка, содержащая имя пользователя.
// file: объект типа File, представляющий файл изображения.
export type CurrUserPhoto = {
	username: string;
	token: string;
	file: File;
};

export const setUphoto = async ({ username, token, file }: CurrUserPhoto) => {
	const formData = new FormData();
	formData.append("uImage", file);
	return fetch(`http://localhost:3000/upload/${username}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	}).then(validateResponse);
};
