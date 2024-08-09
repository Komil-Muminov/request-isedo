import { useQuery } from "@tanstack/react-query";
import { getReqBo } from "../../API/ShowReq";
import { queryClient } from "../../../queryClient";
// import { useEffect } from "react";
const Reqshower = () => {
	const showReqQuery = useQuery(
		{
			queryFn: () => getReqBo(),
			queryKey: ["getreqbo"],
		},
		queryClient,
	);

	return (
		<>
			<h1 className="sections__title">Показать запросы работниками КВД</h1>
			{console.log(showReqQuery.data)}
		</>
	);
};

export default Reqshower;
