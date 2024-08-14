import "./AddRequest.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, StepLabel, Step, Button, TextField } from "@mui/material";

// Хук из библиотеки react-hook-form для управления состоянием формы.
import { useForm, Controller } from "react-hook-form";
import { PostRqstScheme, postRequest } from "../../API/PostRqsts";
import { stepsOfKvd, stepsOfBo } from "../../API/Data/Steps/Steps";

// RTQ
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { fileInfo } from "../../API/Data/Documents/DocumentList";

import "@radix-ui/themes/styles.css";
import { Select } from "@radix-ui/themes";
import TableRowRequest from "../../UI/TableRow/TableRowRequest";
import { GetMeType, useAuth } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader/Loader";

const AddRequest: React.FC = () => {
	// Состояние текущего активного шага в индикаторе.
	const [activeStep, setActiveStep] = useState<number>(0);

	const navigate = useNavigate();

	const { getMe } = useAuth();
	const uQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["users", "me"],
		},
		queryClient,
	);

	const [uinfo, setUinfo] = useState<GetMeType | null>(null);
	// const [expanded, setExpanded] = useState<number | false>(false);

	useEffect(() => {
		if (uQuery.status === "success") {
			setUinfo(uQuery.data);
		}
	}, [uQuery.status, uQuery.data]);

	if (uQuery.status === "pending") return <Loader />;
	if (uQuery.status === "error") {
		console.log(uQuery.error);
		return null;
	}

	const steps =
		uinfo?.uType === "kvd"
			? stepsOfKvd
			: uinfo?.uType === "bo"
			? stepsOfBo
			: [];

	const {
		control,
		register,
		// Записывает все стейты в массив
		handleSubmit,
		// Функция dirtyFields возвращает true или false в зависимости от того, было ли изменено поле "Название организации".
		// Поле для бухгалтера становится доступным только если поле "Название организации" было изменено.
		watch,
		formState: { dirtyFields },
	} = useForm<PostRqstScheme>({
		defaultValues: {
			orgname: "",
			accountant: "",
			desc: "",
			reqType: "Смена бухгалтера",
			reqStatus: steps[0],
		},
	});
	// Функция для отслеживания изменений значений в реальном времени.
	const reqType = watch("reqType");

	console.log(reqType);

	const postRqstsMutation = useMutation({
		mutationFn: (data: PostRqstScheme) => postRequest(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["requests"] });
		},
	});

	// Увеличивает номер текущего шага на 1.
	const onSubmit = (data: PostRqstScheme) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		const updateReqData = { ...data, reqStatus: steps[activeStep] };
		console.log(`reqStatus: ${updateReqData.reqStatus}`);
		postRqstsMutation.mutate(updateReqData);
	};

	const [file, setGetFile] = useState({ number: 0, file: "" });

	const handleGetFile = (id: number, file: File | null) => {
		setGetFile({ number: id, file: file ? file.name : "" });
	};

	console.log(uinfo?.uType, activeStep);

	return (
		<section className="sections">
			<div className="wrapper-prev">
				<div className="container">
					<Button
						onClick={() => navigate(-1)}
						variant="outlined"
						sx={{ borderRadius: "50px" }}
					>
						Назад
					</Button>
				</div>
			</div>
			<div className="container">
				<div className="addRequest__content km__content">
					{/* <Stepper>: Компонент для отображения шагового индикатора, который отображает прогресс.
					 */}
					<h1>Создание</h1>
					<Stepper
						sx={{ display: "flex", justifyContent: "space-between" }}
						activeStep={activeStep}
						alternativeLabel
					>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
				</div>
				<section className="details-request">
					<div className="title">
						<p>Детали заявки</p>
					</div>
					<div className="form_content">
						<form className="request_form" onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="reqType"
								control={control}
								render={({ field }) => (
									<Select.Root
										defaultValue={field.value}
										onValueChange={field.onChange}
									>
										<Select.Trigger color="gray" />
										<Select.Content color="gray" variant="solid" highContrast>
											<Select.Item value="Выберите тип заявки">
												Выберите тип заявки
											</Select.Item>
											<Select.Item value="Смена бухгалтера">
												Смена бухгалтера
											</Select.Item>
											<Select.Item value="Смена руководителя">
												Смена руководителя
											</Select.Item>
										</Select.Content>
									</Select.Root>
								)}
							/>
							{reqType === "Смена бухгалтера" && (
								<>
									<TextField
										{...register("orgname")}
										type="text"
										id="orgname"
										className="request_inp"
										placeholder="ФИО бухгалтера"
									/>
									<TextField
										{...register("accountant")}
										type="text"
										className="request_inp"
										placeholder="Должность бухгалтера"
										disabled={!dirtyFields.orgname}
									/>
									<TextField
										{...register("desc")}
										type="text"
										className="request_inp"
										placeholder="Контанты бухгалтера"
										disabled={!dirtyFields.accountant}
									/>
									<div className="wrapper-table">
										<table>
											<thead>
												<tr>
													<th></th>
													<th>Файл</th>
													<th>Тип документа</th>
												</tr>
											</thead>
											<tbody>
												{fileInfo.map((e) => {
													return (
														<TableRowRequest
															key={e.id}
															item={e}
															handleGetFile={handleGetFile}
														/>
													);
												})}
											</tbody>
										</table>
									</div>
								</>
							)}
							{reqType === "Смена руководителя" && (
								<>
									<TextField
										{...register("orgname")}
										type="text"
										id="orgname"
										className="request_inp"
										// KM
										placeholder="ФИО руководителя"
									/>
									<TextField
										{...register("accountant")}
										type="text"
										className="request_inp"
										placeholder="Должность руководителя"
										disabled={!dirtyFields.orgname}
									/>
									<TextField
										{...register("desc")}
										type="text"
										className="request_inp"
										placeholder="Контанты руководителя"
										disabled={!dirtyFields.accountant}
									/>
									<TextField
										{...register("desc")}
										type="text"
										className="request_inp"
										placeholder="Организация руководителя"
										disabled={!dirtyFields.accountant}
									/>
								</>
							)}
						</form>
						<Button
							variant="contained"
							onClick={handleSubmit(onSubmit)}
							sx={{ marginTop: "20px" }}
							disabled={
								(activeStep !== 0 && uinfo?.uType === "bo") ||
								(activeStep === 0 && uinfo?.uType === "kvd") ||
								!dirtyFields.accountant ||
								!dirtyFields.orgname ||
								!dirtyFields.desc
							}
						>
							<span className="shadow"></span>
							<span className="edge"></span>
							<span className="front">Отправить</span>
						</Button>
					</div>
				</section>
			</div>
		</section>
	);
};

export default AddRequest;
