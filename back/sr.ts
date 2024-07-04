import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const usersFilePath = path.join(__dirname, "users.json");

const readUsersFromFile = (): any[] => {
	try {
		const data = fs.readFileSync(usersFilePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		console.error("Ошибка при чтении файла пользователей:", err);
		return [];
	}
};

const writeUsersToFile = (users: any[]): void => {
	try {
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
	} catch (err) {
		console.error("Ошибка при записи файла пользователей:", err);
	}
};

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

app.post("/upload", upload.single("image"), (req: Request, res: Response) => {
	const file = req.file;
	if (!file) {
		return res.status(400).json({ error: "Файл не был загружен" });
	}
	res
		.status(200)
		.json({ message: "Файл успешно загружен", filename: file.originalname });
});

app.post("/register", (req: Request, res: Response) => {
	const { username, password, role } = req.body;

	if (!username || !password || !role) {
		return res.status(400).json({ error: "Отсутствуют обязательные поля" });
	}

	const users = readUsersFromFile();

	const existingUser = users.find((user: any) => user.username === username);
	if (existingUser) {
		return res
			.status(400)
			.json({ error: "Пользователь с таким именем уже существует" });
	}

	const newUser = { id: users.length + 1, username, password, role };

	users.push(newUser);

	writeUsersToFile(users);

	res
		.status(200)
		.json({ message: "Регистрация прошла успешно", user: newUser });
});

app.post("/login", (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ error: "Отсутствуют обязательные поля" });
	}

	const users = readUsersFromFile();

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

app.listen(port, () => {
	console.log(`Сервер запущен по адресу http://localhost:${port}`);
});
