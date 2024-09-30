export interface TGetOrganizations {
  id: number;
  name: string;
  type: string;
  tax: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  status: boolean;
}

export const getOrganizations = async (): Promise<TGetOrganizations[]> => {
  const token = localStorage.getItem("token");
  return fetch("http://localhost:3000/organizations", {
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
