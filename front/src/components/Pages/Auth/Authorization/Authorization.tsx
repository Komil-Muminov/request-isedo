import "./Authorization.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { RegType } from "../../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { Link } from "react-router-dom";
const Authorization = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegType>({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = (data: RegType) => {
		console.log(data);
	};

	return (
		<>
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
						<ButtonKM type="btn submit_btn">Авторизация</ButtonKM>
					</form>
				</div>{" "}
				<Link to={`/auth`}>У вас еще нет аккаунта?</Link>
			</div>
		</>
	);
};

export default Authorization;
