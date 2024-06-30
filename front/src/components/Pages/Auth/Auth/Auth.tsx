import React from "react";
import { Link } from "react-router-dom";
import Registration from "../Registration.tsx/Registarion";
import Authorization from "../Authorization/Authorization";
// import { ButtonKM } from "../../../UI/Button/ButtonKM";
import "./Auth.css";
const Auth: React.FC = () => {
	const [authType, setAuthType] = React.useState<string>("registration");

	const handleClick = () => {
		setAuthType((prev) =>
			prev === "registration" ? "authorization" : "registration",
		);
	};

	return (
		<div className="container">
			<div className="auth__content">
				<div className="auth_render">
					{authType === "registration" ? <Registration /> : <Authorization />}
				</div>

				<div className="auth_logic">
					<Link
						to={`/${
							authType === "registration" ? "authorization" : "registration"
						}`}
						onClick={handleClick}
					>
						{authType === "registration"
							? "Воу вас уже есть аккаунт? "
							: "registration"}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Auth;
