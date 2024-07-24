import "./Auth.css";
import React from "react";
import Registration from "../Registration.tsx/Registarion";
import Authorization from "../Authorization/Authorization";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
const Auth: React.FC = () => {
	const [authType, setAuthType] = React.useState<string>("");

	const handleClick = (state: string) => {
		setAuthType(state);
	};

	if (localStorage.getItem("local")) {
		console.log(`fkkkkkkkkkkkkkk`);
	}
	return (
		<section className="sections auth__section">
			<div className="container">
				<div className="auth_box">
					<div className="wrapper-buttons">
						<ButtonKM
							onClick={() => handleClick("registration")}
							type={`${authType === "registration" ? "btn-reg" : "btn-auth"}`}
						>
							Зарегистрироваться
						</ButtonKM>
						<ButtonKM
							onClick={() => handleClick("authorization")}
							type={`${authType === "registration" ? "btn-auth" : "btn-reg"}`}
						>
							Войти
						</ButtonKM>
					</div>
					<div className="auth__content">
						<div className="auth_render">
							{authType === "registration" ? (
								<Registration />
							) : (
								<Authorization />
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Auth;

{
	/*  */
}
