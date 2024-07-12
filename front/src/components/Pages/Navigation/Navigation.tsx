import log from "../../../assets/Formal/log.png";
import "./Navigation.css";
import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { queryClient } from "../../../queryClient";
import { useAuth } from "../../API/Hooks/useAuth";
import { useEffect, useState } from "react";
import { Loader } from "../../UI/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
export const Navigation: React.FC = () => {
	const { getMe } = useAuth();
	const getUinfoQuery = useQuery(
		{
			queryKey: ["users", "me"],
			queryFn: () => getMe(),
		},
		queryClient,
	);

	// Надо правильно типизировать данные и добавить в стейт

	interface TUProps {
		username: string;
		role: string;
		photo: string;
	}
	if (getUinfoQuery.status === "pending") {
		<Loader />;
	}
	if (getUinfoQuery.status === "error") {
		<ErrorPage />;
	}

	const [uCurrData, setUcurrData] = useState<TUProps[] | any[]>([]);
	useEffect(() => {
		if (getUinfoQuery.status === "success") {
			setUcurrData((prev) => [...prev, getUinfoQuery.data]);
		}
	}, [setUcurrData, getUinfoQuery.data]);

	return (
		<>
			<section className="sections navigation__section">
				<div className="container">
					<div className="navigation__content">
						<div className="nav_info">
							<ul className="nav_info-list">
								<li className="info_list-item">
									<svg
										width="8px"
										height="8px"
										viewBox="0 0 24 24"
										fill="none"
										stroke="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g>
											<path
												d="M22.68 16.5067C21.04 16.5067 19.4533 16.24 17.9733 15.76C17.5067 15.6 16.9867 15.72 16.6267 16.08L14.5333 18.7067C10.76 16.9067 7.22667 13.5067 5.34667 9.6L7.94667 7.38667C8.30667 7.01333 8.41333 6.49333 8.26667 6.02667C7.77333 4.54667 7.52 2.96 7.52 1.32C7.52 0.6 6.92 0 6.2 0H1.58667C0.866667 0 0 0.32 0 1.32C0 13.7067 10.3067 24 22.68 24C23.6267 24 24 23.16 24 22.4267V17.8267C24 17.1067 23.4 16.5067 22.68 16.5067Z"
												fill="#35B6EE"
											></path>
										</g>
									</svg>{" "}
									Имя: {getUinfoQuery.data?.username}
								</li>

								<li className="info_list-item">
									<svg
										width="8px"
										height="8px"
										viewBox="0 0 24 24"
										fill="none"
										stroke="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g>
											<path
												d="M22.68 16.5067C21.04 16.5067 19.4533 16.24 17.9733 15.76C17.5067 15.6 16.9867 15.72 16.6267 16.08L14.5333 18.7067C10.76 16.9067 7.22667 13.5067 5.34667 9.6L7.94667 7.38667C8.30667 7.01333 8.41333 6.49333 8.26667 6.02667C7.77333 4.54667 7.52 2.96 7.52 1.32C7.52 0.6 6.92 0 6.2 0H1.58667C0.866667 0 0 0.32 0 1.32C0 13.7067 10.3067 24 22.68 24C23.6267 24 24 23.16 24 22.4267V17.8267C24 17.1067 23.4 16.5067 22.68 16.5067Z"
												fill="#35B6EE"
											></path>
										</g>
									</svg>{" "}
									Роль: {getUinfoQuery.data?.role}
								</li>

								<li className="info_list-item">
									<svg
										width="8px"
										height="8px"
										viewBox="0 0 24 24"
										fill="none"
										stroke="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g>
											<path
												d="M22.68 16.5067C21.04 16.5067 19.4533 16.24 17.9733 15.76C17.5067 15.6 16.9867 15.72 16.6267 16.08L14.5333 18.7067C10.76 16.9067 7.22667 13.5067 5.34667 9.6L7.94667 7.38667C8.30667 7.01333 8.41333 6.49333 8.26667 6.02667C7.77333 4.54667 7.52 2.96 7.52 1.32C7.52 0.6 6.92 0 6.2 0H1.58667C0.866667 0 0 0.32 0 1.32C0 13.7067 10.3067 24 22.68 24C23.6267 24 24 23.16 24 22.4267V17.8267C24 17.1067 23.4 16.5067 22.68 16.5067Z"
												fill="#35B6EE"
											></path>
										</g>
									</svg>{" "}
									ФИО: {getUinfoQuery.data?.photo || "null"}
								</li>
								{/* Другие элементы списка */}
							</ul>
						</div>

						<div className="nav__log">
							<Link to="/#">
								<img src={log} alt="log" className="nav__gerb" />
							</Link>
						</div>

						<div className="user_info">
							<Link to={`/uprofile`}>
								<Avatar className="nav_user-log" alt="user">
									{getUinfoQuery.data?.photo
										? getUinfoQuery.data?.photo
										: "null"}
								</Avatar>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
