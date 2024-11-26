export interface TVPN {
  id: number;
  userId?: number | null;
  bz: number;
  password: string;
  fullName: string;
  login: string;
  organization: string;
  phone: string;
  role: string;
  status: boolean;
  dateChange: string;
}

const token = localStorage.getItem("token");

export const getVPN = async (): Promise<TVPN[]> => {
  try {
    const response = await fetch("http://localhost:3000/vpn", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error on getVPN`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
