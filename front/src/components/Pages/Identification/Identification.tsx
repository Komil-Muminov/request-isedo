import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { useUidentity, UidentityType } from "../../API/Hooks/useUidentity";
import { queryClient } from "../../../queryClient";
import InputAuth from "../../UI/InputAuth/InputAuth";
import { LoaderPoints } from "../../UI/LoaderPoints";
import { GetMeType, useAuth } from "../../API/Hooks/useAuth";
import "./Identification.css";
import { useEffect, useState } from "react";

const Identification: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
	} = useForm<UidentityType[]>();

	const { postUidentity } = useUidentity();

	const uIdentityMutation = useMutation(
		{
			mutationFn: (data: UidentityType[]) => postUidentity(data),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["requests"] }),
		},
		queryClient,
	);

	const onSubmit = (data: UidentityType[]) => {
		uIdentityMutation.mutate(data);
	};

	// GetMe

	const { getMe } = useAuth();
	const getMeQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["uidentitygetme"],
		},
		queryClient,
	);

	const [uidentityGetMe, setUidentityGetMe] = useState<GetMeType | undefined>(
		undefined,
	);

	// Получить данные и привязать к инпутам
	useEffect(() => {
		if (getMeQuery.isSuccess) {
			setUidentityGetMe(getMeQuery.data);
		}
	}, [getMeQuery]);

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

					{/* <InputAuth
						register={register}
						inputName="certificatID"
						inputPlaceholder="certificatID"
						requiredMessage="Заполните поле 'certificatID'"
						minLengthMessage="certificatID пустым не должен быть"
						inputType="text"
						kind="uidentity_inp"
						inputDisabled={uIdentityMutation.isSuccess}
					/> */}
					{/* <InputAuth
						register={register}
						inputName="department"
						inputPlaceholder="department2"
						requiredMessage="Заполните поле 'department'"
						minLengthMessage="department пустым не должен быть"
						inputType="text"
						kind="uidentity_inp"
					/> */}

					<InputAuth
						register={register}
						inputName="department"
						inputPlaceholder="department"
						requiredMessage="Заполните поле 'department'"
						minLengthMessage="department пустым не должен быть"
						inputType="file"
						kind="uidentity_inp"
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

					<Button
						type="submit"
						variant="contained"
						disabled={
							uIdentityMutation.isSuccess || uIdentityMutation.isPending
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
