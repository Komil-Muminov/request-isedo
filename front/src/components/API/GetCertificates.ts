import { TCertificates } from "./PostCertificates";

const token = localStorage.getItem("token");

export const getCertificates = async (): Promise<TCertificates[]> => {
  try {
    const response = await fetch("http://localhost:3000/certificates", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error on getCertificates`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
