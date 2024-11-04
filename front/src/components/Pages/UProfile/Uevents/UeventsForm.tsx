import React, { useEffect } from "react";
import { UventsDataScheme } from "./UeventsData";
import { Button } from "@mui/material";
import "./UeventsForm.css";

export const UeventsForm: React.FC = ({ onAddEvent }) => {
	const [formValues, setFormValues] = React.useState({ title: "", desc: "" });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValues.title && formValues.desc !== "") {
			const newEvent = { ...formValues, isDone: false };
			onAddEvent((prev) => [...prev, newEvent]);
			if (onAddEvent) {
				localStorage.setItem(
					"events",
					JSON.stringify([
						...JSON.parse(localStorage.getItem("events") || "[]"),
						newEvent,
					]),
				);
			}
			setFormValues({ title: "", desc: "" });
		}
	};

	return (
		<div className="uevents__form-content">
			<form onSubmit={handleSubmit} className="uevetns__form">
				<input
					type="text"
					name="title"
					value={formValues.title}
					onChange={handleChange}
					className="uevents__form-inp"
					placeholder="Задача"
				/>
				<input
					type="text"
					name="desc"
					value={formValues.desc}
					onChange={handleChange}
					className="uevents__form-inp"
					placeholder="Описание"
				/>
				<Button
					disabled={!formValues.title || !formValues.desc}
					type="submit"
					className="uevents__form-sbt"
				>
					Добавить
				</Button>
			</form>
		</div>
	);
};
