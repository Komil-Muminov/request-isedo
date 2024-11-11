import changeOfAccountant from "../../../../assets/icons/change-of-accountant.webp";

export interface ItypeRequests {
  id: number;
  image: string;
  name: string;
}

export const typeRequests: ItypeRequests[] = [
  {
    id: 1,
    image: changeOfAccountant,
    name: "Смена главного бухгалтера",
  },
  {
    id: 2,
    image: changeOfAccountant,
    name: "Смена руководителя",
  },
  {
    id: 3,
    image: changeOfAccountant,
    name: "Смена главного бухгалтера и руководителя",
  },
  {
    id: 4,
    image: changeOfAccountant,
    name: "Продление сертификата главного бухгалтера",
  },
  {
    id: 5,
    image: changeOfAccountant,
    name: "Продление сертификата руководителя",
  },
  {
    id: 6,
    image: changeOfAccountant,
    name: "Продажа токена",
  },
  {
    id: 7,
    image: changeOfAccountant,
    name: "Предоставление доступа к модулям",
  },
  {
    id: 8,
    image: changeOfAccountant,
    name: "Техническая поддержка",
  },
];
