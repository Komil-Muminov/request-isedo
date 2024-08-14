export interface GetRqstsByIdType {
  id: number;
  orgname: string;
  accountant: string;
  desc: string;
  reqType: string;
  reqStatus: string;
  dateTime: string;
}

export const getRqstsById = async (id: number): Promise<GetRqstsByIdType> => {
  const token = localStorage.getItem("token");
  return fetch(`http://localhost:3000/account/show/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Недостаточно прав");
    }
    return response.json();
  });
};
