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
import { Settings } from "@mui/icons-material";
import "./Udetails.css";

const Udetails: React.FC = () => {
	const [uPhoto, setphoto] = useState<CurrUserPhoto | null>(null);
	const handleUphoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const username = uinfo?.username;
			const token = localStorage.getItem("token");

			console.log(`token uphoto:${token}`);
			setphoto({
				username,
				file,
				token,
			});
			console.log(`file ${file}`);
		}
	};

	const uPhotoMutation = useMutation(
		{
			mutationFn: () => setUphoto(uPhoto),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["users", "me"] }),
			// onError: () => console.log(`km error uPhoto ${uPhotoMutation.error}`),
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

	return (
		<>
			<div className="udetails__container">
				<div className="udetails__content">
					<div className="user-details">
						<div className="udetails__content">
							<div className="udetails__card">
								<div className="udetails__setting">
									<Settings sx={{ fill: "#464531" }} />
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
								<Uwidget
									kind="primary"
									disabled={uPhotoMutation.isPending}
									title={`Показать график посещаемости`}
									onClick={() => handleChart("dashboard")}
									desc={`KM`}
								/>
								<Uwidget
									disabled={uPhotoMutation.isPending}
									kind="secondary"
									title={`Показать график чего-то`}
									onClick={() => handleChart("barchart")}
									desc={`KM`}
								/>
								<Uwidget
									kind="tertiary"
									title={`Показать график чего-то`}
									desc={`KM`}
									onClick={() => handleChart("saleschart")}
								/>
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
