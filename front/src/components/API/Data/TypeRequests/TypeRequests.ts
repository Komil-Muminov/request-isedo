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
    name: "Выдача токена и сертификата",
  },
  {
    id: 5,
    image: changeOfAccountant,
    name: "Выдача токена",
  },
  {
    id: 6,
    image: changeOfAccountant,
    name: "Выдача сертификата",
  },
  {
    id: 7,
    image: changeOfAccountant,
    name: "Смена пароля",
  },
  {
    id: 8,
    image: changeOfAccountant,
    name: "Создание ИНН в TFMIS",
  },
];
