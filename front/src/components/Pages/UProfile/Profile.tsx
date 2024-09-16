// Profile.tsx
import { useState } from "react";
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
import { UbottomNavLinks } from "../../API/Data/UbottomNav/UbottomNavLink";
import { Link } from "react-router-dom";
import { Ucalendar } from "../UProfile/Ucalendar/Ucalendar";
import { Uevents } from "./Uevents/Uevents";
// import { Uwidget } from "./Uwidget/Uwidget";
import WebToolBox from "../../UI/WebTool/WebToolBox";
import "./Profile.css";

const Profile: React.FC = () => {
	const { getMe } = useAuth();
	const uQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["users", "me"],
		},
		queryClient,
	);

	const [expanded, setExpanded] = useState<number | false>(false);
	const [selectedItem, setSelectedItem] = useState<UlinkScheme | null>(null);
	const navigate = useNavigate();

	const handleAccordion = (id: number) => {
		setExpanded(expanded === id ? false : id);
	};

	const handleSelectItem = (item: UlinkScheme) => {
		setSelectedItem(item);
		navigate(`/uprofile/details/${item.url.split("/").pop()}`);
	};

	if (uQuery.status === "pending") return <Loader />;
	if (uQuery.status === "error") {
		console.log(uQuery.error);
		return null;
	}

	// Надо сделать красивый дизайн

	return (
		<section className="sections">
			<WebToolBox />
			<div className="profile__container">
				<div className="profile_content">
					<div className="profile_header">
						<Button onClick={() => setSelectedItem(null)}>Назад</Button>
					</div>
					<div className="wrapper-profile">
						<aside className="profile_left">
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
						<div className="profile_style profile_center">
							<div className="profile_center-content">
								<Outlet />
							</div>
							{/* Доработать логику */}
							{/* <div className="profile__center_widgets">
								<Uwidget kind={`profile__center_widget1`} />
								<Uwidget kind={`profile__center_widget2`} />
								<Uwidget kind={`profile__center_widget3`} />
							</div> */}
						</div>
						<aside className="profile_style profile_right">
							<div className="profile_ucalendar">
								<Ucalendar />
							</div>
							<div className="profile_events">
								<Uevents children="Задачи" desc={`Описание`} />
								<Uevents children="Задачи" desc={`Описание`} />
								<Uevents children="Задачи" desc={`Описание`} />
							</div>
						</aside>
					</div>
					<div className={`profilebottomnav__content km__content `}>
						<div className="profilebottom__items">
							{UbottomNavLinks.map(({ label, url }, id) => (
								<>
									<Link className="profilebottomnav__link" key={id} to={url}>
										{label}
									</Link>
								</>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;
