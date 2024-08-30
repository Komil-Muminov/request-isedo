interface FileType {
	number: number;
	fileName: string;
}

export interface PostRqstScheme {
	fullName: string;
	role: string;
	phone: string;
	email: string;
	tax: string;
	orgTax: string;
	orgName: string;
	reqType: string;
	stepCode: number;
	dateTime: string;
	files: FileType[];
}

const token = localStorage.getItem("token");

// Нет useEffect-а, соответственно инвалидации не происходит и GetRqsts не обновляется, нужно форматировать под React Query

// Добавить новые поля и функционал KM
export const postRequest = async (newData: PostRqstScheme): Promise<void> => {
	try {
		const response = await fetch(`http://localhost:3000/requests`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newData),
		});
		if (!response.ok) {
			throw new Error(`Error on getRequest`);
		}
		return response.json();
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};
