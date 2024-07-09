import "./Authorization.css";
import { useForm } from "react-hook-form";
import { LogType, useAuth } from "../../../API/Hooks/useAuth";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "../../../UI/Loader";

const Authorization = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<LogType>({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const { logMe } = useAuth();
	// const data: LogType = getValues();
	const navigate = useNavigate();
	const logMutate = useMutation({
		mutationFn: (data: LogType) => logMe(data),
		onSuccess: () => navigate("account"),
	});

	const onSubmit = (data: LogType) => {
		logMutate.mutate(data);
	};

	if (logMutate.status === "pending") {
		return <Loader />;
	}

	return (
		<>
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("username", {
						required: {
							value: true,
							message: "это поле объязательно к заполенению",
						},
						minLength: {
							value: 2,
							message: "Имя пользователя должен содержать минимум 5 символов",
						},
					})}
					placeholder="username"
					className="inp reg_inp"
					name="username"
				/>
				<span className="form_errors-text">
					{errors?.username && errors.username.message}
				</span>
				<input
					{...register("password", {
						required: {
							value: true,
							message: "Заполните поле password",
						},
						minLength: {
							value: 2,
							message: "password должен содержать минимум 5 символов",
						},
					})}
					placeholder="password"
					className="inp reg_inp"
					type="password"
					name="password"
				/>
				<span className="form_errors-text">
					{errors?.password && errors.password.message}
				</span>
				<ButtonKM isLoading={logMutate.isPending} type="btn submit_btn">
					Авторизация
				</ButtonKM>
			</form>
		</>
	);
};

export default Authorization;
