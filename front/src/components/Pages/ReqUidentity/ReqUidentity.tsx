import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { useUidentity } from "../../API/Hooks/useUidentity";
// import { Outlet } from "react-router-dom";
import "./Reqshower.css";
const ReqUidentity = () => {
	const { getUidentity } = useUidentity();
	const uIdentityQuery = useQuery(
		{
			queryFn: () => getUidentity(),
			queryKey: ["getUidentityReqs"],
		},
		queryClient,
	);

	if (uIdentityQuery.status === "error") {
		console.log(uIdentityQuery.status);
	}

	return (
		<>
			<div className="reqshower_conten">
				<h1 className="sections__title">Показать запросы работниками КВД</h1>
				{/* Надо сделать верстку для данных*/}
				{uIdentityQuery.data &&
					uIdentityQuery.data?.map((item) => (
						<div>
							<p className="req_text">
								{" "}
								Наименование организации: {item.orgName}
							</p>

							<p className="req_text"> ФИО: {item.fullName}</p>
							<p className="req_text"> Тип заявки: {item.reqType}</p>
							<p className="req_text"> Cтатус заявки: {item.stepCode}</p>
							<p className="req_text"> Должность: {item.role}</p>
						</div>
					))}
				{/* Надо сделать верстку для данных*/}
				{/* <Outlet /> */}
			</div>
		</>
	);
};

export default ReqUidentity;
