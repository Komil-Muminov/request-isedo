interface FileType {
  number: number;
  fileName: string;
}

export interface TInvoices {
  id: number;
  requestId?: number;
  invoiceNumber: string;
  indexNumber: number;
  invoiceSender: string;
  invoiceSenderTax: string;
  invoiceReceiver: string;
  invoiceReceiverTax: string;
  comments: string;
  totalAmount: number;
  date: string;
  files: FileType[];
}

const token = localStorage.getItem("token");

export const getInvoices = async (): Promise<TInvoices[]> => {
  try {
    const response = await fetch("http://localhost:3000/invoices", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error on getInvoices`);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
