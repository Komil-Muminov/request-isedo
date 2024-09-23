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
  orgTax: string;
  orgName: string;
  reqType: string;
  stepCode: number;
  dateTime: string;
  files: FileType[];
  userId: number;
}

export const getRqstsById = async (id: number): Promise<GetRqstsByIdType[]> => {
  const token = localStorage.getItem("token");
  return fetch(`http://localhost:3000/account/show/${id}`, {
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
