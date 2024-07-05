import { useState } from "react";
import { Link } from "react-router-dom";
import "./ErroPage.css";
import ErrorImg from "../../../assets/ErrorPage.jpg";
const ErrorPage = () => {
	return (
		<>
			<section className="sections">
				<div className="container">
					<div className="errorPage__content">
						<div className="erropage_img">
							<img src={ErrorImg} alt="errorpage" className="errorpage_img" />
						</div>
						<p className="km__info-text errorpage_info-text">
							Упс! Страница не найдена. Пожалуйста, проверьте правильность
							адреса или вернитесь на главную страницу.
						</p>
						<Link to={"/account"}>Главная страница</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default ErrorPage;
