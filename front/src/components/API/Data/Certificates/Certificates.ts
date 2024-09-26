interface TstatusOfCertificates {
  id: number;
  name: string;
  code: number;
}

export const statusOfCertificates: TstatusOfCertificates[] = [
  {
    id: 1,
    name: "Активный",
    code: 0,
  },
  {
    id: 2,
    name: "Компрометация ключа",
    code: 1,
  },
  {
    id: 3,
    name: "Компрометация ЦС",
    code: 2,
  },
  {
    id: 4,
    name: "Изменение принадлежности",
    code: 3,
  },
  {
    id: 5,
    name: "Сертификат заменен",
    code: 4,
  },
  {
    id: 6,
    name: "Прекращение работы",
    code: 5,
  },
  {
    id: 7,
    name: "Приостановка действия",
    code: 6,
  },
];
