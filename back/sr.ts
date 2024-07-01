import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

// Промежуточное ПО для парсинга JSON-тела
app.use(bodyParser.json());

// Подключаем обработку CORS
app.use(cors());

// Путь к файлу с пользователями
const usersFilePath = path.join(__dirname, "users.json");

// Функция для чтения данных из JSON-файла
const readUsersFromFile = (): any[] => {
	try {
		const data = fs.readFileSync(usersFilePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		console.error("Ошибка при чтении файла пользователей:", err);
		return [];
	}
};

// Функция для записи данных в JSON-файл
const writeUsersToFile = (users: any[]): void => {
	try {
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
	} catch (err) {
		console.error("Ошибка при записи файла пользователей:", err);
	}
};

// Конечная точка для обработки POST-запросов на регистрацию
app.post("/register", (req: Request, res: Response) => {
	const { username, password, role } = req.body;

	// Пример валидации (следует реализовать более надежную валидацию)
	if (!username || !password || !role) {
		return res.status(400).json({ error: "Отсутствуют обязательные поля" });
	}

	// Читаем текущих пользователей из файла
	const users = readUsersFromFile();

	// Проверка на существующего пользователя (по имени пользователя)
	const existingUser = users.find((user) => user.username === username);
	if (existingUser) {
		return res
			.status(400)
			.json({ error: "Пользователь с таким именем уже существует" });
	}

	// Создаем нового пользователя
	const newUser = { id: users.length + 1, username, password, role };

	// Добавляем нового пользователя в массив
	users.push(newUser);

	// Записываем обновленный массив пользователей в файл
	writeUsersToFile(users);

	// Предполагаем успешное выполнение
	res
		.status(200)
		.json({ message: "Регистрация прошла успешно", user: newUser });
});

// Запуск сервера
app.listen(port, () => {
	console.log(`Сервер запущен по адресу http://localhost:${port}`);
});
