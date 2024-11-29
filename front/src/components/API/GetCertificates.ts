export interface AccountantManagementCertificate {
  userNameAccountant?: string;
  userTaxAccountant?: string;
  userPhoneAccountant?: string;
  roleAccountant?: string;
}

export interface TCertificates {
  id?: number;
  userId?: number | null;
  userName: string;
  userTax: string;
  userPhone: string;
  role: string;
  orgName: string;
  orgTax: string;
  orgPhone: string;
  region?: string;
  address: string;
  serialNumber?: string;
  validFrom?: string;
  validTo?: string;
  statusCode?: number;
  dateChange?: string;
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
