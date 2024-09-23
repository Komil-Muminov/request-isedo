export interface TGetUsers {
  id: number;
  uType: string;
  username: string;
  password: string;
  photo: string;
  fullName: string;
  phone: string;
  tax: string;
  email: string;
  organization: string;
  inn: string;
  role: string;
  orgName: string;
  orgTax: string;
  department: string;
  reqIdentity: boolean;
  uIdentity: boolean;
}

export const getUsers = async (): Promise<TGetUsers[]> => {
  const token = localStorage.getItem("token");
  return fetch("http://localhost:3000/users", {
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
