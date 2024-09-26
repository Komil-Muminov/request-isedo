export interface TCertificates {
  id?: number;
  userId: number | null;
  organization: string;
  subdivision: string;
  nameRequest: string;
  role: string;
  cityRequest: string;
  regionRequest: string;
  serialNumber: string;
  validFrom: string;
  validTo: string;
  statusCode: number;
}

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
