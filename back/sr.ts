import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import jwt from "jsonwebtoken";
import pdf from "pdf-parse";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// path — это встроенный модуль в Node.js, предназначенный для работы с путями файлов и директорий.
// __dirname содержит абсолютный путь к каталогу, в котором расположен текущий исполняемый файл.
const organizationsFilePath = path.join(__dirname, "organizations.json");
const usersFilePath = path.join(__dirname, "users.json");
const requestsFilePath = path.join(__dirname, "requests.json");
const servicesFilePath = path.join(__dirname, "services.json");
const certificatesFilePath = path.join(__dirname, "certificates.json");
const vpnFilePath = path.join(__dirname, "vpn.json");
const uidentityFilePath = path.join(__dirname, "uidentity.json");
const invoicesFilePath = path.join(__dirname, "invoices.json");
if (!fs.existsSync(uidentityFilePath)) {
  fs.writeFileSync(uidentityFilePath, JSON.stringify([]), "utf8");
}

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

// PDF Extract

// Конфигурация для загрузки файлов
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
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Маршрут для загрузки PDF
app.post(
  "/upload-pdf",
  upload.single("file"),
  (req: Request, res: Response) => {
    const filePath = req.file?.path;

    if (!filePath) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const dataBuffer = fs.readFileSync(filePath);

    pdf(dataBuffer)
      .then((data) => {
        const text: string = data.text;
        console.log("Extracted text:", text); // Логируем весь текст PDF,

        const cleanedText = text.replace(/\s+/g, " ").trim(); // Убираем лишние пробелы и переводы строк

        // Извлечение данных
        const identificatorInvoice = extractData(
          cleanedText,
          /Ҳисобнома-фактураи андоз аз арзиши иловашуда ва аксизҳо №\s*(\d+)/
        );
        const invoiceNumber = extractData(
          cleanedText,
          /Силсилаи\s*BI\s*№\s*(\d+)/
        );
        const formattedInvoiceNumber = `BI${invoiceNumber}`;
        const date = extractData(
          cleanedText,
          /Санаи навишт\s*([\d]+\s*\w+\s*\d+)/
        );
        const supplier = extractData(cleanedText, /Ном\s+([^\d]+)\s+суроға/);
        const supplierTaxId = extractData(
          cleanedText,
          /Рақами\s+мушаххаси\s+андозсупоранда\s*(\d+)/
        );
        const buyer = extractData(cleanedText, /Ном\s+СМАБХ н. Рудаки/);
        const buyerTaxId = extractData(
          cleanedText,
          /мушаххаси\s+андозсупоранда\s+(\d+)/
        );
        const service = extractData(cleanedText, /Хизматрасонии\s+[^\n]+/);

        const totalAmount = extractData(
          cleanedText,
          /Арзиши умумӣ\s+([\d,]+)\s+/
        );

        // Отправляем результат в ответ
        res.json({
          identificatorInvoice,
          invoiceNumber: formattedInvoiceNumber,
          date,
          supplier,
          supplierTaxId,
          buyer,
          buyerTaxId,
          service,
          totalAmount,
        });
      })
      .catch((err: Error) => {
        res
          .status(500)
          .json({ error: "Error extracting PDF data", details: err });
      });
  }
);

function extractData(cleanedText: string, regex: RegExp) {
  const match = cleanedText.match(regex);
  return match ? match[1] : null;
}

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
// const storage = multer.diskStorage({
//   destination: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, destination: string) => void
//   ) => {
//     // Указывает директорию, куда будут сохраняться загруженные файлы
//     cb(null, "uploads/");
//   },
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, filename: string) => void
//   ) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

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
    inn,
    organization,
    orgTax,
    role,
    department,
    passport,
  } = req.body;

  if (!password || !uType) {
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

  if (uType !== "kvd") {
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
      status: true,
      passport,
    };
    users.push(newUser);
    writeToFile(usersFilePath, users);

    res
      .status(200)
      .json({ message: "Регистрация прошла успешно", user: newUser });
  } else {
    const newUser = {
      id,
      uType,
      username,
      role,
      password,
      photo: "",
      fullName,
      phone,
      tax,
      email,
      orgName,
      orgTax,
      department,
      status: true,
      passport,
    };
    users.push(newUser);
    writeToFile(usersFilePath, users);

    res.status(200).json({
      message: `Уважаемый(я) ${username} Вы прошли регистрацию`,
      user: newUser,
    });
  }
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

