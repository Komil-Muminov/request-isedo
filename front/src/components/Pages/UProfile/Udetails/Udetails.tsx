import { useState, useEffect } from "react";
import { GetMeType, useAuth } from "../../../API/Hooks/useAuth";
import defUphoto from "../../../../assets/ErrorPage.jpg";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../queryClient";
import { Button } from "@mui/material";
import UserInfoList from "../../../UI/UserInfoList/UserInfoList";
import { Link } from "react-router-dom";
import { CurrUserPhoto, setUphoto } from "../../../API/Hooks/setUphoto";
import "./Udetails.css";
import "../Profile.css";
const Udetails = () => {
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
	// const [expanded, setExpanded] = useState<number | false>(false);

	useEffect(() => {
		if (uQuery.status === "success") {
			setUinfo(uQuery.data);
		}
	}, [uQuery.status, uQuery.data]);

	const photoUrl = uinfo?.photo ? `http://localhost:3000${uinfo.photo}` : null;
	console.log(uinfo);
	console.log(photoUrl);
	return (
		<>
			<div className="user-content">
				{/* {uinfo?.photo ? uinfo.photo : typeof uinfo?.photo} */}
				<div className="user-details">
					{uPhotoMutation.data?.status}
					<p className="user-details_title">
						{uinfo?.uType === "kvd"
							? `Подтвержденная учетная запись`
							: `Не подтвержденная учетная запись`}
					</p>
					<div className="user-details-content">
						<div className="user-details_photo">
							{/* <img src={defUphoto} alt="" className="photo" /> */}
							<img src={photoUrl || defUphoto} alt="uphoto" className="photo" />

							<div className="file-service-photo">
								<label htmlFor="uphoto">
									Выберите фото
									<input
										style={{ visibility: "hidden" }}
										id="uphoto"
										type="file"
										onChange={handleUphoto}
									/>
								</label>
								{/* <AddFileRequest /> */}
							</div>
						</div>
						<div className="user-details-text">
							<ul className="user-details_list">
								<UserInfoList
									title="ФИО"
									description={uinfo?.fullName ? uinfo.fullName : uinfo?.uType}
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
				</div>
			</div>
		</>
	);
};

export default Udetails;
