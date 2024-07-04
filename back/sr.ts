import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";

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

// Маршрут для загрузки файла пользователя
app.post(
	"/upload/:username",
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

	res.status(200).json({ message: "Логин успешный", user });
});

// Маршрут для получения информации о пользователе
app.get("/user/:username", (req: Request, res: Response) => {
	const { username } = req.params;

	const users = readUsersFromFile();
	const user = users.find((user: any) => user.username === username);

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

// Запуск сервера
app.listen(port, () => {
	console.log(`Сервер запущен по адресу http://localhost:${port}`);
});
