interface FileType {
  number: number;
  fileName: string;
}

interface RequestAccountantData {
  fullNameAccountant?: string;
  taxAccountant?: string;
  phoneAccountant?: string;
  emailAccountant?: string;
  passportAccountant?: string;
  roleAccountant?: string;
  tokenAccountant?: string;
  passwordAccountant?: string;
  loginImofAccountant?: string;
}

export interface GetRqstsType extends RequestAccountantData {
  id: number;
  fullName: string;
  role: string;
  phone: string;
  email: string;
  tax: string;
  orgTax: string;
  orgName: string;
  reqType: string;
  stepCode: number;
  stepTask: number;
  dateTime: string;
  files: FileType[];
  userId: number;
  pastUserIds: number[];
  passport: string;
  password: string;
  token: "";
  organizationId: number;
  services: number[];
  loginImof: string;
  dateChange: string;
}

// Извлекает тип данных из схемы GetRqstsScheme. Это означает, что GetRqsts будет типом объекта с полями id, orgname, accountant, и desc, где значения соответствуют типам, указанным в схеме.
// export type GetRqsts = z.infer<typeof GetRqstsScheme>;

export const getRqsts = async (): Promise<GetRqstsType[]> => {
  const token = localStorage.getItem("token");

  return fetch(`http://localhost:3000/requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Недостаточно прав");
    }
    return response.json();
  });
  // Применяет схему GetRqstsScheme к каждому элементу массива данных, чтобы убедиться, что они соответствуют ожидаемому формату. Функция z.array(GetRqstsScheme) создает схему для массива объектов, соответствующих GetRqstsScheme.
  //   .then((data) => z.array(GetRqstsScheme).parse(data))
};
