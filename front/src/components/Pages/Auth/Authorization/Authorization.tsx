import "./Authorization.css";
import { useForm } from "react-hook-form";
import { RegType } from "../../../Hooks/useAuth";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../queryClient";
import { LogType } from "../../../Hooks/useAuth";
import Account from "../../Account/Account";
import { Loader } from "../../../UI/Loader";
import Auth from "../Auth/Auth";
const Authorization = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<RegType>({
		defaultValues: {
			username: "",
			password: "",
		},
	});
	// Надо реализовать
	const { logMe } = useAuth();
	const data: LogType = getValues();
	const logMutate = useMutation(
		{
			mutationFn: () => logMe(data),
			mutationKey: ["someKey"],
		},
		queryClient,
	);

	const onSubmit = (data: LogType) => {
		logMutate.mutate();
	};

	if (logMutate.isPending) {
		return <Loader />;
	}
	if (logMutate.isError) {
		return (
			<>
				<Authorization />
				<p>Ошибка при атворизации</p>
			</>
		);
	}
	if (logMutate.isSuccess) {
		return <Account />;
	}

	return (
		<>
			<section className="sections">
				<div className="container">
					<div className="authorization__content km__content">
						<form className="form" onSubmit={handleSubmit(onSubmit)}>
							<input
								{...register("username", {
									required: {
										value: true,
										message: "это поле объязательно к заполенению",
									},
									minLength: {
										value: 5,
										message:
											"Имя пользователя должен содержать минимум 5 символов",
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
										value: 5,
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
					</div>{" "}
					<Link to={`/auth`}>У вас еще нет аккаунта?</Link>
				</div>
			</section>
		</>
	);
};

export default Authorization;
