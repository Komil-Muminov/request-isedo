export const logout = async (): Promise<void> => {
  const token = localStorage.getItem("token");
  console.log(token);
  try {
    // Выполняет POST-запрос к серверу по адресу http://localhost:3000/logout для выполнения выхода. Данный адрес указан в сервере sr.ts
    const response = await fetch(`http://localhost:3000/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка при попытке выхода");
    }

    localStorage.removeItem("token");
  } catch (error) {
    console.error("Ошибка:", error);
  }
};
