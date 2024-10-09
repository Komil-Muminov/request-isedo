const token = localStorage.getItem("token");

export const postPdfData = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", file); // Добавляем файл в форму

    const response = await fetch("http://localhost:3000/upload-pdf", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error on postPdfData");
    }
    console.log(response);

    return response.json(); // Возвращаем результат
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
