import { useState } from "react";
import { Link } from "react-router-dom";
import "./ErroPage.css";
const ErrorPage = () => {
	const [state, setState] = useState<string>("");
	return (
		<>
			<section className="sections">
				<div className="container">
					<div className="errorPage__content">
						<p className="km__info-text errorpage_info-text">
							Упс! Страница не найдена. Пожалуйста, проверьте правильность
							адреса или вернитесь на главную страницу.
						</p>
						<Link to={"/"}>Главная страница</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default ErrorPage;
