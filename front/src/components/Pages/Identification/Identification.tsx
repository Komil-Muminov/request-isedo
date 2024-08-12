import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button, TextField } from "@mui/material";
import { PostUidentityType, useUidentity } from "../../API/Hooks/useUidentity";
import { queryClient } from "../../../queryClient";
import "./Identification.css";
import InputAuth from "../../UI/InputAuth/InputAuth";

const Identification: React.FC = () => {
	const {
		register,
		formState: { errors, dirtyFields },
		watch,
		reset,
		handleSubmit,
	} = useForm<PostUidentityType>();

	const { postUidentity } = useUidentity();

	const uIdentityMutation = useMutation({
		mutationFn: (data: PostUidentityType) => postUidentity(data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["requests"] }),
	});
	const navigate = useNavigate();

	const onSubmit = (data: PostUidentityType) => {
		uIdentityMutation.mutate(data);
	};

	return (
		<>
			<form className="form uidentity_form" onSubmit={handleSubmit(onSubmit)}>
				<InputAuth
					register={register}
					inputName="orgName"
					inputPlaceholder="Наименование организации"
					requiredMessage="Заполните поле 'Наименование организации'"
					minLengthMessage="Наименование организации должно содержать минимум 5 символов"
					inputType="text"
					kind="inp uidentity_inp"
				/>
				<InputAuth
					register={register}
					inputName="departmentName"
					inputPlaceholder="Наименование Отдела"
					requiredMessage="Заполните поле 'Наименование Отдела'"
					minLengthMessage="Наименование Отдела должно содержать минимум 5 символов"
					inputType="text"
					kind="inp uidentity_inp"
				/>
				<InputAuth
					register={register}
					inputName="post"
					inputPlaceholder="Должность"
					requiredMessage="Заполните поле 'Должность'"
					minLengthMessage="Должность должна содержать минимум 5 символов"
					inputType="text"
					kind="inp uidentity_inp"
				/>
				<InputAuth
					register={register}
					inputName="file"
					inputPlaceholder="Загрузите файл"
					requiredMessage="Загрузите файл"
					minLengthMessage="Загрузите файл"
					inputType="file"
					kind="inp uidentity_inp"
				/>
				<Button type="submit">Отправить</Button>
			</form>
		</>

		// <section className="sections">
		// 	<div className="wrapper-prev">
		// 		<div className="container">
		// 			<Button
		// 				onClick={() => navigate(-1)}
		// 				variant="outlined"
		// 				sx={{ borderRadius: "50px" }}
		// 			>
		// 				Назад
		// 			</Button>
		// 		</div>
		// 	</div>
		// 	<div className="container">
		// 		<div className="wrapper-identification">
		// 			<h1 className="sections__title">Форма идентификации пользователя</h1>
		// 			<form
		// 				className="form uidentity_form"
		// 				onSubmit={handleSubmit(onSubmit)}
		// 			>
		// 				<InputAuth
		// 					register={register}
		// 					inputName="orgName"
		// 					inputPlaceholder="Наименование организации"
		// 					requiredMessage="Заполните поле 'Наименование организации'"
		// 					minLengthMessage="Наименование организации должно содержать минимум 5 символов"
		// 					inputType="text"
		// 					kind="inp uidentity_inp"
		// 				/>
		// 				<InputAuth
		// 					register={register}
		// 					inputName="departmentName"
		// 					inputPlaceholder="Наименование Отдела"
		// 					requiredMessage="Заполните поле 'Наименование Отдела'"
		// 					minLengthMessage="Наименование Отдела должно содержать минимум 5 символов"
		// 					inputType="text"
		// 					kind="inp uidentity_inp"
		// 				/>
		// 				<InputAuth
		// 					register={register}
		// 					inputName="post"
		// 					inputPlaceholder="Должность"
		// 					requiredMessage="Заполните поле 'Должность'"
		// 					minLengthMessage="Должность должна содержать минимум 5 символов"
		// 					inputType="text"
		// 					kind="inp uidentity_inp"
		// 				/>
		// 				<InputAuth
		// 					register={register}
		// 					inputName="file"
		// 					inputPlaceholder="Загрузите файл"
		// 					requiredMessage="Загрузите файл"
		// 					minLengthMessage="Загрузите файл"
		// 					inputType="file"
		// 					kind="inp uidentity_inp"
		// 				/>
		// 				<Button type="submit">Отправить</Button>
		// 			</form>
		// 		</div>
		// 	</div>
		// </section>
	);
};

export default Identification;
