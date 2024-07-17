import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const usersFilePath = path.join(__dirname, "users.json");
const requestsFilePath = path.join(__dirname, "requests.json");

const readFromFile = (filePath: string): any[] => {
	try {
		const data = fs.readFileSync(filePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		console.error(`Ошибка при чтении файла ${filePath}:`, err);
		return [];
	}
};

const writeToFile = (filePath: string, data: any[]): void => {
	try {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
	} catch (err) {
		console.error(`Ошибка при записи файла ${filePath}:`, err);
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
			(req as any).userId = (decoded as any).userId;
			next();
		});
	} else {
		res.status(401).json({ error: "Ошибка аутентификации: отсутствует токен" });
	}
};

app.post(
	"/upload/:username",
	authenticateJWT,
	upload.single("image"),
	(req: Request, res: Response) => {
		const file = req.file;
		const { username } = req.params;

		if (!file) {
			return res.status(400).json({ error: "Файл не был загружен" });
		}

		const users = readFromFile(usersFilePath);
		const userIndex = users.findIndex(
			(user: any) => user.username === username,
		);

		if (userIndex === -1) {
			return res.status(404).json({ error: "Пользователь не найден" });
		}

		users[userIndex].photo = file.originalname;
		writeToFile(usersFilePath, users);

		res
			.status(200)
			.json({ message: "Файл успешно загружен", filename: file.originalname });
	},
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/register", (req: Request, res: Response) => {
	const { username, password, role } = req.body;

	if (!username || !password || !role) {
		return res.status(400).json({ error: "Отсутствуют обязательные поля" });
	}

	const users = readFromFile(usersFilePath);

	const existingUser = users.find((user: any) => user.username === username);
	if (existingUser) {
		return res
			.status(400)
			.json({ error: "Пользователь с таким именем уже существует" });
	}

	const id = generateUniqueId(users);
	const newUser = { id, username, password, role, photo: "" };

	users.push(newUser);
	writeToFile(usersFilePath, users);

	res
		.status(200)
		.json({ message: "Регистрация прошла успешно", user: newUser });
});

app.post("/login", (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ error: "Отсутствуют обязательные поля" });
	}

	const users = readFromFile(usersFilePath);

	const user = users.find(
		(user: any) => user.username === username && user.password === password,
	);
	if (!user) {
		return res
			.status(401)
			.json({ error: "Неверное имя пользователя или пароль" });
	}

	const token = jwt.sign({ userId: user.id }, jwtSecret, {
		expiresIn: "1h",
	});

	res.status(200).json({ message: "Логин успешный", token });
});

app.get("/users/me", authenticateJWT, (req: Request, res: Response) => {
	const userId = (req as any).userId;

	const users = readFromFile(usersFilePath);
	const user = users.find((user: any) => user.id === userId);

	if (!user) {
		return res.status(404).json({ error: "Пользователь не найден" });
	}

	res.status(200).json({
		username: user.username,
		role: user.role,
		photo: user.photo ? `/uploads/${user.photo}` : null,
	});
});

app.post("/requests", authenticateJWT, (req: Request, res: Response) => {
	const { boname, accountant, desc } = req.body;

	const users = readFromFile(usersFilePath);
	const user = users.find((u: any) => u.id === (req as any).userId);

	if (!user || user.role !== "admin") {
		return res.status(403).json({ error: "Недостаточно прав" });
	}

	const id = generateUniqueId(readFromFile(requestsFilePath));
	const requestData = { id, boname, accountant, desc };

	writeToFile(requestsFilePath, [
		...readFromFile(requestsFilePath),
		requestData,
	]);

	res.status(201).json({ message: "Заявка успешно создана", requestData });
});

app.get("/requests", authenticateJWT, (req: Request, res: Response) => {
	const users = readFromFile(usersFilePath);
	const user = users.find((u: any) => u.id === (req as any).userId);

	if (!user || user.role !== "admin") {
		return res.status(403).json({ error: "Недостаточно прав" });
	}

	try {
		const data = fs.readFileSync(requestsFilePath, "utf8");
		const requestData = JSON.parse(data);
		res.status(200).json(requestData);
	} catch (err) {
		console.error("Ошибка при чтении файла requests.json:", err);
		res.status(500).json({ error: "Ошибка сервера при чтении данных" });
	}
});

app.listen(port, () => {
	console.log(`Сервер запущен по адресу http://localhost:${port}`);
});

function generateUniqueId(data: any[]): number {
	const ids = data.map((item) => item.id);
	const maxId = Math.max(...ids, 0);
	return maxId + 1;
}
