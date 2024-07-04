import "./Profile.css";
import { Link } from "react-router-dom";
import { Prev } from "../../UI/PrevLink/Prev";
import { Avatar } from "@mui/material";
const Profile: React.FC = () => {
	return (
		//Надо реализовать возможность выгрузки фото
		<>
			<section className="sections">
				<div className="container">
					<div className="profile_header">
						<Prev className="profile prev" to={"#"}>
							Назад
						</Prev>
						<h2 className="sections__title profile_title">Салом, Кимкичон</h2>
						<div className="profile_avatar">
							<Avatar className="nav_user-log" alt="user">
								Avatar
							</Avatar>
						</div>
					</div>
					<div className="profile__content km__content">
						<div className="left_side-content">
							<ul className="list">
								<li className="list_item">
									<Link to={"/"} className="item_link">
										Линк
									</Link>
								</li>
							</ul>
						</div>
						<div className="center_content">center</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Profile;
