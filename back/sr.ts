// express: основной веб-фреймворк для создания серверного приложения.
import express, { Request, Response } from "express";
// bodyParser: используется для обработки JSON-запросов.
import bodyParser from "body-parser";
// cors: позволяет обрабатывать запросы с других доменов.
import cors from "cors";
// fs и path: модули для работы с файловой системой.
import fs from "fs";
import path from "path";
// multer: middleware для обработки multipart/form-data, используется для загрузки файлов.
import multer from "multer";
// jsonwebtoken: библиотека для работы с JSON Web Tokens (JWT).
import jwt from "jsonwebtoken";

// Создается экземпляр приложения Express.
const app = express();
// Задается порт, на котором будет работать сервер.
const port = 3000;

// Middleware для обработки JSON и CORS.
app.use(bodyParser.json());
app.use(cors());

const usersFilePath = path.join(__dirname, "users.json");
const requestsFilePath = path.join(__dirname, "requests.json");

// readFromFile: функция для чтения данных из файла.
const readFromFile = (filePath: string): any[] => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Ошибка при чтении файла ${filePath}:`, err);
    return [];
  }
};

// writeToFile: функция для записи данных в файл.
const writeToFile = (filePath: string, data: any[]): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(`Ошибка при записи файла ${filePath}:`, err);
  }
};

// Конфигурация хранилища для загрузки файлов, где указывается директория и имя файла.
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "uploads/");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Middleware для проверки JWT токена. Если токен валидный, добавляется userId в запрос.
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

// Загрузка файла и обновление данных пользователя.
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
      (user: any) => user.username === username
    );

    if (userIndex === -1) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    users[userIndex].photo = file.originalname;
    writeToFile(usersFilePath, users);

    res
      .status(200)
      .json({ message: "Файл успешно загружен", filename: file.originalname });
  }
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Регистрация нового пользователя и сохранение его данных.
app.post("/register", (req: Request, res: Response) => {
  const { username, password, uType, fullName, number, role, tax, email } =
    req.body;

  if (!username || !password || !uType) {
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
  const newUser = {
    id,
    username,
    password,
    uType,
    photo: "",
    fullName,
    number,
    role,
    tax,
    email,
  };

  users.push(newUser);
  writeToFile(usersFilePath, users);

  res
    .status(200)
    .json({ message: "Регистрация прошла успешно", user: newUser });
});

// Аутентификация пользователя и генерация JWT токена.
app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Отсутствуют обязательные поля" });
  }

  const users = readFromFile(usersFilePath);

  const user = users.find(
    (user: any) => user.username === username && user.password === password
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

// Получение данных текущего пользователя на основе JWT токена.
app.get("/users/me", authenticateJWT, (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const users = readFromFile(usersFilePath);
  const user = users.find((user: any) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }

  res.status(200).json({
    username: user.username,
    uType: user.uType,
    photo: user.photo ? `/uploads/${user.photo}` : null,
    fullName: user.fullName,
    number: user.number,
    role: user.role,
    tax: user.tax,
    email: user.email,
  });
});

// Создание новой заявки и получение всех заявок для пользователя с правами "bo".
app.post("/requests", authenticateJWT, (req: Request, res: Response) => {
  const { orgname, accountant, desc } = req.body;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === (req as any).userId);

  if (!user || user.uType !== "bo") {
    return res.status(403).json({ error: "Недостаточно прав" });
  }

  const id = generateUniqueId(readFromFile(requestsFilePath));
  const requestData = { id, orgname, accountant, desc };

  writeToFile(requestsFilePath, [
    ...readFromFile(requestsFilePath),
    requestData,
  ]);

  res.status(201).json({ message: "Заявка успешно создана", requestData });
});

app.get("/requests", authenticateJWT, (req: Request, res: Response) => {
  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === (req as any).userId);

  if (!user || user.uType !== "bo") {
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

// Выход пользователя из системы (в данном случае просто возвращается сообщение об успешном выходе).
app.post("/logout", authenticateJWT, (req: Request, res: Response) => {
  res.status(200).json({ message: "Выход успешный" });
});

// Запуск сервера на указанном порту.
app.listen(port, () => {
  console.log(`Сервер запущен по адресу http://localhost:${port}`);
});

// Функция для генерации уникальных идентификаторов на основе существующих данных.
function generateUniqueId(data: any[]): number {
  const ids = data.map((item) => item.id);
  const maxId = Math.max(...ids, 0);
  return maxId + 1;
}
