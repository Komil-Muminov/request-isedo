import { TVPN } from "./GetVPN";

export const putVpnById = async (newData: TVPN): Promise<any> => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:3000/vpn/${newData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error(`Error on putVpnById`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
