import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { useAuth } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useState } from "react";
import defUphoto from "../../../assets/ErrorPage.jpg";
import { ButtonKM } from "../../UI/Button/ButtonKM";
import "./Profile.css";

const Profile: React.FC = () => {
	const [defaultName, setDefaultName] = useState<string | undefined>("Кимки");
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
			return <ErrorPage />;
	}

	//
	if (uQuery.status === "success") {
		try {
			queryClient.invalidateQueries({ queryKey: ["users", "me"] });
			console.log("invalidateQueries выполнена успешно");
		} catch (error) {
			console.error("Ошибка при выполнении invalidateQueries:", error);
		}
		return (
			<>
				<section className="sections">
					<div className="container">
						<div className="profile_content km__content">
							<div className="profile_header">
								<div className="profile prev" to={"#"}>
									Блок "история"
								</div>
								<h2 className="sections__title profile_title">
									Салом,{" "}
									{uQuery.data?.username ? uQuery.data?.username : defaultName}
								</h2>
								<div className="profile_avatar">
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
								<div className="uLeft_content">
									<ul className="uprofile_list">
										<li className="list_item">
											<Link to={"/"} className="item_link">
												Учетная запись
											</Link>
										</li>
										<li className="list_item">
											<Link to={"/"} className="item_link">
												Организация
											</Link>
										</li>
										<li className="list_item">
											<Link to={"/"} className="item_link">
												Модуль заявки
											</Link>
										</li>
									</ul>
								</div>
								<div className="uCenter_info">
									{" "}
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
							</div>
						</div>
					</div>
				</section>
			</>
		);
	}
};
export default Profile;
