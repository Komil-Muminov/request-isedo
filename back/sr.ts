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

// path — это встроенный модуль в Node.js, предназначенный для работы с путями файлов и директорий.
// __dirname содержит абсолютный путь к каталогу, в котором расположен текущий исполняемый файл.
const usersFilePath = path.join(__dirname, "users.json");
const requestsFilePath = path.join(__dirname, "requests.json");
const servicesFilePath = path.join(__dirname, "services.json");

// Модули fs (файловая система) стандартной библиотеки Node.js. Они используются для синхронного чтения и записи файлов.
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

// Reqfiles

const reqFilesStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    // Указывает директорию, куда будут сохраняться загруженные файлы
    cb(null, "reqfiles/");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, file.originalname);
  },
});

const reqFilesUpload = multer({ storage: reqFilesStorage });

// Создаем папку reqfiles, если она не существует
if (!fs.existsSync("reqfiles")) {
  fs.mkdirSync("reqfiles");
}

// ReqFiles

// multer.diskStorage — это функция из библиотеки multer, которая используется для управления загрузкой файлов в Node.js с использованием Express. Она позволяет вам настроить, куда и как будут сохраняться загруженные файлы на сервере. multer — это middleware для обработки multipart/form-data запросов, которые обычно используются для загрузки файлов. multer.diskStorage создает объект конфигурации хранилища для файлов, который позволяет вам указать, куда сохранять загруженные файлы и какие имена им давать.
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    // Указывает директорию, куда будут сохраняться загруженные файлы
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

const jwtSecret = "km"; //your_jwt_secret;

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

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
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

app.post("/register", (req: Request, res: Response) => {
  const {
    uType,
    username,
    password,
    fullName,
    phone,
    tax,
    email,
    orgName,
    orgTax,
    role,
    department,
  } = req.body;

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
    uType,
    username,
    password,
    photo: "",
    fullName,
    phone,
    tax,
    email,
    role,
    orgName,
    orgTax,
    department,
    reqIdentity: false,
    uIdentity: false,
  };

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

app.get("/users/me", authenticateJWT, (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const users = readFromFile(usersFilePath);
  const user = users.find((user: any) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }
  if (user.uType === "kvd") {
    res.status(200).json({
      username: user.username,
      uType: user.uType,
      photo: user.photo ? `/uploads/${user.photo}` : null,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role,
      position: user.position,
      department: user.department,
    });
  }

  res.status(200).json({
    uType: user.uType,
    username: user.username,
    fullName: user.fullName,
    photo: user.photo ? `/uploads/${user.photo}` : null,
    phone: user.phone,
    tax: user.tax,
    email: user.email,
    orgName: user.orgName,
    orgTax: user.orgTax,
    role: user.role,
    department: user.department,
    reqIdentity: user.reqIdentity,
    uIdentity: user.uIdentity,
  });
});

// Express ищет по всему маршруту /requests и когда находит, она понимает что это за запрос и имеет доступ к его response, то есть данным.
app.post("/requests", authenticateJWT, (req: Request, res: Response) => {
  const { body: requestData } = req;
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user || user.uType !== "bo") {
    return res.status(403).json({
      error: `Вы не БО и не можете отправить заявку. Ваш тип: ${
        user?.uType || "неизвестен"
      }`,
    });
  }

  requestData.id = generateUniqueId(readFromFile(requestsFilePath));

  writeToFile(requestsFilePath, [
    ...readFromFile(requestsFilePath),
    requestData,
  ]);

  res.status(201).json({ message: "Заявка успешно создана", requestData });
});

app.get("/requests", authenticateJWT, (req: Request, res: Response) => {
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user || !["bo", "kvd"].includes(user.uType)) {
    return res.status(403).json({ error: "Недостаточно прав" });
  }

  try {
    const requestData = JSON.parse(fs.readFileSync(requestsFilePath, "utf8"));
    res.status(200).json(requestData);
  } catch (err) {
    console.error("Ошибка при чтении файла requests.json:", err);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
});

// Services ==========

