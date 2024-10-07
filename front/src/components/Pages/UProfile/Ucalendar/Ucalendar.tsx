/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./Ucalendar.css";

interface Task {
	id: number;
	title: string;
	description: string;
	startTime: string;
	endTime: string;
}

interface Event {
	id: number;
	date: string;
	tasks: Task[];
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
	const [currentEventId, setCurrentEventId] = useState<number | null>(null);

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
		if (date) {
			const newEvent = {
				id: events.length + 1,
				date: date.toDateString(),
				tasks: [],
			};
			setEvents((prev) => [...prev, newEvent]);
			setCurrentEventId(newEvent.id);
			setShowForm(true);
		} else {
			setShowForm(false);
		}
	};

	const handleAddTask = () => {
		if (
			currentEventId &&
			formData.title &&
			formData.startTime &&
			formData.endTime
		) {
			const newTask = {
				id: Date.now(),
				...formData,
			};

			setEvents((prev) => {
				const existingEventIndex = prev.findIndex(
					(event) => event.id === currentEventId,
				);

				if (existingEventIndex > -1) {
					// Добавляем задачу к существующему событию
					const updatedEvent = {
						...prev[existingEventIndex],
						tasks: [...prev[existingEventIndex].tasks, newTask],
					};

					const updatedEvents = [...prev];
					updatedEvents[existingEventIndex] = updatedEvent;

					return updatedEvents;
				}
				return prev;
			});

			// Очистить форму после добавления задачи
			setFormData({ title: "", description: "", startTime: "", endTime: "" });
			setShowForm(false); // Скрываем форму после добавления задачи
		}
	};

	const handleDeleteTask = (eventId: number, taskId: number) => {
		setEvents((prev) =>
			prev.map((event) =>
				event.id === eventId
					? {
							...event,
							tasks: event.tasks.filter((task) => task.id !== taskId),
					  }
					: event,
			),
		);
	};

	const handleDeleteEvent = (eventId: number) => {
		setEvents((prev) => prev.filter((event) => event.id !== eventId));
		localStorage.removeItem('')
	};

	const handleDeleteAllEvents = () => {
		setEvents([]);
		localStorage.removeItem("ucalendarEvents");
	};

	const hasEvent = (date: Date) => {
		return events.some((event) => event.date === date.toDateString());
	};

	const handleDayClick = (value: Date) => {
		setDate(value);
		const existingEvent = events.find(
			(event) => event.date === value.toDateString(),
		);
		setCurrentEventId(existingEvent ? existingEvent.id : null);
	};

	const filteredEvents = events.filter(
		(event) => event.date === date?.toDateString(),
	);

	const eventCardClassName =
		filteredEvents.length === 0 && !showForm
			? "calendar__event_card calendar__event_card-empty"
			: "calendar__event_card";

	// Загружаем события и данные формы из localStorage
	useEffect(() => {
		const localStorageEvents = localStorage.getItem("ucalendarEvents");
		if (localStorageEvents) {
			try {
				const parsedEvents = JSON.parse(localStorageEvents);
				setEvents(parsedEvents);
			} catch (error) {
				console.error("Ошибка парсинга данных из localStorage:", error);
			}
		}

		const savedFormData = localStorage.getItem("formData");
		console.log("Saved Form Data:", savedFormData); // Проверка
		if (savedFormData) {
			setFormData(JSON.parse(savedFormData));
		}
	}, []);

	// Сохраняем события в localStorage
	useEffect(() => {
		if (events.length > 0) {
			localStorage.setItem("ucalendarEvents", JSON.stringify(events));
			console.log(localStorage.getItem("ucalendarEvents")); // Проверка сохранённых данных
		}
	}, [events]);

	// Сохраняем данные формы в localStorage
	useEffect(() => {
		localStorage.setItem("formData", JSON.stringify(formData));
		console.log(localStorage.getItem("formData")); // Проверка сохранённых данных формы
	}, [formData]);

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
			<div className="calendar__events">
				{/* <p>Выбранная дата: {date?.toDateString()}</p> */}
				<Button
					variant="outlined"
					disabled={events.length === 0}
					className="ucalendar__btn delete-all-events-button "
					onClick={handleDeleteAllEvents}
				>
					Удалить все события
				</Button>
			</div>

			{date && (
				<>
					<div className={`${eventCardClassName} show__events-content`}>
						<h3 className="calendar__event_title">Информация о событиях:</h3>
						{filteredEvents.length > 0 ? (
							<>
								{filteredEvents.map((event) => (
									<div key={event.id} className="calendar__show">
										{/* <p><strong>Дата:</strong> {event.date}</p> */}
										{event.tasks.map((task) => (
											<div key={task.id}>
												<p>
													<strong>Заголовок:</strong> {task.title}
												</p>
												<p>
													<strong>Описание:</strong> {task.description}
												</p>
												<p>
													<strong>Время:</strong> {task.startTime} -{" "}
													{task.endTime}
												</p>

												<Button
													className="calendar__show--delete"
													onClick={() => handleDeleteEvent(event.id, task.id)}
												>
													<DeleteForeverIcon />
												</Button>
											</div>
										))}
										<Button
											variant="outlined"
											onClick={() => handleDeleteEvent(event.id)}
										>
											Удалить задачу
										</Button>
									</div>
								))}
							</>
						) : (
							<p>Событий на эту дату нет.</p>
						)}

						{/* Отображение текущих значений формы в карточке */}
						{showForm && (
							<div>
								<p>
									<strong>Заголовок:</strong> {formData.title || "Не указан"}
								</p>
								<p>
									<strong>Описание:</strong>{" "}
									{formData.description || "Не указано"}
								</p>
								<p>
									<strong>Время:</strong> {formData.startTime || "Не указано"} -{" "}
									{formData.endTime || "Не указано"}
								</p>
							</div>
						)}
					</div>

					{/* Кнопка "Добавить событие" скрыта, если форма открыта */}
					{!showForm && (
						<Button
							variant="outlined"
							className="show-form-button ucalendar__btn"
							onClick={handleAddEvent}
						>
							Добавить событие
						</Button>
					)}

					{showForm && (
						<div className="calendar__event_form">
							<h3>Добавить задачу:</h3>
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
								<Button
									variant="outlined"
									className="ucalendar__btn"
									onClick={handleAddTask}
								>
									Добавить задачу
								</Button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};
