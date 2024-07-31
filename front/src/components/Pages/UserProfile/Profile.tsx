import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { useAuth, GetMeType } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader/Loader";
import { useEffect, useState } from "react";
import defUphoto from "../../../assets/ErrorPage.jpg";
import { ButtonKM } from "../../UI/Button/ButtonKM";
import { Ulink } from "../../UI/Ulinks/Ulinks";
import { Ulinks } from "../../UI/Ulinks/ProfileLinks";
import "./Profile.css";

const Profile: React.FC = () => {
	const [defaultName] = useState<string | undefined>("Кимки");
	const { getMe } = useAuth();
	const uQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["users", "me"],
		},
		queryClient,
	);

	switch (uQuery.status) {
		case "pending":
			return <Loader />;
		case "error":
			console.log(uQuery.error);
	}

	// uQuery data status==='success'
	const [uinfo, setUinfo] = useState<GetMeType[] | undefined>([]);
	if (uQuery.status === "success") {
		try {
			queryClient.invalidateQueries({ queryKey: ["users", "me"] });
			console.log("invalidateQueries выполнена успешно");
		} catch (error) {
			console.error("Ошибка при выполнении invalidateQueries:", error);
		}
	}

	useEffect(() => {
		if (uQuery.status === "success") {
			try {
				queryClient.invalidateQueries({ queryKey: ["users", "me"] });
			} catch (error) {
				console.log(`error :${error}`);
			}
		}
		setUinfo([uQuery.data]);
	}, [uQuery.status]);

	if (uinfo) {
		return (
			<>
				<section className="sections">
					<div className="container">
						<div className="profile_content km__content">
							<div className="profile_header">
								<div className="profile prev">Блок "история"</div>
								{uinfo?.map((item) => (
									<h2 className="sections__title profile_title">
										Салом, {item.username}
									</h2>
								))}
								<div className="profile_avatar">
									{/* Надо сделать условный рендер */}
									<Avatar className="nav_user-log" alt="user">
										<img
											style={{ maxWidth: "40px", minHeight: "40px" }}
											src={uQuery.data?.photo ? uQuery.data?.photo : defUphoto}
											alt=""
										/>
									</Avatar>
								</div>
							</div>
							<div className="uInfo_content">
								<div className="uLeft_content"></div>
								<div className="ucenter_info">
									{" "}
									{Ulinks.map((item) => (
										<Ulink to={item.url}>{item.label}</Ulink>
									))}
									<div className="uprofile_photo">
										<img src={defUphoto} alt="user" className="uphoto" />
										<ButtonKM>Добавить фото</ButtonKM>
									</div>
									<div className="uinfo_text">
										<span className="sections__desc uinfo_tex ">
											ФИО:
											<p>{uQuery.data?.username}</p>
										</span>
										<span className="sections__desc uinfo_tex">
											Телефон:
											<p>{uQuery.data?.username}</p>
										</span>
										<span className="sections__desc uinfo_tex ">
											E-mail :<p>{uQuery.data?.uType}</p>
										</span>
										<span className="sections__desc uinfo_tex ">
											Место работы :<p>{uQuery.data?.photo}</p>
										</span>

										<span className="sections__desc uinfo_tex ">
											Тип пользователя:<p>{uQuery.data?.uType}</p>
										</span>
									</div>
								</div>

								{/* Доп блок для чего-то интересного */}
								{/* <div className="uorg_content">
									<div className="uorg_info">
										<p className="uorg_text">ФИО: {uQuery.data.fullName}</p>
										<p className="uorg_text">ФИО: {uQuery.data.fullName}</p>
										<p className="uorg_text">ФИО: {uQuery.data.fullName}</p>
										<p className="uorg_text">ФИО: {uQuery.data.fullName}</p>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</section>
			</>
		);
	}
};

export default Profile;
