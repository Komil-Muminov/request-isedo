import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { GetRqsts, getRqsts } from "../../API/GetRqsts";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
const Reqshower = () => {
	const [reqshower, setReqShower] = useState<GetRqsts[]>([]);
	const showReqQuery = useQuery(
		{
			queryFn: () => getRqsts(),
			queryKey: ["getreqbo"],
		},
		queryClient,
	);

	return (
		<>
			<h1 className="sections__title">Показать запросы работниками КВД</h1>
			{/* Надо сделать верстку для данных*/}
			{showReqQuery.data?.map((item) => (
				<p>{item.orgname}</p>
			))}
		</>
	);
};

export default Reqshower;
