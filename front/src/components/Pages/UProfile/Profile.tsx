import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Ulink } from "../../UI/Ulinks/Ulinks";
import { UlinkScheme, UlinksProps } from "../../UI/Ulinks/ProfileLinks";
import { Outlet, useNavigate } from "react-router-dom";
import { Loader } from "../../UI/Loader/Loader";
import { useAuth } from "../../API/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { Settings } from "@mui/icons-material";
import { Ucalendar } from "../UProfile/Ucalendar/Ucalendar";
import { Uevents } from "./Uevents/Uevents";
import WebToolBox from "../../UI/WebTool/WebToolBox";
import { UeventsForm } from "./Uevents/UeventsForm";
import { UventsDataScheme } from "./Uevents/UeventsData";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ProgressBar from "../../UI/Progress-bar/Progress-bar";

import "./Profile.css";
import "./Udetails/Udetails.css";

const Profile: React.FC = () => {
	const { getMe } = useAuth();
	const uQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["users", "me"],
		},
		queryClient,
	);

	const [expanded, setExpanded] = useState<number | false | null>(null);
	const [selectedItem, setSelectedItem] = useState<UlinkScheme | null>(null);
	const [asideIsOpen, setAsideIsOpen] = useState<boolean>(false);
	const [uEvents, setUEvents] = useState<UventsDataScheme[]>([]);
	const [showEvents, setShowEvents] = useState<boolean>(false);

	const [progressBar, setProgressBar] = useState<{
		completedEvents: number;
		totalEvents: number;
	}>({
		completedEvents: 0,
		totalEvents: 0,
	});

	// DarkMode
	// useEffect(() => {
	// 	const getLocalProgressBar = JSON.parse(
	// 		localStorage.getItem("progressBar") ?? "{}",
	// 	);
	// 	setProgressBar((prev) => ({
	// 		...prev,
	// 		...getLocalProgressBar,
	// 	}));
	// }, []);

	useEffect(() => {
		const completedEvents = uEvents.filter((item) => item.isDone).length;
		const totalEvents = uEvents.length;
		const newProgress = {
			completedEvents,
			totalEvents,
		};
		setProgressBar(newProgress);
		localStorage.setItem("progressBar", JSON.stringify(newProgress));
	}, [uEvents]);

	useEffect(() => {
		const localStorageEvents = JSON.parse(
			localStorage.getItem("events") ?? "[]",
		);
		setUEvents(localStorageEvents);
	}, []);

	const handleDeleteEvent = (itemId: number) => {
		setUEvents((prev) => {
			const updatedUevents = prev.filter((_, id) => id !== itemId);
			localStorage.setItem("events", JSON.stringify(updatedUevents));
			return updatedUevents;
		});
	};
	const navigate = useNavigate();

	const handleAccordion = (id: number) => {
		setExpanded((prevExpanded) => (prevExpanded === id ? null : id));
	};

	const handleSelectItem = (item: UlinkScheme) => {
		setSelectedItem(item);
		navigate(`/uprofile/details/${item.url?.split("/").pop()}`);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(".profile_left")) {
				setExpanded(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	if (uQuery.status === "pending") return <Loader />;
	if (uQuery.status === "error") {
		console.log(uQuery.error);
		return null;
	}

	// Сделать showAside
	// useEffect(() => {
	// 	if (asideIsOpen) {
	// 		document
	// 			.querySelector(".profile_center")
	// 			?.classList.add("profile__center-full");
	// 	} else {
	// 		document
	// 			.querySelector(".profile_center")
	// 			?.classList.remove("profile__center-full");
	// 	}
	// }, [asideIsOpen]);

	return (
		<section className="sections profile">
			<div className="profile__container">
				<div className="profile_content">
					<div className={`${"profile_left"}`}>
						<Button
							className="profile__prev-btn"
							onClick={() => setSelectedItem(null)}
						>
							Назад
						</Button>
						{UlinksProps.map(({ url, label, subLinks }, id) => (
							<Accordion
								key={id}
								expanded={expanded === id} // Сравниваем id аккордеона с состоянием expanded
								onChange={() => handleAccordion(id)}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls={`panel${id}-content`}
									id={`panel${id}-header`}
									onClick={() => handleSelectItem({ url, label, subLinks })}
								>
									<div className="uaccordion_label">
										<Settings />
										<p className="uaccordion_label-text">{label}</p>
									</div>
								</AccordionSummary>
								<AccordionDetails className="ulins_sublinks">
									<Ulink to={url}>{label}</Ulink>
									{subLinks &&
										subLinks.map((subLink, id) => (
											<Ulink key={id} to={subLink.url}>
												{subLink.label}
											</Ulink>
										))}
								</AccordionDetails>
							</Accordion>
						))}
					</div>
					<div className="wrapper-profile">
						{/* Сделать showAside */}
						<div
							className={`profile_style profile_center ${
								!asideIsOpen ? "profile__center-full" : ""
							}`}
						>
							<div className="profile__center_content">
								<Outlet />
							</div>
							<button
								onClick={() => setAsideIsOpen(!asideIsOpen)}
								className="profile__show-aside-btn"
							>
								{asideIsOpen ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										className="open-svg"
										viewBox="0 0 24 24"
									>
										<path d="M16 19V5L5 12z" fill="currentColor" />
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										className="close-svg"
										viewBox="0 0 24 24"
									>
										<path d="M8 5v14l11-7z" fill="currentColor" />
									</svg>
								)}
							</button>
						</div>
						{/* Сделать showAside */}
						{asideIsOpen ? (
							<aside className="profile_style profile_right">
								<div className="profile_ucalendar">
									<Ucalendar />
								</div>
								<h3 className="profile__events-title">Предстоящие задачи</h3>
								<div className="profile_events">
									<div className="profile__events-progress-bar">
										{uEvents?.length > 0 ? (
											<>
												<p className="progressbar__text">
													Индикатор выполненых задач
												</p>
												<ProgressBar
													completed={progressBar.completedEvents}
													total={progressBar.totalEvents}
												/>
											</>
										) : (
											"Добавьте задачу блять!"
										)}
									</div>

									<Button
										onClick={() => setShowEvents(!showEvents)}
										className="show-events-form-btn"
									>
										{showEvents ? <RemoveCircleIcon /> : <AddCircleIcon />}
									</Button>
									<div className="profile__events">
										{showEvents && <UeventsForm onAddEvent={setUEvents} />}

										<ul className="profile__events-list">
											{uEvents.map((item, id) => (
												<li key={id} className="profile__events-item">
													<Uevents
														key={id}
														title={item.title}
														desc={item.desc}
													/>
													<div className="profile__events-item-btn">
														<Button
															className="profile__events-delete"
															onClick={() => handleDeleteEvent(id)}
														>
															<DeleteIcon />
														</Button>
														<Button
															onClick={() =>
																setUEvents((prev) =>
																	prev.map((item, itemId) =>
																		itemId === id
																			? { ...item, isDone: !item.isDone }
																			: item,
																	),
																)
															}
															className={`uevents-done-btn ${
																item.isDone
																	? "uevents-done-btn--isdone"
																	: "uevents-done-btn--notdone"
															}`}
														>
															<CheckCircleOutlineIcon />
														</Button>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							</aside>
						) : null}
					</div>
					<WebToolBox />
				</div>
			</div>
		</section>
	);
};

export default Profile;
