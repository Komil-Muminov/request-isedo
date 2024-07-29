// Этот код определяет тип данных для пользователя с фотографией и функцию для загрузки фотографии на сервер.
// export type CurrUserPhoto: Определяет и экспортирует новый тип данных CurrUserPhoto, который представляет объект с двумя свойствами:
// username: строка, содержащая имя пользователя.
// file: объект типа File, представляющий файл изображения.
export type CurrUserPhoto = {
  username: string;
  file: File;
};
export const setPhoto = ({ username, file }: CurrUserPhoto): Promise<void> => {
  // Создает новый объект FormData для формирования данных, которые будут отправлены на сервер.
  const formData = new FormData();
  const token = localStorage.getItem("token");

  // Добавляет файл изображения в объект FormData под ключом "image".
  formData.append("image", file);

  // Отправляет POST-запрос на сервер для загрузки изображения
  return fetch(`http://localhost:3000/upload/${username}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(undefined);
};
