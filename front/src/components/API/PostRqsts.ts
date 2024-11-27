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

export interface PostRqstScheme extends RequestAccountantData {
  fullName: string;
  tax: string;
  phone: string;
  email: string;
  passport: string;
  role: string;
  token: "";
  reqType: string;
  stepCode: number;
  stepTask: number;
  dateTime: string;
  files: FileType[];
  password: string;
  orgTax: string;
  orgName: string;
  userId: number;
  organizationId: number;
  services: number[];
  loginImof: string;
  dateChange: string;
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
