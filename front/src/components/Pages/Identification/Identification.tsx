import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { PostUidentityType, useUidentity } from "../../API/Hooks/useUidentity";
import { queryClient } from "../../../queryClient";
import "./Identification.css";
import InputAuth from "../../UI/InputAuth/InputAuth";
import { LoaderPoints } from "../../UI/LoaderPoints";

const Identification: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
	} = useForm<PostUidentityType>();

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
						inputName="inn"
						inputPlaceholder="ИНН организации"
						requiredMessage="Заполните поле 'Наименование организации'"
						minLengthMessage="Наименование организации должно содержать минимум 5 символов"
						inputType="text"
						kind="uidentity_inp"
						inputDisabled={uIdentityMutation.isSuccess}
					/>
					<InputAuth
						register={register}
						inputName="fullName"
						inputPlaceholder="ФИО"
						requiredMessage="Заполните поле 'ФИО'"
						minLengthMessage="Наименование организации должно содержать минимум 5 символов"
						inputType="text"
						kind="uidentity_inp"
						inputDisabled={uIdentityMutation.isSuccess || !dirtyFields.inn}
					/>

					<InputAuth
						register={register}
						inputName="login"
						inputPlaceholder="login"
						requiredMessage="Заполните поле 'login'"
						minLengthMessage="login не должен быть пустым"
						inputType="text"
						kind="uidentity_inp"
					/>

					<InputAuth
						register={register}
						inputName="role"
						inputPlaceholder="Должность"
						requiredMessage="Заполните поле Должность"
						minLengthMessage="Должность пустым не должен быть"
						inputType="text"
						kind="uidentity_inp"
					/>

					<InputAuth
						register={register}
						inputName="sku"
						inputPlaceholder="Единица учета"
						requiredMessage="Заполните поле 'Единица учета'"
						minLengthMessage="Единица учета не должен быть пустымк"
						inputType="text"
						kind="uidentity_inp"
						inputDisabled={uIdentityMutation.isSuccess}
					/>
					<InputAuth
						register={register}
						inputName="organization"
						inputPlaceholder="organization"
						requiredMessage="Заполните поле 'Наименование организации'"
						minLengthMessage="organization пустым не должен быть"
						inputType="text"
						kind="uidentity_inp"
						inputDisabled={uIdentityMutation.isSuccess}
					/>

					<InputAuth
						register={register}
						inputName="certificatID"
						inputPlaceholder="certificatID"
						requiredMessage="Заполните поле 'certificatID'"
						minLengthMessage="certificatID пустым не должен быть"
						inputType="text"
						kind="uidentity_inp"
						inputDisabled={uIdentityMutation.isSuccess}
					/>
					<InputAuth
						register={register}
						inputName="department"
						inputPlaceholder="department"
						requiredMessage="Заполните поле 'department'"
						minLengthMessage="department пустым не должен быть"
						inputType="text"
						kind="uidentity_inp"
						inputDisabled={uIdentityMutation.isSuccess}
					/>

					{/* <InputAuth
						register={register}
						inputName="file"
						inputPlaceholder="Загрузите файл"
						requiredMessage="Загрузите файл"
						minLengthMessage="Загрузите файл"
						inputType="file"
						kind="uidentity_inp"
					/> */}

					{/* при нажатии на сабмит должно создаваться uidentity и request с типом идентификация
					пока он не пройдет идентификацию он не сможет отправлять запрос 
					также надо добавить поля (массив с объектом )
					
					*/}
					<Button
						type="submit"
						variant="contained"
						disabled={
							uIdentityMutation.isSuccess ||
							uIdentityMutation.isPending ||
							!dirtyFields.inn
						}
						sx={{
							backgroundColor: "#607d8b",
							"&:hover": {
								backgroundColor: "#546d79",
							},
						}}
					>
						{uIdentityMutation.isPending ? <LoaderPoints /> : "Отправить"}
					</Button>
				</form>
			</div>
		</>
	);
};

export default Identification;
