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
  dateTime: string;
  files: FileType[];
  passport: string;
  token: "";
  password: string;
  userId: number;
}

export const putRqstsById = async (newData: PutRqstsByIdType): Promise<any> => {
  const token = localStorage.getItem("token");
  try {
    console.log(newData.id);

    const response = await fetch(
      `http://localhost:3000/account/show/${newData.id}`,
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
