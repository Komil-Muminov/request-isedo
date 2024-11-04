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

	const [expanded, setExpanded] = useState<number | false>(undefined);
	const [selectedItem, setSelectedItem] = useState<UlinkScheme | null>(null);
	const [uEvents, setUEvents] = useState<UventsDataScheme[]>([]);
	const [showEvents, setShowEvents] = useState<boolean>(false);

	const [progressBar, setProgressBar] = useState<{
		completedEvents: number;
		totalEvents: number;
	}>({
		completedEvents: 0,
		totalEvents: 0,
	});

	useEffect(() => {
		const getLocalProgressBar = JSON.parse(
			localStorage.getItem("progressBar") ?? "{}",
		);
		setProgressBar((prev) => ({
			...prev,
			...getLocalProgressBar,
		}));
	}, []);

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

	const handleAccordion = (id: number) => {
		setExpanded(expanded === id ? false : id);
	};

	const navigate = useNavigate();
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

	return (
		<section className="sections">
			<WebToolBox />
			<div className="profile__container">
				<div className="profile_content">
					<aside className="profile_left">
						<Button onClick={() => setSelectedItem(null)}>Назад</Button>
						{UlinksProps.map(({ url, label, subLinks }, id) => (
							<Accordion
								key={id}
								expanded={expanded === id}
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
										<p>{label}</p>
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
					</aside>
					<div className="wrapper-profile">
						<div className="profile_style profile_center">
							<div className="profile__center_content">
								<Outlet />
							</div>
						</div>
						<aside className="profile_style profile_right">
							<div className="profile_ucalendar">
								<Ucalendar />
							</div>
							<h3 className="profile__events-title">Ваши задачи</h3>
							<div className="profile_events">
								<span className="profile__events-progress-bar">
									{uEvents?.length > 0 ? `Прогресс-бар` : `У вас нет задач`}
								</span>
								<ProgressBar
									completed={progressBar.completedEvents}
									total={progressBar.totalEvents}
								/>
								<Button
									onClick={() => setShowEvents(!showEvents)}
									className="show-events-form-btn"
								>
									{showEvents ? <RemoveCircleIcon /> : <AddCircleIcon />}
								</Button>
								<div className="profile__events">
									{showEvents && <UeventsForm onAddEvent={setUEvents} />}

									<div className="profile__events-list">
										{uEvents.map((item, id) => (
											<div key={id} className="profile__events-item">
												<Uevents key={id} title={item.title} desc={item.desc} />
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
											</div>
										))}
									</div>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;
