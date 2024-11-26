import { useState, useEffect } from "react";
import { GetMeType, useAuth } from "../../../API/Hooks/useAuth";
import defUphoto from "../../../../assets/ErrorPage.jpg";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../queryClient";
import { Button } from "@mui/material";
import UserInfoList from "../../../UI/UserInfoList/UserInfoList";
import { Link } from "react-router-dom";
import { CurrUserPhoto, setUphoto } from "../../../API/Hooks/setUphoto";
import { Uwidget } from "../Uwidget/Uwidget";
import Barchart from "../Uchart/Barchart/Barchart";
import DashboardChart from "../Uchart/Dashboard/Dashboardchart";
import Saleschart from "../Uchart/Saleschart/Saleschart";
import DashboardMinify from "../Uchart/DashboardMinify/DashboardMinify";
import { Settings } from "@mui/icons-material";
import { useDarkMode } from "../../../API/Hooks/UseDarkMode";

import "./Udetails.css";
import "../../../../index.css";
import DarkModeSwitcher from "../../../UI/DarkMode-Switcher/DarkModeSwitcher";
const Udetails: React.FC = () => {
	const [uPhoto, setphoto] = useState<CurrUserPhoto | null>(null);
	const handleUphoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const username = uinfo?.username;
			const token = localStorage.getItem("token");

			setphoto({
				username,
				file,
				token,
			});
		}
	};

	const uPhotoMutation = useMutation(
		{
			mutationFn: () => setUphoto(uPhoto),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["users", "me"] }),
		},
		queryClient,
	);

	useEffect(() => {
		uPhotoMutation.mutate();
	}, [uPhoto?.file]);

	const { getMe } = useAuth();
	const uQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["users", "me"],
		},
		queryClient,
	);

	const [uinfo, setUinfo] = useState<GetMeType | null>(null);

	useEffect(() => {
		if (uQuery.status === "success") {
			setUinfo(uQuery.data);
		}
	}, [uQuery.status, uQuery.data]);

	const photoUrl = uinfo?.photo ? `http://localhost:3000${uinfo.photo}` : null;

	const [chart, setSchart] = useState<string>("");

	const handleChart = (state: string) => {
		if (chart === state) {
			setSchart("");
		} else {
			setSchart(state);
		}
	};

	const { handleIsDarkMode, isDarkMode } = useDarkMode(
		".profile",
		".navigation__section",
		".register__section",
		".uwidget__item--special",
		".uwidget__item-special-2 ",
	);

	return (
		<>
			<div className="udetails__container">
				<div className="udetails__content">
					<div className="user-details">
						<div className="udetails__content">
							<div
								className={`${
									uinfo?.uType !== "kvd"
										? "udetails__card unidentified--bg "
										: "udetails__card"
								}`}
							>
								<div className="udetails__setting">
									<button className="profile__settings-btn" title="Настройки">
										<Settings
											className="udetails__setting-icon"
											sx={{ fill: "#464531" }}
										/>
									</button>
									{/* <button
										className={`dark-mode-btn ${
											document.querySelector(".profile.dark-mode")
												? "active"
												: ""
										}`}
										title="Сменить тему"
										onClick={handleIsDarkMode}
									></button> */}
									<DarkModeSwitcher
										isDarkMode={isDarkMode}
										onClick={handleIsDarkMode}
									/>
								</div>
								<div className="user-details_photo">
									<div className="user_photo">
										<img
											src={photoUrl || defUphoto}
											alt="uphoto"
											className="photo"
										/>
										<label className="uphoto__label" htmlFor="uphoto">
											<input
												style={{ visibility: "hidden" }}
												id="uphoto"
												type="file"
												onChange={handleUphoto}
											/>
										</label>
									</div>
								</div>
								<div className="user-details-text">
									<ul className="udetails__info-list">
										<UserInfoList
											title="ФИО"
											description={
												uinfo?.fullName ? uinfo.fullName : uinfo?.uType
											}
										/>
										<UserInfoList
											title="Тип пользователя"
											description={uinfo?.uType ? uinfo.uType : "Тип не указан"}
										/>
										<UserInfoList
											title="Идентификация"
											description={
												uinfo?.uType === "kvd"
													? "Идентифицирован"
													: "Идентификация на рассмотрение"
											}
										/>
										<UserInfoList
											title={uinfo?.department ? "Отдел" : "Номер телефона"}
											description={
												uinfo?.department ? uinfo.department : uinfo?.phone
											}
										/>
										<UserInfoList
											title={uinfo?.uType === "kvd" ? "Должность" : "ИНН"}
											description={
												uinfo?.role !== "" || uinfo?.position !== ""
													? uinfo?.role
													: uinfo.tax
											}
										/>

										<UserInfoList
											title={uinfo?.uType === "kvd" ? "Должность" : "ИНН"}
											description={
												uinfo?.role !== "" || uinfo?.position !== ""
													? uinfo?.role
													: uinfo.tax
											}
										/>
										{uinfo?.email && (
											<UserInfoList
												title="E-mail"
												description={
													uinfo?.email ? uinfo.email : "E-mail адрес не указан."
												}
											/>
										)}
									</ul>
									<Link to="/uprofile/uIdentity">
										<Button
											variant="contained"
											fullWidth
											sx={{
												backgroundColor: "#607d8b",
												"&:hover": {
													backgroundColor: "#546d79",
												},
												display: `${
													uinfo?.uType === "kvd" || uinfo?.uType == "bo"
														? "none"
														: "block"
												}`,
											}}
										>
											Идентификация организации
										</Button>
									</Link>
								</div>
							</div>
							<div className="udetails__uwidget">
								<ul className="udetails__uwidget-list">
									<Uwidget
										kind="black-gradient uwidget__standart uwidget__standart-1"
										disabled={uPhotoMutation.isPending}
										title={`График чего-то`}
										onClick={() => handleChart("dashboard")}
										desc={`KM`}
									/>
									<Uwidget
										disabled={uPhotoMutation.isPending}
										kind="black-gradient uwidget__standart"
										title={`График чего-то`}
										onClick={() => handleChart("barchart")}
										desc={`KM`}
									/>
									<Uwidget
										kind="tertiary uwidget__item-special-1 uwidget__item--special"
										title={`График чего-то`}
										desc={`KM`}
										children={<DashboardMinify />}
										onClick={() => handleChart("saleschart")}
									/>
									<Uwidget
										kind="tertiary uwidget__item-special-2 uwidget__item--special"
										title={`График чего-то`}
										desc={`KM`}
										children={<DashboardMinify />}
										onClick={() => handleChart("saleschart")}
									/>
								</ul>
							</div>
							<div className="udetails__chart">
								{chart === "dashboard" && <DashboardChart />}
								{chart === "barchart" && <Barchart />}
								{chart === "saleschart" && <Saleschart />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Udetails;
