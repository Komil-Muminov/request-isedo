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
  certificateSeries?: string;
  status?: boolean;
  passwordAccountant?: string;
}

export interface GetRqstsByIdType extends RequestAccountantData {
  id: number;
  fullName: string;
  role: string;
  phone: string;
  email: string;
  tax: string;
  reqType: string;
  stepCode: number;
  stepTask: number;
  dateTime: string;
  files: FileType[];
  orgTax: string;
  orgName: string;
  userId: number;
  pastUserIds: number[];
  passport: string;
  password: string;
  token: "";
  organizationId: number;
  services: number[];
  dateChange: string;
}

export const getRqstsById = async (id: number): Promise<GetRqstsByIdType> => {
  const token = localStorage.getItem("token");
  return fetch(`http://localhost:3000/requests/show/${id}`, {
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
};
