import { GetRqstsByIdType } from "./GetRqstsById";

const token = localStorage.getItem("token");

export const postRequestFile = async (newData: any): Promise<any> => {
  try {
    const response = await fetch(
      `http://localhost:3000/requests/${newData.request.id}/files`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newData.newFile.id,
      }
    );
    if (!response.ok) {
      throw new Error(`Error on postRequestFile`);
    }

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
