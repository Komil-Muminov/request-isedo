import "./Registarion.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RegType } from "../../../Hooks/useAuth";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { queryClient } from "../../../../queryClient";
import { useAuth } from "../../../Hooks/useAuth";
const Registration = () => {
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
			onSuccess: () => console.log(`YES`),
			onError: () => console.log(`No`),
		},
		queryClient,
	);
	const onSubmit = () => {
		regMutate.mutate();
	};

	return (
		<>
			{/* Форму необходимо добавить MUI */}
			<div className="registration__conten km__content">
				<form className="form form__content" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("username", {
							required: {
								value: true,
								message: "это поле объязательно к заполенению",
							},
							minLength: {
								value: 5, // Убедитесь, что значение minLength соответствует сообщению об ошибке
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
								value: 5,
								message: "password должен содержать минимум 5 символов",
							},
						})}
						placeholder="password"
						className="inp reg_inp"
						type="password"
						name="password"
					/>

					<select {...register("role")} className="inp reg_inp" id="role">
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
					<span className="form_errors-text">
						{errors?.password && errors.password.message}
					</span>
					<ButtonKM type="btn submit_btn">Зарегистрироваться</ButtonKM>
				</form>
			</div>
		</>
	);
};

export default Registration;
