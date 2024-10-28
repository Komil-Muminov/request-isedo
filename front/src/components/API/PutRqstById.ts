interface FileType {
  number: number;
  fileName: string;
}

export interface PutRqstsByIdType {
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
  passport: string;
  token: "";
  password: string;
  userId: number;
  organizationId: number;
  dateChange: string;
}

export const putRqstsById = async (newData: PutRqstsByIdType): Promise<any> => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:3000/requests/show/${newData.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    if (!response.ok) {
      throw new Error(`Error on postRequest`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
