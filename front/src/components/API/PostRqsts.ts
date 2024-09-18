interface FileType {
  number: number;
  fileName: string;
}

export interface PostRqstScheme {
  fullName: string;
  tax: string;
  phone: string;
  email: string;
  passport: string;
  role: string;
  token: "";
  reqType: string;
  stepCode: number;
  dateTime: string;
  files: FileType[];
  password: string;
}

const token = localStorage.getItem("token");

// Нет useEffect-а, соответственно инвалидации не происходит и GetRqsts не обновляется, нужно форматировать под React Query

export const postRequest = async (newData: PostRqstScheme): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/requests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error(`Error on getRequest`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
