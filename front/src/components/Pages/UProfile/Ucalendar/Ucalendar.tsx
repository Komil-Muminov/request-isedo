import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ru from "date-fns/locale/ru";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { parseISO } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Ucalendar.css";

interface Task {
	id: number;
	title: string;
	description: string;
	start: Date;
	end: Date;
}

const locales = { ru };
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

export const Ucalendar = () => {
	const [events, setEvents] = useState<Task[]>([]);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		start: "",
		end: "",
	});
	const [showForm, setShowForm] = useState(false);
	const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

	useEffect(() => {
		const savedEvents = localStorage.getItem("ucalendar");
		if (savedEvents) {
			const parsedEvents = JSON.parse(savedEvents);
			const updatedEvents = parsedEvents.map((event: Task) => ({
				...event,
				start: parseISO(event.start),
				end: parseISO(event.end),
			}));
			setEvents(updatedEvents);
		}
	}, []);

	useEffect(() => {
		if (events.length > 0) {
			const eventsToSave = events.map((event) => ({
				...event,
				start: event.start.toISOString(),
				end: event.end.toISOString(),
			}));
			localStorage.setItem("ucalendar", JSON.stringify(eventsToSave));
		}
	}, [events]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAddOrUpdateEvent = () => {
		const { title, description, start, end } = formData;

		if (!title || !start || !end) {
			alert("Заполните все обязательные поля!");
			return;
		}

		const newEvent: Task = {
			id: selectedEventId || Date.now(),
			title,
			description,
			start: parseISO(start),
			end: parseISO(end),
		};

		if (selectedEventId) {
			setEvents((prev) =>
				prev.map((event) =>
					event.id === selectedEventId ? { ...event, ...newEvent } : event,
				),
			);
		} else {
			setEvents((prev) => [...prev, newEvent]);
		}

		setFormData({ title: "", description: "", start: "", end: "" });
		setShowForm(false);
		setSelectedEventId(null);
	};

	const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
		setSelectedEventId(null); // Сбрасываем выбранное событие
		setShowForm((prev) => !prev); // Переключаем видимость формы
		if (!showForm) {
			setFormData({
				title: "",
				description: "",
				start: format(start, "yyyy-MM-dd'T'HH:mm"),
				end: format(end, "yyyy-MM-dd'T'HH:mm"),
			});
		}
	};

	const handleSelectEvent = (event: Task) => {
		setFormData({
			title: event.title,
			description: event.description,
			start: format(event.start, "yyyy-MM-dd'T'HH:mm"),
			end: format(event.end, "yyyy-MM-dd'T'HH:mm"),
		});
		setSelectedEventId(event.id); // Запоминаем ID выбранного события
		setShowForm(false); // Прячем форму, если выбрано событие
	};

	const handleDeleteEvent = (eventId: number) => {
		setEvents((prev) => prev.filter((event) => event.id !== eventId));
		setShowForm(false);
		setSelectedEventId(null);
	};

	return (
		<Box className="calendar-container">
			<Typography
				sx={{ textAlign: "center" }}
				className="ucalendar-title"
				variant="h5"
			>
				Календарь
			</Typography>

			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				className="react-big-calendar"
				selectable
				onSelectSlot={handleSelectSlot}
				onSelectEvent={handleSelectEvent}
				messages={{
					today: "Сегодня",
					previous: "Назад",
					next: "Вперед",
					month: "Месяц",
					week: "Неделя",
					day: "День",
				}}
			/>

			{/* Карточка события */}
			{selectedEventId && !showForm && (
				<Paper elevation={5} className="event-card">
					<div className="event-card-info">
						<Typography className="event-card-title" variant="h6">
							{formData.title}
						</Typography>
						<Typography className="event-card-desc" variant="body1">
							{formData.description}
						</Typography>
						<Typography className="event-card-date" variant="body2">
							{`Начало: ${formData.start} | Конец: ${formData.end}`}
						</Typography>
					</div>
					<div>
						<Button color="primary" onClick={() => setShowForm(true)}>
							<EditIcon />
						</Button>
						<Button
							color="secondary"
							onClick={() => handleDeleteEvent(selectedEventId)}
						>
							<DeleteIcon />
						</Button>
					</div>
				</Paper>
			)}

			{/* Форма редактирования/добавления события */}
			{showForm && (
				<Paper elevation={5} className="form-paper">
					<Typography variant="h6" className="form-paper-title">
						Добавить событие
					</Typography>
					<input
						name="title"
						className="ucalendar__events-inp"
						value={formData.title}
						placeholder="Заголовок"
						onChange={handleInputChange}
					/>
					<input
						name="description"
						className="ucalendar__events-inp"
						value={formData.description}
						placeholder="Описание"
						onChange={handleInputChange}
					/>
					<input
						type="datetime-local"
						className="ucalendar__events-inp"
						name="start"
						placeholder="Начало"
						value={formData.start}
						onChange={handleInputChange}
					/>
					<input
						className="ucalendar__events-inp"
						type="datetime-local"
						name="end"
						value={formData.end}
						placeholder="Конец"
						onChange={handleInputChange}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleAddOrUpdateEvent}
					>
						Сохранить
					</Button>
				</Paper>
			)}
		</Box>
	);
};
