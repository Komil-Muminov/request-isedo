import { TGetUsers } from "./GetUsers";

export const putUserById = async (newData: TGetUsers): Promise<any> => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:3000/users/${newData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error(`Error on putUserById`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
