import "./ZayavkiLinks.css";
import { Link } from "react-router-dom";
export const ZayavkiLinks: React.FC = () => {
	return (
		<>
			<section className="sections zayavkilinks__section">
				<div className="container">
					<div className="zayavkilinks__content">
						<nav className="zayavkilinks__nav">
							<Link to="" className="zayavki_nav-links">
								МФРТ
							</Link>
							<Link to="" className="zayavki_nav-links">
								БО
							</Link>
							<Link to="" className="zayavki_nav-links">
								КО
							</Link>
							<Link to="" className="zayavki_nav-links">
								ФИЗ ЛИЦА
							</Link>
							<Link to="" className="zayavki_nav-links">
								ОТЧЕТЫ
							</Link>
							<Link to="" className="zayavki_nav-links">
								ПОИСК
							</Link>
						</nav>
					</div>
				</div>
			</section>
		</>
	);
};
