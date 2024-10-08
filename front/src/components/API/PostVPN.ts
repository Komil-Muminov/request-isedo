import { TVPN } from "./GetVPN";

const token = localStorage.getItem("token");

export const postVPN = async (newData: TVPN): Promise<any> => {
  try {
    const response = await fetch("http://localhost:3000/vpn", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error(`Error on postVPN`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
