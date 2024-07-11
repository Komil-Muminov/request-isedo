import React, { useState } from "react";
import "./AddRequest.css";
import { Prev } from "../../UI/PrevLink/Prev";
import { Stepper, StepLabel, Step, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { AddrequestScheme } from "./Addrequest";
import { steps } from "../../API/Data/Steps/Steps";
export const AddRequest: React.FC = () => {
	const [activeStep, setActiveStep] = useState(0);

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

	/**
	 * Inputs disabled
	 */
	const [formComplete, setFormComplete] = useState<boolean>(true);
	const onSubmit = (data: AddrequestScheme) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setFormComplete((prev) => !prev);
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
								disabled={!formComplete}
							/>
							<input
								{...register("accountant")}
								type="text"
								className="request_inp"
								disabled={!formComplete}
							/>
							<input
								{...register("desc")}
								type="text"
								className="request_inp"
								disabled={!formComplete}
							/>
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
