import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Импортируем cors для обработки CORS запросов

const app = express();
const port = 3000;

// Промежуточное ПО для парсинга JSON-тела
app.use(bodyParser.json());

// Подключаем обработку CORS
app.use(cors());

// Конечная точка для обработки POST-запросов на регистрацию
app.post("/register", (req: Request, res: Response) => {
	const { username, password, role } = req.body;

	// Пример валидации (следует реализовать более надежную валидацию)
	if (!username || !password || !role) {
		return res.status(400).json({ error: "Отсутствуют обязательные поля" });
	}

	// Пример того, что можно сделать с полученными данными
	console.log(
		`Получен запрос на регистрацию пользователя ${username} с ролью ${role}`,
	);

	// Предполагаем успешное выполнение
	res.status(200).json({ message: "Регистрация прошла успешно" });
});

// Запуск сервера
app.listen(port, () => {
	console.log(`Сервер запущен по адресу http://localhost:${port}`);
});
