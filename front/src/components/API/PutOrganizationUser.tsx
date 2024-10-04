import { TGetOrganizations } from "./GetOrganizations";

export interface addUserOrganization {
  updatedOrganization: TGetOrganizations;
  userId: number;
}

export const putOrganizationUser = async (
  newData: addUserOrganization
): Promise<TGetOrganizations> => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:3000/organizations/${newData.updatedOrganization.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: newData.userId }), // Отправляем только userId
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка при обновлении организации");
    }

    return response.json();
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};
