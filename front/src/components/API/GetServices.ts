import { TServices } from "./PostServices";

const token = localStorage.getItem("token");

export const getServices = async (): Promise<TServices[]> => {
  try {
    const response = await fetch("http://localhost:3000/services", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error on postRequest`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
