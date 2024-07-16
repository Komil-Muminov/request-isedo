import "./AddRequest.css";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Prev } from "../../UI/PrevLink/Prev";
import { Stepper, StepLabel, Step, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { AddrequestScheme } from "./Addrequest";
import { steps } from "../../API/Data/Steps/Steps";
import { postRequest } from "./APIRequests";
const AddRequest: React.FC = () => {
	const [activeStep, setActiveStep] = useState(0);
	const {
		register,
		handleSubmit,
		formState: { dirtyFields },
	} = useForm<AddrequestScheme>({
		defaultValues: {
			boname: "",
			accountant: "",
			desc: "",
		},
	});

	/**
	 * Inputs disabled
	 */
	const [formComplete, setFormComplete] = useState<boolean>(true);
	const onSubmit = (data: AddrequestScheme) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setFormComplete((prev) => !prev);
		console.log(`postRequest:${postRequest} + `);
		postRequest(data);
	};
	// Надо синхронизировать степы с запросам
	return (
		<section className="sections">
			<div className="container">
				<div className="addRequest__content km__content">
					<h1>Создание</h1>
					<Stepper activeStep={activeStep} alternativeLabel>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<div className="form_content">
						<form className="request_form ">
							{/* <label htmlFor="boname">KM</label> */}
							<input
								{...register("boname")}
								type="text"
								id="boname"
								className="inp request_inp"
								placeholder="БО"
								disabled={!formComplete}
							/>

							<input
								{...register("accountant")}
								type="text"
								className="inp request_inp"
								placeholder="Бухгалтер"
								disabled={!formComplete}
							/>
							<input
								{...register("desc")}
								type="text"
								className="inp request_inp"
								placeholder="Описание"
								disabled={!formComplete}
							/>
						</form>
						<Button
							type={`submit`}
							onClick={handleSubmit(onSubmit)}
							disabled={
								!dirtyFields.accountant ||
								!dirtyFields.boname ||
								!dirtyFields.desc ||
								!formComplete
							}
						>
							Отправить
						</Button>
					</div>
				</div>
				<Prev className="addrequest_prev" to={"#"}>
					Назад
				</Prev>
			</div>
		</section>
	);
};

export default AddRequest;
