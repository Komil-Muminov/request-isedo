import { TServices } from "./GetServices";

const token = localStorage.getItem("token");

export const postServices = async (newObj: TServices): Promise<any> => {
  try {
    const response = await fetch("http://localhost:3000/services", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error on postServices`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
