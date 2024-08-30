import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { PostUidentityType, useUidentity } from "../../API/Hooks/useUidentity";
import { queryClient } from "../../../queryClient";
import "./Identification.css";
import InputAuth from "../../UI/InputAuth/InputAuth";

const Identification: React.FC = () => {
	const { register, handleSubmit } = useForm<PostUidentityType>();

	const { postUidentity } = useUidentity();

	const uIdentityMutation = useMutation(
		{
			mutationFn: (data: PostUidentityType) => postUidentity(data),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["requests"] }),
		},
		queryClient,
	);

	const onSubmit = (data: PostUidentityType) => {
		uIdentityMutation.mutate(data);
	};

	return (
		<>
			<div className="uidentity_content">
				<div className="sections__title udentity_title">
					<h1>Форма идентификации</h1>
				</div>
				<form className="form uidentity_form" onSubmit={handleSubmit(onSubmit)}>
					<InputAuth
						register={register}
						inputName="orgName"
						inputPlaceholder="Наименование организации"
						requiredMessage="Заполните поле 'Наименование организации'"
						minLengthMessage="Наименование организации должно содержать минимум 5 символов"
						inputType="text"
						kind="uidentity_inp"
					/>
					<InputAuth
						register={register}
						inputName="departmentName"
						inputPlaceholder="Наименование Отдела"
						requiredMessage="Заполните поле 'Наименование Отдела'"
						minLengthMessage="Наименование Отдела должно содержать минимум 5 символов"
						inputType="text"
						kind="uidentity_inp"
					/>
					<InputAuth
						register={register}
						inputName="post"
						inputPlaceholder="Должность"
						requiredMessage="Заполните поле 'Должность'"
						minLengthMessage="Должность должна содержать минимум 5 символов"
						inputType="text"
						kind="uidentity_inp"
					/>
					<InputAuth
						register={register}
						inputName="file"
						inputPlaceholder="Загрузите файл"
						requiredMessage="Загрузите файл"
						minLengthMessage="Загрузите файл"
						inputType="file"
						kind="uidentity_inp"
					/>
				</form>
				<Button
					type="submit"
					variant="contained"
					sx={{
						backgroundColor: "#607d8b",
						"&:hover": {
							backgroundColor: "#546d79",
						},
					}}
				>
					Отправить 2
				</Button>
			</div>
		</>
	);
};

export default Identification;
