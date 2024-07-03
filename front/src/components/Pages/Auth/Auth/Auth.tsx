import "./Auth.css";
import React from "react";
import Registration from "../Registration.tsx/Registarion";
import Authorization from "../Authorization/Authorization";
import log from "../../../../assets/Formal/log.png";
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
				<img className={`auth_log`} src={log} alt="герб" />
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
									: "У вас нет аккаунта ?"}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Auth;

// const [showPassword, setShowPassword] = useState(false);

// const handleClickShowPassword = () => setShowPassword((show) => !show);
// const handleMouseDownPassword = (
// 	event: React.MouseEvent<HTMLButtonElement>,
// ) => {
// 	event.preventDefault();
// };
{
	/* <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
	<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
	<OutlinedInput
		id="outlined-adornment-password"
		type={showPassword ? "text" : "password"}
		endAdornment={
			<InputAdornment position="end">
				<IconButton
					aria-label="toggle password visibility"
					onClick={handleClickShowPassword}
					onMouseDown={handleMouseDownPassword}
					edge="end"
				>
					{showPassword ? <VisibilityOff /> : <Visibility />}
				</IconButton>
			</InputAdornment>
		}
		label="Password"
	/>
</FormControl>; */
}
