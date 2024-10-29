import { z } from "zod";

// Создает схему для объекта с указанными полями и их типами. Определение схемы регистрации и типа.

export const RegScheme = z.object({
  uType: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: z.string().optional(),
  phone: z.string().optional(),
  tax: z.string().optional(),
  email: z.string().optional(),
  orgName: z.string().optional(),
  orgTax: z.string().optional(),
  role: z.string().optional(),
  inn: z.string().optional(),
  organization: z.string().optional(),
  department: z.string().optional(),
  status: z.boolean().optional(),
  passport: z.string().optional(),
  dateChange: z.string().optional(),
});

// Извлекает тип данных, соответствующий схеме RegScheme. Это означает, что RegType будет объектом с теми же полями и типами, что и в схеме.
export type RegType = z.infer<typeof RegScheme>;

// Определяет схему для объекта логина, содержащего имя пользователя и пароль.

export const LogScheme = z.object({
  username: z.string(),
  password: z.string(),
});

// Извлекает тип данных для схемы LogScheme.
export type LogType = z.infer<typeof LogScheme>;

// Определяет схему для объекта, содержащего имя пользователя и путь к фотографии.

export const PhotoScheme = z.object({
  username: z.string(),
  photo: z.string(),
});

// Извлекает тип данных для схемы PhotoScheme.
export type PhotoType = z.infer<typeof PhotoScheme>;

// Определяет схему для ответа на запрос о текущем пользователе.
export const getMeScheme = z.object({
  userId: z.number().optional(),
  uType: z.string(),
  username: z.string(),
  photo: z.string().nullable().optional(),
  fullName: z.string(),
  phone: z.string().optional(),
  tax: z.string().optional(),
  email: z.string().optional(),
  role: z.string(),
  orgName: z.string().optional(),
  orgTax: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  reqIdentity: z.boolean().optional(),
  uIdentity: z.boolean().optional(),
  status: z.boolean().optional(),
  passport: z.string().optional(),
  dateChange: z.string().optional(),
});

export type GetMeType = z.infer<typeof getMeScheme>;

// Проверяет, успешен ли запрос. Если нет, выбрасывает ошибку с текстом ответа сервера.
export const validateResponse = async (
  response: Response
): Promise<Response> => {
  if (!response.ok) {
    throw Error(await response.text());
  }
  return response;
};
export const useAuth = () => {
  // Отправляет POST-запрос на сервер для регистрации нового пользователя с использованием данных, валидированных схемой RegScheme.
  const regMe = async (regData: RegType): Promise<void> => {
    return fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regData),
    }).then(() => undefined);
  };

  // Отправляет POST-запрос на сервер для логина пользователя. При успешном входе сохраняет токен аутентификации в localStorage.
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

  // Получает токен из localStorage и отправляет запрос на сервер для получения информации о текущем пользователе.
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

  // Возвращает функции для регистрации, логина и получения информации о пользователе.
  return {
    regMe,
    logMe,
    getMe,
  };
};
