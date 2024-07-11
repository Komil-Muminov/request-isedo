import React, { useState } from "react";
import "./AddRequest.css";
import { Prev } from "../../UI/PrevLink/Prev";
import { Stepper, StepLabel, Step, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { AddrequestScheme } from "./Addrequest";
export const AddRequest: React.FC = () => {
	const steps = [
		"Select master blaster campaign settings",
		"Create an ad group",
		"Create an ad",
	];

	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
	} = useForm<AddrequestScheme>({
		defaultValues: {
			boname: "",
			accountant: "",
			desc: "",
		},
	});

	const onSubmit = (data: AddrequestScheme) => {
		console.log(data);
	};

	return (
		<section className="sections">
			<div className="container">
				<div className="addRequest__content km__content">
					<h1>AddRequest</h1>
					<Stepper activeStep={activeStep} alternativeLabel>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<div className="form_content">
						<form className="request_form ">
							<input
								{...register("boname")}
								type="text"
								className="request_inp"
							/>
							<input
								{...register("accountant")}
								type="text"
								className="request_inp"
							/>
							<input
								{...register("desc")}
								type="text"
								className="request_inp"
							/>
							<Button
								type={`submit`}
								onClick={handleSubmit(onSubmit)}
								disabled={
									!dirtyFields.accountant ||
									!dirtyFields.boname ||
									!dirtyFields.desc
								}
							>
								Отправить
							</Button>
						</form>
					</div>
				</div>
				<Prev className="addrequest_prev" to={"#"}>
					Назад
				</Prev>
			</div>
		</section>
	);
};
