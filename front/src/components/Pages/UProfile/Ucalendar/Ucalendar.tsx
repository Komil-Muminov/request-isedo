import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Ucalendar.css";

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
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

	const handleAddEvent = () => {
		if (date && title && startTime && endTime) {
			const newEvent = {
				id: events.length + 1,
				date: date.toDateString(),
				title,
				description,
				startTime,
				endTime,
			};
			setEvents((prev) => [...prev, newEvent]);
			setTitle("");
			setDescription("");
			setStartTime("");
			setEndTime("");
		}
	};

	// Функция для определения, есть ли событие на определенную дату
	const hasEvent = (date: Date) => {
		return events.some((event) => event.date === date.toDateString());
	};

	// Функция для выбора события при клике на дату с событием
	const handleDayClick = (value: Date) => {
		const eventForDate = events.find(
			(event) => event.date === value.toDateString(),
		);
		if (eventForDate) {
			setSelectedEvent(eventForDate);
		} else {
			setSelectedEvent(null);
		}
		setDate(value);
	};

	return (
		<>
			<div className="ucalendar__content">
				<Calendar
					onChange={handleDayClick}
					value={date}
					// Кастомизация отображения даты с напоминанием
					tileClassName={({ date, view }) => {
						if (view === "month" && hasEvent(date)) {
							return "highlighted-date"; // класс для выделения даты
						}
						return null;
					}}
				/>
				<p>Выбранная дата: {date?.toDateString()}</p>

				{date && !selectedEvent && (
					<>
						<h3>Добавить событие:</h3>
						<div className="calendar__event">
							<input
								className="calendar__inp"
								type="text"
								placeholder="Заголовок"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<textarea
								className="calendar__inp calendar__textarea"
								placeholder="Описание"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<input
								className="calendar__inp"
								type="time"
								value={startTime}
								onChange={(e) => setStartTime(e.target.value)}
							/>
							<input
								className="calendar__inp"
								type="time"
								value={endTime}
								onChange={(e) => setEndTime(e.target.value)}
							/>
							<button className="add__event" onClick={handleAddEvent}>
								Добавить
							</button>
						</div>
					</>
				)}

				{selectedEvent && (
					<div className="calendar__event">
						<h3>Информация о событии:</h3>
						<p>
							<strong>Заголовок:</strong> {selectedEvent.title}
						</p>
						<p>
							<strong>Описание:</strong> {selectedEvent.description}
						</p>
						<p>
							<strong>Время:</strong> {selectedEvent.startTime} -{" "}
							{selectedEvent.endTime}
						</p>
					</div>
				)}
			</div>
		</>
	);
};
