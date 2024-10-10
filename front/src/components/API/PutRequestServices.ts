import { GetRqstsByIdType } from "./GetRqstsById";

export const PutRequestServices = async (
  newData: GetRqstsByIdType
): Promise<GetRqstsByIdType> => {
  const token = localStorage.getItem("token");

  console.log(newData);

  try {
    const response = await fetch(
      `http://localhost:3000/requests/${newData.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ services: newData.services }),
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка при обновлении заявки");
    }

    return response.json();
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};
