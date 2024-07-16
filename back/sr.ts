import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import jwt from "jsonwebtoken";

// Импорт функций для авторизации
import {
	createToken,
	authorizeToken,
	authorizeRequest,
	authorizeResponse,
	unauthorizeResponse,
} from "./authFunctions";

const app = express();
const port = 3000;

// Middleware для парсинга JSON и поддержки CORS
app.use(bodyParser.json());
app.use(cors());

const usersFilePath = path.join(__dirname, "users.json");

// Функция для чтения пользователей из файла
const readUsersFromFile = (): any[] => {
	try {
		const data = fs.readFileSync(usersFilePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		console.error("Ошибка при чтении файла пользователей:", err);
		return [];
	}
};

// Функция для записи пользователей в файл
const writeUsersToFile = (users: any[]): void => {
	try {
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
	} catch (err) {
		console.error("Ошибка при записи файла пользователей:", err);
	}
};

// Конфигурация для загрузки файлов
const storage = multer.diskStorage({
	destination: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, destination: string) => void,
	) => {
		cb(null, "uploads/");
	},
	filename: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, filename: string) => void,
	) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

// Middleware для проверки JWT
const jwtSecret = "your_jwt_secret";

const authenticateJWT = (req: Request, res: Response, next: () => void) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (token) {
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				return res
					.status(401)
					.json({ error: "Ошибка аутентификации: неверный токен" });
			}
			// Добавление декодированных данных в объект запроса для использования в следующем middleware
			(req as any).userId = (decoded as any).userId; // Добавляем userId в объект запроса
			next();
		});
	} else {
		res.status(401).json({ error: "Ошибка аутентификации: отсутствует токен" });
	}
};

// Маршрут для загрузки файла пользователя
app.post(
	"/upload/:username",
	authenticateJWT,
	upload.single("image"),
	(req: Request, res: Response) => {
		const file = req.file;
		const { username } = req.params;

		// Проверка, был ли загружен файл
		if (!file) {
			return res.status(400).json({ error: "Файл не был загружен" });
		}

		const users = readUsersFromFile();
		const userIndex = users.findIndex(
			(user: any) => user.username === username,
		);

		// Проверка, существует ли пользователь
		if (userIndex === -1) {
			return res.status(404).json({ error: "Пользователь не найден" });
		}

		// Обновление информации о фото пользователя
		users[userIndex].photo = file.originalname;
		writeUsersToFile(users);

		res
			.status(200)
			.json({ message: "Файл успешно загружен", filename: file.originalname });
	},
);

// Маршрут для обслуживания загруженных файлов
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Маршрут для регистрации нового пользователя
app.post("/register", (req: Request, res: Response) => {
	const { username, password, role } = req.body;

	// Проверка обязательных полей
	if (!username || !password || !role) {
		return res.status(400).json({ error: "Отсутствуют обязательные поля" });
	}

	const users = readUsersFromFile();

	// Проверка, существует ли уже пользователь с таким именем
	const existingUser = users.find((user: any) => user.username === username);
	if (existingUser) {
		return res
			.status(400)
			.json({ error: "Пользователь с таким именем уже существует" });
	}

	// Создание нового пользователя
	const newUser = { id: users.length + 1, username, password, role, photo: "" };

	users.push(newUser);

	writeUsersToFile(users);

	res
		.status(200)
		.json({ message: "Регистрация прошла успешно", user: newUser });
});

// Маршрут для входа пользователя
app.post("/login", (req: Request, res: Response) => {
	const { username, password } = req.body;

	// Проверка обязательных полей
	if (!username || !password) {
		return res.status(400).json({ error: "Отсутствуют обязательные поля" });
	}

	const users = readUsersFromFile();

	// Поиск пользователя по имени и паролю
	const user = users.find(
		(user: any) => user.username === username && user.password === password,
	);
	if (!user) {
		return res
			.status(401)
			.json({ error: "Неверное имя пользователя или пароль" });
	}

	// Генерация JWT
	const token = jwt.sign({ userId: user.id }, jwtSecret, {
		expiresIn: "1h", // Время жизни токена
	});

	// Устанавливаем токен в куки
	authorizeResponse(res, user.id);

	res.status(200).json({ message: "Логин успешный", token });
});

// Маршрут для получения информации о пользователе
app.get("/users/me", authenticateJWT, (req: Request, res: Response) => {
	const userId = (req as any).userId; // Получаем userId из объекта запроса

	const users = readUsersFromFile();
	const user = users.find((user: any) => user.id === userId);

	// Проверка, существует ли пользователь
	if (!user) {
		return res.status(404).json({ error: "Пользователь не найден" });
	}

	res.status(200).json({
		username: user.username,
		role: user.role,
		photo: user.photo ? `/uploads/${user.photo}` : null,
	});
});

// -----------------------------------------------------------------------
/**
 * ЗАПРОСЫ
 */

app.post("/requests", authenticateJWT, (req: Request, res: Response) => {
	const { boname, accountant, desc } = req.body;

	// Проверка роли пользователя
	const users = readUsersFromFile();
	const user = users.find((u: any) => u.id === (req as any).userId);

	if (!user || user.role !== "admin") {
		return res.status(403).json({ error: "Недостаточно прав" });
	}

	// Создание файла request.json и сохранение данных
	const requestData = { boname, accountant, desc };
	fs.writeFileSync(
		"request.json",
		JSON.stringify(requestData, null, 2),
		"utf8",
	);

	res.status(201).json({ message: "Заявка успешно создана" });
});

// Маршрут для получения данных из request.json
app.get("/requests", authenticateJWT, (req: Request, res: Response) => {
	// Проверка роли пользователя
	const users = readUsersFromFile();
	const user = users.find((u: any) => u.id === (req as any).userId);

	if (!user || user.role !== "admin") {
		return res.status(403).json({ error: "Недостаточно прав" });
	}

	try {
		// Чтение данных из файла request.json
		const data = fs.readFileSync("request.json", "utf8");
		const requestData = JSON.parse(data);
		res.status(200).json(requestData);
	} catch (err) {
		console.error("Ошибка при чтении файла request.json:", err);
		res.status(500).json({ error: "Ошибка сервера при чтении данных" });
	}
});

// -----------------------------------------------------------------------

// Запуск сервера
app.listen(port, () => {
	console.log(`Сервер запущен по адресу http://localhost:${port}`);
});
