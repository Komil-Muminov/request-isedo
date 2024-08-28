export interface TServices {
  id: number;
  serviceName: string;
  price: string;
  amount: string;
  unit: string;
  recipientType: string;
  tax: string;
  sumTax: string;
  total: string;
}

const token = localStorage.getItem("token");

export const postServices = async (newData: TServices): Promise<void> => {
  try {
    const response = await fetch("http://localhost:3000/services", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
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
