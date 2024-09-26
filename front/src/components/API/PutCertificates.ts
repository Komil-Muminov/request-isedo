import { TCertificates } from "./GetCertificates";

export const putCertificates = async (
  updatedCertificate: TCertificates
): Promise<TCertificates> => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:3000/certificates/${updatedCertificate.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ statusCode: updatedCertificate.statusCode }), // Отправляем только статус
      }
    );
    if (!response.ok) {
      throw new Error("Ошибка при обновлении сертификата");
    }
    return response.json();
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};
