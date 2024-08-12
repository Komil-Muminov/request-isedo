import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { GetRqsts, getRqsts } from "../../API/GetRqsts";
import { Outlet } from "react-router-dom";
import "./Reqshower.css";
const Reqshower = () => {
	const showReqQuery = useQuery(
		{
			queryFn: () => getRqsts(),
			queryKey: ["getreqbo"],
		},
		queryClient,
	);

	return (
		<>
			<div className="reqshower_conten">
				<h1 className="sections__title">Показать запросы работниками КВД</h1>
				{/* Надо сделать верстку для данных*/}
				{showReqQuery.data &&
					showReqQuery.data?.map((item) => (
						<div>
							<p className="req_text">
								{" "}
								Наименование организации: {item.orgname}
							</p>

							<p className="req_text"> ФИО Бухгалтера: {item.accountant}</p>
							<p className="req_text"> Описание заявки: {item.desc}</p>
							<p className="req_text"> Cтатус заявки: {item.reqStatus}</p>
							<p className="req_text"> Cтатус заявки: {item.reqType}</p>
						</div>
					))}
				{/* Надо сделать верстку для данных*/}
				<Outlet />
			</div>
		</>
	);
};

export default Reqshower;