// Выход пользователя из системы (в данном случае  возвращается сообщение об успешном выходе).
app.post("/logout", authenticateJWT, (req: Request, res: Response) => {
  res.status(200).json({ message: "Выход успешный" });
});

// users/me
app.get("/users/me", authenticateJWT, (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const users = readFromFile(usersFilePath);
  const user = users.find((user: any) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }
  if (user.uType === "kvd") {
    res.status(200).json({
      userId: userId,
      username: user.username,
      uType: user.uType,
      photo: user.photo ? `/uploads/${user.photo}` : null,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role,
      position: user.position,
      department: user.department,
      status: user.status,
      passport: user.passport,
    });
  }

  res.status(200).json({
    userId: userId,
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
    status: user.status,
    passport: user.passport,
  });
});

// Get Organizations

app.get("/organizations", authenticateJWT, (req: Request, res: Response) => {
  try {
    const organizationsData = JSON.parse(
      fs.readFileSync(organizationsFilePath, "utf8")
    );
    res.status(200).json(organizationsData);
  } catch (err) {
    console.error("Ошибка при чтении файла organizations.json:", err);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
});

// PUT Add User to Organization

app.put(
  "/organizations/:id",
  authenticateJWT,
  (req: Request, res: Response) => {
    const { userId } = req.body; // Получаем userId из тела запроса
    const organizationId = parseInt(req.params.id); // Получаем ID организации из параметров

    // Чтение пользователей из файла
    const users = readFromFile(usersFilePath);
    const user = users.find((u: any) => u.id === userId);

    try {
      // Чтение данных организаций из файла
      const organizationData = JSON.parse(
        fs.readFileSync(organizationsFilePath, "utf8")
      );

      // Поиск организации по ID
      const organization = organizationData.find(
        (org: any) => org.id === organizationId
      );

      // Если организация не найдена
      if (!organization) {
        return res.status(404).json({ error: "Организация не найдена" });
      }

      // Проверяем, есть ли уже такой userId в userIds
      if (!organization.userIds.includes(userId)) {
        // Если нет, добавляем
        organization.userIds.push(userId);
      }

      // Запись изменений обратно в файл
      fs.writeFileSync(
        organizationsFilePath,
        JSON.stringify(organizationData, null, 2)
      );

      // Возвращаем обновлённую организацию
      res.status(200).json(organization);
    } catch (err) {
      console.error("Ошибка при обновлении организации:", err);
      res.status(500).json({ error: "Ошибка сервера при обновлении данных" });
    }
  }
);

// All Users

app.get("/users", authenticateJWT, (req: Request, res: Response) => {
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user || !["bo", "kvd"].includes(user.uType)) {
    return res.status(403).json({ error: "Недостаточно прав" });
  }

  try {
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
    res.status(200).json(usersData);
  } catch (err) {
    console.error("Ошибка при чтении файла users.json:", err);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
});

// Express ищет по всему маршруту /requests и когда находит, она понимает что это за запрос и имеет доступ к его response, то есть данным.
// Добавить новые поля и функционал
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

// PUT Request Add Services

app.put("/requests/:id", authenticateJWT, (req: Request, res: Response) => {
  const { services } = req.body; // Получаем массив ids услуг
  const requestId = parseInt(req.params.id); // Получаем ID заявки из параметров

  try {
    // Чтение данных заявки из файла
    const requestData = JSON.parse(fs.readFileSync(requestsFilePath, "utf8"));

    // Поиск заявки по ID
    const request = requestData.find((rqst: any) => rqst.id === requestId);

    // Если заявка не найдена
    if (!request) {
      return res.status(404).json({ error: "Заявка не найдена" });
    }

    // Добавляем только те id, которых ещё нет в массиве services
    request.services = [...new Set([...request.services, ...services])];

    // Запись изменений обратно в файл
    fs.writeFileSync(requestsFilePath, JSON.stringify(requestData, null, 2));

    // Возвращаем обновлённую организацию
    res.status(200).json(request);
  } catch (err) {
    console.error("Ошибка при обновлении заявки:", err);
    res.status(500).json({ error: "Ошибка сервера при обновлении данных" });
  }
});

// Request BY ID GET
app.get("/account/show/:id", authenticateJWT, (req: Request, res: Response) => {
  const showId = parseInt(req.params.id, 10); // Получаем id из URL-параметров

  if (isNaN(showId)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  const requests = readFromFile(requestsFilePath);
  const show = requests.find((request: any) => request.id === showId);

  if (!show) {
    return res.status(404).json({ error: "Заявка не найдена" });
  }
  res.status(200).json(show); // Возвращаем только найденную заявку
});

// Services ==========

app.get("/services", authenticateJWT, (req: Request, res: Response) => {
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user || !["bo", "kvd"].includes(user.uType)) {
    return res.status(403).json({ error: "Недостаточно прав" });
  }

  try {
    const servicesData = JSON.parse(fs.readFileSync(servicesFilePath, "utf8"));
    res.status(200).json(servicesData);
  } catch (err) {
    console.error("Ошибка при чтении файла services.json:", err);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
});

// Certificates ============

// POST Certificates

app.post("/certificates", authenticateJWT, (req: Request, res: Response) => {
  const { body: requestData } = req;
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  // Проверка, что пользователь существует и является "kvd"
  if (!user || user.uType !== "kvd") {
    return res.status(403).json({
      error: `Вы не kvd и не можете вложить сертификат. Ваш тип: ${
        user?.uType || "неизвестен"
      }`,
    });
  }

  const certificates = readFromFile(certificatesFilePath);

  // Проверка, если userId уже существует в массиве сертификатов
  const existingCertificate = certificates.find(
    (cert: any) => cert.userId === Number(requestData.userId) // Преобразуем userId в число
  );

  if (existingCertificate) {
    return res.status(409).json({
      error: "Сертификат для данного пользователя уже существует.",
    });
  }

  // Генерация уникального ID и добавление сертификата
  requestData.id = generateUniqueId(certificates);

  writeToFile(certificatesFilePath, [...certificates, requestData]);

  return res
    .status(201)
    .json({ message: "Сертификат успешно добавлен", requestData });
});

// GET Certificates

app.get("/certificates", authenticateJWT, (req: Request, res: Response) => {
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user || !["bo", "kvd"].includes(user.uType)) {
    return res.status(403).json({ error: "Недостаточно прав" });
  }

  try {
    const certificateData = JSON.parse(
      fs.readFileSync(certificatesFilePath, "utf8")
    );
    res.status(200).json(certificateData);
  } catch (err) {
    console.error("Ошибка при чтении файла certificates.json:", err);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
});

// PUT Certificates

app.put("/certificates/:id", authenticateJWT, (req: Request, res: Response) => {
  const { userId } = req as any; // Получаем ID пользователя из токена
  const certificateId = parseInt(req.params.id); // Получаем ID сертификата из параметров
  const { statusCode } = req.body; // Ожидаем, что в body будет передан новый statusCode

  // Чтение пользователей из файла
  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  // Проверяем, имеет ли пользователь права для внесения изменений
  if (!user || user.uType !== "kvd") {
    return res.status(403).json({
      error: `Вы не имеете прав для изменения сертификатов. Ваш тип: ${
        user?.uType || "неизвестен"
      }`,
    });
  }

  try {
    // Чтение данных сертификатов из файла
    const certificateData = JSON.parse(
      fs.readFileSync(certificatesFilePath, "utf8")
    );

    // Поиск сертификата по ID
    const certificate = certificateData.find(
      (cert: any) => cert.id === certificateId
    );

    // Если сертификат не найден
    if (!certificate) {
      return res.status(404).json({ error: "Сертификат не найден" });
    }

    // Проверяем, был ли передан корректный статус
    if (typeof statusCode !== "number") {
      return res.status(400).json({ error: "Неверный формат statusCode" });
    }

    // Обновление statusCode сертификата
    certificate.statusCode = statusCode;

    // Запись изменений обратно в файл
    fs.writeFileSync(
      certificatesFilePath,
      JSON.stringify(certificateData, null, 2)
    );

    // Возвращаем обновлённый сертификат
    res.status(200).json(certificate);
  } catch (err) {
    console.error("Ошибка при обновлении сертификата:", err);
    res.status(500).json({ error: "Ошибка сервера при обновлении данных" });
  }
});

// GET VPN

app.get("/vpn", authenticateJWT, (req: Request, res: Response) => {
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user || !["bo", "kvd"].includes(user.uType)) {
    return res.status(403).json({ error: "Недостаточно прав" });
  }

  try {
    const vpnData = JSON.parse(fs.readFileSync(vpnFilePath, "utf8"));
    res.status(200).json(vpnData);
  } catch (err) {
    console.error("Ошибка при чтении файла vpn.json:", err);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
});

// POST VPN

app.post("/vpn", authenticateJWT, (req: Request, res: Response) => {
  const { body: vpnData } = req;
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  // Проверка, что пользователь существует и является "kvd"
  if (!user || user.uType !== "kvd") {
    return res.status(403).json({
      error: `Вы не kvd и не можете вложить сертификат. Ваш тип: ${
        user?.uType || "неизвестен"
      }`,
    });
  }

  const vpn = readFromFile(vpnFilePath);

  // Проверка, если userId уже существует в массиве vpn-ов
  const existingVPN = vpn.find(
    (vpn: any) => vpn.userId === Number(vpnData.userId) // Преобразуем userId в число
  );

  if (existingVPN) {
    return res.status(409).json({
      error: "VPN для данного пользователя уже существует.",
    });
  }

  // Генерация уникального ID и добавление сертификата
  vpnData.id = generateUniqueId(vpn);

  writeToFile(vpnFilePath, [...vpn, vpnData]);

  return res.status(201).json({ message: "VPN успешно добавлен", vpnData });
});

// PUT VPN BY ID

app.put("/vpn/:id", authenticateJWT, (req: Request, res: Response) => {
  const { userId } = req as any; // Получаем ID пользователя из токена
  const changeVpnId = parseInt(req.params.id); // Получаем ID измененного VPN из параметров

  // Чтение пользователей из файла
  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  // Проверяем, имеет ли пользователь права для внесения изменений
  if (!user || user.uType !== "kvd") {
    return res.status(403).json({
      error: `Вы не имеете прав для изменения vpn. Ваш тип: ${
        user?.uType || "неизвестен"
      }`,
    });
  }

  try {
    // Чтение данных пользователя
    const vpnData = JSON.parse(fs.readFileSync(vpnFilePath, "utf8"));

    // Поиск измененного пользователя по ID
    const getChangedVpn = vpnData.find((user: any) => user.id === changeVpnId);

    // Если VPN не найден
    if (!getChangedVpn) {
      return res.status(404).json({ error: "VPN не найден" });
    }

    // Обновляем данные пользователя
    Object.assign(getChangedVpn, req.body); // Обновляем поля измененного VPN на основе тела запроса

    // Изменяем status на false
    getChangedVpn.status = false;

    // Запись изменений обратно в файл
    fs.writeFileSync(vpnFilePath, JSON.stringify(vpnData, null, 2));

    // Возвращаем обновлённого пользователя
    res.status(200).json(getChangedVpn);
  } catch (err) {
    console.error("Ошибка при обновлении VPN:", err);
    res.status(500).json({ error: "Ошибка сервера при обновлении данных" });
  }
});

// PUT User Status

app.put("/users/:id", authenticateJWT, (req: Request, res: Response) => {
  const { userId } = req as any; // Получаем ID пользователя из токена
  const changeUserId = parseInt(req.params.id); // Получаем ID измененного пользователя из параметров

  // Чтение пользователей из файла
  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  // Проверяем, имеет ли пользователь права для внесения изменений
  if (!user || user.uType !== "kvd") {
    return res.status(403).json({
      error: `Вы не имеете прав для изменения сертификатов. Ваш тип: ${
        user?.uType || "неизвестен"
      }`,
    });
  }

  try {
    // Чтение данных пользователя
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

    // Поиск измененного пользователя по ID
    const getChangedUser = usersData.find(
      (user: any) => user.id === changeUserId
    );

    // Если пользователь не найден
    if (!getChangedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    // Обновляем данные пользователя
    Object.assign(getChangedUser, req.body); // Обновляем поля измененного пользователя на основе тела запроса

    // Изменяем status на false
    getChangedUser.status = false;

    // Запись изменений обратно в файл
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));

    // Возвращаем обновлённого пользователя
    res.status(200).json(getChangedUser);
  } catch (err) {
    console.error("Ошибка при обновлении пользователя:", err);
    res.status(500).json({ error: "Ошибка сервера при обновлении данных" });
  }
});

// GET INVOICES

app.get("/invoices", authenticateJWT, (req: Request, res: Response) => {
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user || !["bo", "kvd"].includes(user.uType)) {
    return res.status(403).json({ error: "Недостаточно прав" });
  }

  try {
    const invoicesData = JSON.parse(fs.readFileSync(invoicesFilePath, "utf8"));
    res.status(200).json(invoicesData);
  } catch (err) {
    console.error("Ошибка при чтении файла invoices.json:", err);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
});

// POST INVOICE

app.post("/invoices", authenticateJWT, (req: Request, res: Response) => {
  const { body: invoiceData } = req;
  const { userId } = req as any;

  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  // Проверка, что пользователь существует и является "kvd"
  if (!user || user.uType !== "kvd") {
    return res.status(403).json({
      error: `Вы не kvd и не можете выписать счет. Ваш тип: ${
        user?.uType || "неизвестен"
      }`,
    });
  }

  const invoice = readFromFile(invoicesFilePath);

  // Проверяем счет на уникальность для определенной заявки
  const existingInvoice = invoice.find(
    (i: any) => i.requestId === Number(invoiceData.requestId)
  );

  if (existingInvoice) {
    return res.status(409).json({
      error: "Счет для данной заявки уже выписан.",
    });
  }

  console.log("Request body:", req.body);

  // Генерация уникального ID и добавление счета
  invoiceData.id = generateUniqueId(invoice);

  writeToFile(invoicesFilePath, [...invoice, invoiceData]);

  return res.status(201).json({ message: "Счет успешно выписан", invoiceData });
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

// EDIT REQUEST BY ID - PUT

app.put("/account/show/:id", authenticateJWT, (req: Request, res: Response) => {
  const showId = parseInt(req.params.id, 10);
  const { body: requestData } = req;

  if (isNaN(showId)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  const requests = readFromFile(requestsFilePath);
  const index = requests.findIndex((show: any) => show.id === showId);

  if (index === -1) {
    return res.status(404).json({ error: "Заявка не найдена" });
  }

  // Обновление данных заявки
  requests[index] = { ...requests[index], ...requestData };
  writeToFile(requestsFilePath, requests);

  res.status(200).json({ message: "Заявка успешно обновлена", requestData });
});

// Что общего между registration и regorganization ?
// reg-organization- организации которые впервые заходят на сайт
// app.post("/regorganization", authenticateJWT, (req: Request, res: Response) => {
// 	const { inn, organization, role } = req.body;
// 	if (!inn || !organization || !role) {
// 		return res.status(400).json({ error: `Отсутвуют объязательные поля` });
// 	}
// });
// reg-organization- организации которые впервые заходят на сайт

// Uidentity -  state=== !reqIdentity , !uIdentity
const readUidentityFromFile = (): any[] => {
  try {
    const data = fs.readFileSync(uidentityFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Ошибка при чтении файла ${uidentityFilePath}:`, err);
    return [];
  }
};

const writeUidentityToFile = (data: any[]): void => {
  try {
    fs.writeFileSync(uidentityFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(`Ошибка при записи файла ${uidentityFilePath}:`, err);
  }
};

app.post("/uidentity", authenticateJWT, (req: Request, res: Response) => {
  const {
    inn,
    fullName,
    login,
    role,
    organization,
    sku,
    // certificatID,
    // department,
  } = req.body;

  if (
    !inn ||
    !fullName ||
    !login ||
    !role ||
    !organization ||
    !sku
    // !certificatID
  ) {
    return res.status(400).json({ error: "Отсутствуют обязательные поля" });
  }

  const userId = (req as any).userId;
  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }

  // Дата и время
  const now = new Date();
  const date =
    now.toLocaleDateString("ru-RU") + " " + now.toLocaleTimeString("ru-RU");

  const uidentityData = readFromFile(uidentityFilePath);
  const certificatesData = readFromFile(certificatesFilePath);
  const nextId =
    uidentityData.length > 0
      ? Math.max(...uidentityData.map((item: any) => item.id)) + 1
      : 1;

  // Найти сертификаты для пользователя
  const userCertificates = certificatesData.filter(
    (cert: any) => cert.userId === userId
  );

  // Допустим, что нам нужен только первый сертификат. Вы можете изменить логику в зависимости от требований.
  const certificate = userCertificates.length > 0 ? userCertificates[0] : {};

  const newIdentity = {
    id: nextId,
    userId,
    fullName,
    login,
    organization,
    inn,
    sku,
    role,
    date,
    typeToken: certificate.typeToken || "",
    serialNumber: certificate.serialNumber || "",
    tokenId: certificate.id || "",
    // certificatID,
    // department,
  };

  uidentityData.push(newIdentity);
  writeUidentityToFile(uidentityData);

  // Обновление поля reqIdentity в users.json
  user.reqIdentity = true;
  writeToFile(usersFilePath, users);

  res.status(200).json({ message: "Данные идентичности успешно обновлены" });
});

app.get("/uidentity", authenticateJWT, (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const users = readFromFile(usersFilePath);
  const user = users.find((u: any) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }

  const uidentityData = readUidentityFromFile();
  const userIdentities = uidentityData.filter(
    (identity: any) => identity.userId === userId
  );

  res.status(200).json(
    userIdentities.map((identity: any) => ({
      id: identity.id,
      userId: identity.userId,
      fullName: identity.fullName,
      login: identity.login,
      organization: identity.organization,
      inn: identity.inn,
      sku: identity.sku,
      certificatID: identity.certificatID,
      role: identity.role,
      date: identity.date,
      serialNumber: identity.serialNumber,
      tokenId: identity.tokenId,
      reqIdentity: user.reqIdentity,
      // typeToken: identity.typeToken,
      // department: identity.department,
    }))
  );
});

app.listen(port, () => {
  console.log(`Сервер запущен по адресу http://localhost:${port}`);
});

function generateUniqueId(data: any[]): number {
  const ids = data.map((item) => item.id);
  const maxId = Math.max(...ids, 0);
  return maxId + 1;
}
