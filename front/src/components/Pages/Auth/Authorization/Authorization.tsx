import "./Authorization.css";
import { useForm } from "react-hook-form";
import { LogType, useAuth } from "../../../API/Hooks/useAuth";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../queryClient";
import { Loader } from "../../../UI/Loader/Loader";

const Authorization = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
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
	});

	const onSubmit = (data: LogType) => {
		logMutate.mutate(data);
	};

	if (logMutate.status === "pending") {
		return <Loader />;
	}

	if (logMutate.isSuccess) {
		// navigate("account");
		try {
			queryClient.invalidateQueries({ queryKey: ["users", "me"] });
			console.log(`logMutate's invalidate success ${logMutate.status}`);
		} catch (error) {
			console.log(
				`logMutate's invalidate is false ${logMutate.status && error}`,
			);
		}
		navigate("account");
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
							message: "Имя пользователя должен содержать минимум 2 символов",
						},
					})}
					placeholder="username"
					className="inp"
					name="username"
					defaultValue={""}
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
							message: "password должен содержать минимум 2 символов",
						},
					})}
					placeholder="password"
					className="inp reg_inp"
					type="password"
					name="password"
					defaultValue={""}
					disabled={!dirtyFields.username}
				/>
				<span className="form_errors-text">
					{errors?.password && errors.password.message}
				</span>
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
