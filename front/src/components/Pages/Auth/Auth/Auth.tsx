import "./Auth.css";
import React from "react";
import Registration from "../Registration.tsx/Registarion";
import Authorization from "../Authorization/Authorization";
const Auth: React.FC = () => {
	const [authType, setAuthType] = React.useState<string>("registration");

	const handleClick = () => {
		setAuthType((prev) =>
			prev === "registration" ? "authorization" : "registration",
		);
	};

	return (
		<section className="sections auth__section">
			<div className="container">
				<div className="auth_box">
					<div className="auth__content km__content">
						<div className="auth_render">
							{authType === "registration" ? (
								<Registration />
							) : (
								<Authorization />
							)}
						</div>
						<div className="auth_logic">
							<span className="auth_rechange" onClick={handleClick}>
								{authType === "registration"
									? "У вас есть аккаунт ? "
									: `У вас нет аккаунта ?`}
							</span>
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
