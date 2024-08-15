import "./Authorization.css";
import { useForm } from "react-hook-form";
import { LogType, useAuth } from "../../../API/Hooks/useAuth";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../queryClient";

import InputAuth from "../../../UI/InputAuth/InputAuth";
import { useEffect } from "react";

const Authorization = () => {
	const {
		// Функция для регистрации полей формы.
		register,
		handleSubmit,
		// Содержит состояние формы, включая ошибки (errors) и поля, которые были изменены (dirtyFields).
		formState: { errors, dirtyFields },
	} = useForm<LogType>({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	// Используется для вызова функции logMe, которая выполняет вход пользователя.
	const { logMe } = useAuth();
	const navigate = useNavigate();
	// Используется для управления мутацией (в данном случае, логином).
	const logMutate = useMutation({
		// Функция для выполнения мутации.
		mutationFn: (data: LogType) => logMe(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["users", "me"] }),
	});

	const onSubmit = (data: LogType) => {
		// Запускает мутацию с переданными данными, к примеру POST, PUT, DELETE запрос.
		logMutate.mutate(data);
	};

	if (logMutate.isSuccess) {
		navigate("uprofile/udetails");
	}

	console.log(dirtyFields);

	return (
		<>
			<form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-auth_form-content">
					<h3>Министерство финансов</h3>
					<InputAuth
						register={register}
						inputName="username"
						inputPlaceholder="Логин"
						requiredMessage="Это поле объязательно к заполенению"
						minLengthMessage="Имя пользователя должен содержать минимум 2 символов"
						inputType="text"
						kind=""
						inputDefaultValue={""}
						inputDisabled={null}
					/>

					<span className="form_errors-text">
						{errors?.username && errors.username.message}
					</span>
					<InputAuth
						register={register}
						inputName="password"
						inputPlaceholder="Пароль"
						requiredMessage="Заполните поле password"
						minLengthMessage="Пароль должен содержать минимум 2 символов"
						inputType="password"
						kind=""
						inputDefaultValue={""}
						inputDisabled={!dirtyFields.username}
					/>

					<span className="form_errors-text">
						{errors?.password && errors.password.message}
					</span>
				</div>
				<ButtonKM
					disabled={!dirtyFields.username || !dirtyFields.password}
					isLoading={logMutate.isPending}
					type="btn submit_btn"
				>
					Авторизация
				</ButtonKM>
			</form>
		</>
	);
};

export default Authorization;
