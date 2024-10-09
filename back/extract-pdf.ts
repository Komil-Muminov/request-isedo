const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");

const app = express();
const port = 3000;



// Настроим multer для обработки загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Папка для хранения загруженных файлов
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Уникальное имя для каждого файла
  },
});

const upload = multer({ storage: storage });

// Маршрут для загрузки файла
app.post("/upload-pdf", upload.single("file"), (req, res) => {
  const filePath = req.file.path; // Путь к загруженному файлу
  console.log("File uploaded:", filePath); // Добавьте логирование для проверки загрузки файла

  const dataBuffer = fs.readFileSync(filePath);

  pdf(dataBuffer)
    .then((data) => {
      const text = data.text;

      // Извлечение данных с использованием регулярных выражений
      const identificatorInvoice = extractData(
        text,
        /Ҳисобнома-фактураи андоз аз арзиши иловашуда ва аксизҳо №\s*(\d+)/
      );
      const invoiceNumber = extractData(text, /Силсилаи BI №\s*(\d+)/);
      const formattedInvoiceNumber = `BI${invoiceNumber}`;
      const date = extractData(text, /Санаи навишт\s+(\d+\s+\d+\s+\d+)/);
      const supplier = extractData(text, /Ном\s+([^\n]+)/);
      const supplierTaxId = extractData(
        text,
        /Рақами\s+мушаххаси\s+андозсупоранда\s+(\d+)/
      );
      const buyer = extractData(text, /Ном\s+СМАБХ н. Рудаки/);
      const buyerTaxId = extractData(
        text,
        /мушаххаси\s+андозсупоранда\s+(\d+)/
      );
      const service = extractData(
        text,
        /Хизматрасонии компютери ва ба он алокаманд/
      );
      const totalAmount = extractData(text, /Арзиши умумӣ\s+(\d+,\d+)/);

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
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error extracting PDF data", details: err });
    });
});

// Функция для извлечения данных по ключевым словам
function extractData(text, regex) {
  const match = text.match(regex);
  return match ? match[1] : null;
}


