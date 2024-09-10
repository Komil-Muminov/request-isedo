import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const Ucalendar = () => {
	const [date, setDate] = useState(new Date());
	return (
		<>
			<div className="ucalendar__content">
				<Calendar onChange={setDate} value={date} />
				<p>Выранная дата: {date.toDateString()}</p>
			</div>
		</>
	);
};
