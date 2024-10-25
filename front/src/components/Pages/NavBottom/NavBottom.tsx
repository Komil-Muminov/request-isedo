import "./NavBottom.css";
import { Link } from "react-router-dom";

import { moduls } from "../../API/Data/Moduls/Moduls";
import ArticleIcon from "@mui/icons-material/Article";
export const NavBottom: React.FC = () => {
	return (
		<>
			<section className="sections navbottom__section">
				<div className="container">
					<div className="navbottom__content">
						<nav className="navbottom__links">
							{moduls.map((item) => {
								return (
									<Link
										key={item.id}
										to={item.route}
										className="navbottom_item"
									>
										<div className="navbottom__moduls-icons">
											{item.name}
											<ArticleIcon />
										</div>
									</Link>
								);
							})}
						</nav>
					</div>
				</div>
			</section>
		</>
	);
};
