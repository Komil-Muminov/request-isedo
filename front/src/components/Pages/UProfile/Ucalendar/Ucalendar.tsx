import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Ucalendar.css";
import { Button } from "@mui/material";

interface Event {
	id: number;
	date: string;
	title: string;
	description: string;
	startTime: string;
	endTime: string;
}

export const Ucalendar = () => {
	const [date, setDate] = useState<Date | null>(null);
	const [events, setEvents] = useState<Event[]>([]);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		startTime: "",
		endTime: "",
	});
	const [showForm, setShowForm] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAddEvent = () => {
		if (date && formData.title && formData.startTime && formData.endTime) {
			const newEvent = {
				id: events.length + 1,
				date: date.toDateString(),
				...formData,
			};
			setEvents((prev) => [...prev, newEvent]);
			setFormData({ title: "", description: "", startTime: "", endTime: "" });
			setShowForm(false);
		}
	};

	const hasEvent = (date: Date) => {
		return events.some((event) => event.date === date.toDateString());
	};

	const handleDayClick = (value: Date) => {
		setDate(value);
	};

	useEffect(() => {
		const localStorageEvents = localStorage.getItem("ucalendarEvents");
		if (localStorageEvents) {
			setEvents(JSON.parse(localStorageEvents));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("ucalendarEvents", JSON.stringify(events));
	}, [events]);

	const filteredEvents = events.filter(
		(event) => event.date === date?.toDateString(),
	);

	const showAddEventForm = date && !hasEvent(date) && !showForm;

	const eventCardClassName =
		filteredEvents.length === 0 && !showForm
			? "calendar__event_card calendar__event_card-empty"
			: "calendar__event_card";

	return (
		<div className="ucalendar__content">
			<Calendar
				onChange={handleDayClick}
				value={date}
				tileClassName={({ date, view }) => {
					if (view === "month" && hasEvent(date)) {
						return "highlighted-date";
					}
					return null;
				}}
			/>
			<p>Выбранная дата: {date?.toDateString()}</p>

			{date && (
				<>
					<div className={eventCardClassName}>
						<h3 className="calendar__event_title">Информация о событиях:</h3>
						{filteredEvents.length > 0 || showForm ? (
							<>
								{filteredEvents.map((event) => (
									<div key={event.id}>
										<p>
											<strong>Заголовок:</strong> {event.title}
										</p>
										<p>
											<strong>Описание:</strong> {event.description}
										</p>
										<p>
											<strong>Время:</strong> {event.startTime} -{" "}
											{event.endTime}
										</p>
									</div>
								))}
								{showForm && (
									<div className="live-event-preview">
										<p>
											<strong>Заголовок:</strong>{" "}
											{formData.title || "Не указано"}
										</p>
										<p>
											<strong>Описание:</strong>{" "}
											{formData.description || "Не указано"}
										</p>
										<p>
											<strong>Время:</strong>{" "}
											{formData.startTime || "Не указано"} -{" "}
											{formData.endTime || "Не указано"}
										</p>
									</div>
								)}
							</>
						) : (
							<p>Событий на эту дату нет.</p>
						)}
					</div>

					{showAddEventForm && (
						<Button
							variant="outlined"
							className="show-form-button"
							onClick={() => setShowForm(true)}
						>
							Добавить событие
						</Button>
					)}

					{showForm && (
						<div className="calendar__event_form">
							<h3>Добавить событие:</h3>
							<div className="calendar__event_content">
								<input
									className="event__inp"
									type="text"
									name="title"
									placeholder="Заголовок"
									value={formData.title}
									onChange={handleInputChange}
								/>
								<input
									className="event__inp"
									name="description"
									placeholder="Описание"
									value={formData.description}
									onChange={handleInputChange}
								/>
								<input
									className="event__inp"
									type="time"
									name="startTime"
									value={formData.startTime}
									onChange={handleInputChange}
								/>
								<input
									className="event__inp"
									type="time"
									name="endTime"
									value={formData.endTime}
									onChange={handleInputChange}
								/>
							</div>
							<Button
								type="submit"
								className="btn__add_event"
								onClick={handleAddEvent}
							>
								Добавить
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
};
