export interface TCertificates {
  id?: number;
  requestId?: number;
  typeToken: string;
  serialNumber: string;
  validFrom: string;
  validTo: string;
  fullName: string;
  organization: string;
  role: string;
}

const token = localStorage.getItem("token");

export const postCertificates = async (
  newData: TCertificates,
  requestId: number
): Promise<any> => {
  try {
    newData.requestId = requestId;
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
