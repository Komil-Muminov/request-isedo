import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import "./Logviewer.css";

export const LogEntryScheme = z.object({
	event: z.string(),
	username: z.string(),
	timestamp: z.string(),
});

export type LogEntryType = z.infer<typeof LogEntryScheme>;

// Функция для получения логов
const getLogviewer = async (): Promise<LogEntryType[]> => {
	const response = await fetch(`http://localhost:3000/ulogviewer`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Ошибка при получении логов");
	}

	return response.json();
};

const LogViewer: React.FC = () => {
	const logViewerQuery = useQuery({
		queryFn: getLogviewer,
		queryKey: ["ulogviewer"],
	});
	const [filter, setFilter] = useState("");

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	// Фильтрация логов по событию, имени пользователя или времени
	const filteredLogs =
		logViewerQuery.data?.filter(
			(log) =>
				log?.event?.toLowerCase().includes(filter.toLowerCase()) ||
				log?.username?.toLowerCase().includes(filter.toLowerCase()) ||
				log?.timestamp?.includes(filter),
		) || [];

	useEffect(() => {
		if (logViewerQuery.status === "success") {
			console.log(filteredLogs.length); // Это количество отфильтрованных логов
		}
	}, [logViewerQuery, filteredLogs.length]); // Добавляем filteredLogs.length как зависимость

	return (
		<div className="log-viewer">
			<h1>Логи пользователей</h1>

			<input
				type="text"
				placeholder="Фильтр по событию, имени пользователя или времени"
				value={filter}
				onChange={handleFilterChange}
			/>
			<table>
				<thead>
					<tr>
						<th>Событие</th>
						<th>Имя пользователя</th>
						<th>Время</th>
					</tr>
				</thead>
				<tbody>
					{filteredLogs.map((log, index) => (
						<tr
							key={index}
							className={
								log.event === "login"
									? "login"
									: log.event === "logout"
									? "logout"
									: ""
							}
						>
							<td>{log.event}</td>
							<td>{log.username}</td>
							<td>{log.timestamp}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default LogViewer;
