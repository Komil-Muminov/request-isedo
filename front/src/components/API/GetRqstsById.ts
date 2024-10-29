interface FileType {
  number: number;
  fileName: string;
}

export interface GetRqstsByIdType {
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
  passport: string;
  password: string;
  token: "";
  organizationId: number;
  services: number[];
  loginImof: string;
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
