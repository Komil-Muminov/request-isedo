import "./Profile.css";
import { Link } from "react-router-dom";
import { Prev } from "../../UI/PrevLink/Prev";
import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { useAuth } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useState } from "react";
import defUphoto from "../../../assets/ErrorPage.jpg";
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
		return (
			//Надо реализовать возможность выгрузки фото
			<>
				<section className="sections">
					<div className="container">
						<div className="profile_content km__content">
							<div className="profile_header">
								<Prev className="profile prev" to={"#"}>
									Назад
								</Prev>
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
									<ul className="list">
										<li className="list_item">
											<Link to={"/"} className="item_link">
												Линк
											</Link>
										</li>
									</ul>
								</div>
								<div className="uCenter_info">
									{" "}
									<h2>PHOTO || INFO || ANYTHING</h2>
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
