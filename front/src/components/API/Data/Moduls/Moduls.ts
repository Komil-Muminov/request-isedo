interface TModuls {
  id: number;
  name: string;
  route: string;
}

export const moduls: TModuls[] = [
  {
    id: 1,
    name: "Заявки",
    route: "/requests",
  },
  {
    id: 2,
    name: "СРМ",
    route: "/crm",
  },
  {
    id: 3,
    name: "Основные документы",
    route: "*",
  },
  {
    id: 4,
    name: "Первичные документы",
    route: "*",
  },
  {
    id: 5,
    name: "Письма",
    route: "*",
  },
  {
    id: 6,
    name: "Письма-V3",
    route: "*",
  },
  {
    id: 7,
    name: "Фин-Отчет",
    route: "*",
  },
  {
    id: 8,
    name: "Госуслуги",
    route: "*",
  },
  {
    id: 9,
    name: "Госуслуги 2",
    route: "*",
  },
  {
    id: 10,
    name: "Письма-V3.5",
    route: "*",
  },
  {
    id: 11,
    name: "Администрирование",
    route: "*",
  },
];
