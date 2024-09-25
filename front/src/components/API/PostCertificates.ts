import { statusOfCertificates } from "./Data/Certificates/Certificates";

import { TCertificates } from "./GetCertificates";

const token = localStorage.getItem("token");

export const postCertificates = async (
  newData: TCertificates
): Promise<any> => {
  try {
    const response = await fetch("http://localhost:3000/certificates", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error(`Error on postCertificates`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
