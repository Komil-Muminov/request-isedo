import "./AddRequest.css";
import React, { useState } from "react";
import { Prev } from "../../UI/PrevLink/Prev";
import { Stepper, StepLabel, Step, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { PostRqstScheme } from "../../API/PostRqsts";
import { steps } from "../../API/Data/Steps/Steps";
import { postRequest } from "../../API/PostRqsts";
const AddRequest: React.FC = () => {
	const [activeStep, setActiveStep] = useState<number>(0);
	const {
		register,
		handleSubmit,
		formState: { dirtyFields },
	} = useForm<PostRqstScheme>({
		defaultValues: {
			boname: "",
			accountant: "",
			desc: "",
		},
	});

	/**
	 * Inputs disabled
	 */
	const onSubmit = (data: PostRqstScheme) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		console.log(`postRequest:${postRequest} + `);
		postRequest(data);
	};
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
							<input
								{...register("boname")}
								type="text"
								id="boname"
								className="inp request_inp"
								placeholder="БО"
							/>

							<input
								{...register("accountant")}
								type="text"
								className="inp request_inp"
								placeholder="Бухгалтер"
								disabled={!dirtyFields.boname}
							/>
							<input
								{...register("desc")}
								type="text"
								className="inp request_inp"
								placeholder="Описание"
								disabled={!dirtyFields.accountant}
							/>
						</form>
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
