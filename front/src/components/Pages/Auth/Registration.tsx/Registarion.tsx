import "./Registarion.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RegType } from "../../../API/Hooks/useAuth";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { queryClient } from "../../../../queryClient";
import { useAuth } from "../../../API/Hooks/useAuth";
import { Loader } from "../../../UI/Loader/Loader";
import ErrorPage from "../../ErrorPage/ErrorPage";
import Authorization from "../Authorization/Authorization";

const Registration = () => {
	// Надо доработать
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<RegType>({
		defaultValues: {
			username: "",
			password: "",
			role: "",
		},
	});

	const { regMe } = useAuth();
	const data: RegType = getValues();
	console.log(data);
	const regMutate = useMutation(
		{
			mutationFn: () => regMe(data),
			onError: () => console.log(`No`),
		},
		queryClient,
	);
	const onSubmit = () => {
		regMutate.mutate();
	};

	switch (regMutate.status) {
		case "success":
			return <Authorization />;
	}

	return (
		<>
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="form_form-content">
					<h3>Министерство финансов</h3>
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
						placeholder="Логин"
						className="reg_inp"
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
						placeholder="Пароль"
						className="reg_inp"
						type="password"
						name="password"
					/>

					<select
						{...register("role")}
						className="reg_inp reg_inp-select"
						id="role"
					>
						<option className="reg_inp-option" value="">
							Тип пользователя
						</option>
						<option className="reg_inp-option" value="user">
							User
						</option>
						<option className="reg_inp-option" value="admin">
							Admin
						</option>
					</select>
					<span className="form_errors-text">
						{errors?.password && errors.password.message}
					</span>
				</div>
				<ButtonKM
					disabled={regMutate.isPending}
					isLoading={regMutate.isPending}
					type="submit"
				>
					Зарегистрироваться
				</ButtonKM>
			</form>
		</>
	);
};

export default Registration;
