import { z } from "zod";
import { GetRqsts } from "./GetRqsts";
import { GetRqstsScheme } from "./GetRqsts";

export const getReqBo = async (): Promise<GetRqsts[]> => {
	return fetch(`http://localhost:3000/requests`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then((data) => z.array(GetRqstsScheme).parse(data));
};
