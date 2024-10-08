interface RqstsData {
  reqType?: string;
  fullName?: string;
}

interface TypeRequest {
  name?: string;
}

export function generatedLoginTFMIS(
  rqstsDataById: RqstsData,
  typeRequests: TypeRequest[]
): string | null {
  // Проверяем условие
  if (rqstsDataById?.reqType === typeRequests[0]?.name) {
    // Создаем префикс и добавляем цифры
    const prefix = "bo_123";

    // Извлекаем фамилию из полного имени
    const fullName = rqstsDataById?.fullName; // Например: "Шарипов Амир Чамшедович"
    if (fullName) {
      const lastName = fullName.split(" ")[0]; // "Шарипов"

      // Переводим фамилию в латиницу
      const lastNameLatin = transliterateToLatin(lastName.toLowerCase()); // Необходимо реализовать эту функцию

      // Формируем итоговый username
      const username = `${prefix}_${lastNameLatin}`;
      return username; // Например: "bo_123_sharipov"
    }
  }
  return null; // Или любое другое значение по умолчанию
}

// Функция для транслитерации
function transliterateToLatin(cyrillic: string): string {
  const translitMap: Record<string, string> = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Yo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ъ: "",
    Ы: "Y",
    Ь: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
    // Для строчных букв
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  return cyrillic
    .split("")
    .map((char) => translitMap[char] || char)
    .join("");
}
