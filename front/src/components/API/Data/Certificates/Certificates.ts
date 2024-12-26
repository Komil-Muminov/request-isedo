interface TstatusOfCertificates {
  id: number;
  name: string;
  code: number;
}

export const statusOfCertificates: TstatusOfCertificates[] = [
  {
    id: 1,
    name: "Не определен",
    code: 1,
  },
  {
    id: 2,
    name: "Активный",
    code: 2,
  },
  {
    id: 3,
    name: "Компрометация ключа",
    code: 3,
  },
  {
    id: 4,
    name: "Компрометация ЦС",
    code: 4,
  },
  {
    id: 5,
    name: "Изменение принадлежности",
    code: 5,
  },
  {
    id: 6,
    name: "Сертификат заменен",
    code: 6,
  },
  {
    id: 7,
    name: "Прекращение работы",
    code: 7,
  },
  {
    id: 8,
    name: "Приостановка действия",
    code: 8,
  },
];
