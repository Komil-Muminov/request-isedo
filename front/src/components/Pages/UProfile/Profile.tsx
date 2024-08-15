import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { useAuth } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader/Loader";
import { useState } from "react";
import { Ulink } from "../../UI/Ulinks/Ulinks";
import { Outlet, useNavigate } from "react-router-dom";

// MUI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Settings } from "@mui/icons-material";
// /MUI
import "./Profile.css";
import { UlinkScheme, UlinksProps } from "../../UI/Ulinks/ProfileLinks";

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

	const handleAccordion = (id: number) => {
		setExpanded(expanded === id ? false : id);
	};

	if (uQuery.status === "pending") return <Loader />;
	if (uQuery.status === "error") {
		return null;
	}

	const handleShowSubLinks = (subLinks: UlinkScheme[]) => {
		return subLinks.map(({ url, label }, id) => (
			<Ulink key={id} to={url}>
				{label}
			</Ulink>
		));
	};

	const navigate = useNavigate();

	return (
		<section className="sections">
			<div className="container">
				<div className="profile_content">
					<div className="profile_header">
						<Button onClick={() => navigate(-1)}>Назад</Button>
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
									>
										<div className="uaccordion_label">
											<Settings />
											<p>{label}</p>
										</div>
									</AccordionSummary>
									<AccordionDetails className="ulins_sublinks">
										<Ulink to={url}>{label}</Ulink>
										{subLinks && handleShowSubLinks(subLinks)}
									</AccordionDetails>
								</Accordion>
							))}
						</aside>
						<aside className="profile_right">
							<Outlet />
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;