app.post("/services", authenticateJWT, (req: Request, res: Response) => {
  const { body: requestData } = req;
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user || user.uType !== "kvd") {
    return res.status(403).json({
      error: `Вы не KVD и не можете выбрать услугу. Ваш тип: ${
        user?.uType || "неизвестен"
      }`,
    });
  }

  requestData.id = generateUniqueId(readFromFile(servicesFilePath));

  writeToFile(servicesFilePath, [
    ...readFromFile(servicesFilePath),
    requestData,
  ]);

  res.status(201).json({ message: "Услуга успешна добавлена", requestData });
});

app.get("/services", authenticateJWT, (req: Request, res: Response) => {
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user || !["bo", "kvd"].includes(user.uType)) {
    return res.status(403).json({ error: "Недостаточно прав" });
  }

  try {
    const requestData = JSON.parse(fs.readFileSync(servicesFilePath, "utf8"));
    res.status(200).json(requestData);
  } catch (err) {
    console.error("Ошибка при чтении файла requests.json:", err);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
});

// reqfiles
// app.post(
// 	"/reqfiles",
// 	authenticateJWT,
// 	reqFilesUpload.single("reqfiles"),
// 	(req: Request, res: Response) => {
// 		if (!req.file) {
// 			return res.status(400).json({ error: "Файл не был загружен 2222" });
// 		}

// 		const uploadedFile = {
// 			url: `/reqfiles/${req.file.filename}`,
// 		};

// 		res
// 			.status(200)
// 			.json({ message: "Файл успешно загружен", file: uploadedFile });
// 	},
// );

// app.get("/reqfiles", authenticateJWT, (req: Request, res: Response) => {
// 	fs.readdir("reqfiles", (err, files) => {
// 		if (err) {
// 			console.error("Ошибка при чтении файлов из папки reqfiles:", err);
// 			return res
// 				.status(500)
// 				.json({ error: "Ошибка сервера при чтении файлов" });
// 		}

// 		const fileObjects = files.map((file) => ({
// 			filename: file,
// 			url: `/reqfiles/${file}`,
// 		}));

// 		res.status(200).json(fileObjects);
// 	});
// });

// app.use("/reqfiles", express.static(path.join(__dirname, "reqfiles")));

// reqfiles

app.get("/account/show/:id", authenticateJWT, (req: Request, res: Response) => {
  const showId = parseInt(req.params.id, 10); // Получаем id из URL-параметров

  if (isNaN(showId)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  const requests = readFromFile(requestsFilePath);
  const show = requests.find((show: any) => show.id === showId);

  if (!show) {
    return res.status(404).json({ error: "Заявка не найдена" });
  }

  res.status(200).json({
    id: show.id,
    fullName: show.fullName,
    role: show.role,
    phone: show.phone,
    email: show.email,
    tax: show.tax,
    orgTax: show.orgTax,
    orgName: show.orgName,
    reqType: show.reqType,
    stepCode: show.stepCode,
    dateTime: show.dateTime,
    files: show.files,
  });
});

app.post("/logout", authenticateJWT, (req: Request, res: Response) => {
  res.status(200).json({ message: "Выход успешный" });
});

// Uidentity -  state=== !reqIdentity , !uIdentity
app.post("/uidentity", authenticateJWT, (req: Request, res: Response) => {
  const { orgName, departmentName, post, file } = req.body;

  if (!orgName || !departmentName || !post || !file) {
    return res.status(400).json({ error: "Отсутствуют обязательные поля" });
  }

  const userId = (req as any).userId;
  const users = readFromFile(usersFilePath);
  const userIndex = users.findIndex((user: any) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }

  users[userIndex].reqIdentity = true;
  users[userIndex].uIdentity = true;

  writeToFile(usersFilePath, users);

  res.status(200).json({ message: "Данные идентичности успешно обновлены" });
});

app.get("/uidentity", authenticateJWT, (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const users = readFromFile(usersFilePath);
  const user = users.find((user: any) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }

  res.status(200).json({
    reqIdentity: user.reqIdentity,
    uIdentity: user.uIdentity,
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен по адресу http://localhost:${port}`);
});

function generateUniqueId(data: any[]): number {
  const ids = data.map((item) => item.id);
  const maxId = Math.max(...ids, 0);
  return maxId + 1;
}
