import { TInvoices } from "./GetInvoices";

const token = localStorage.getItem("token");

export const postInvoices = async (newData: TInvoices): Promise<any> => {
  console.log(newData);
  try {
    const response = await fetch("http://localhost:3000/invoices", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error(`Error on postInvoices`);
    }

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
