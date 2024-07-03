import "./NavBottom.css";
import { Link } from "react-router-dom";
export const NavBottom: React.FC = () => {
	return (
		<>
			<section className="sections navbottom__section">
				<div className="container">
					<div className="navbottom__content">
						<nav className="navbottom__links">
							<Link to="noLink" className="navbottom_item">
								Основные документы
							</Link>
							<Link to="noLink" className="navbottom_item">
								Первичные документы
							</Link>
							<Link to="noLink" className="navbottom_item">
								Письма
							</Link>
							<Link to="noLink" className="navbottom_item">
								Заявки
							</Link>
						</nav>
					</div>
				</div>
			</section>
		</>
	);
};
