import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { useAuth, GetMeType } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader/Loader";
import { useEffect, useState } from "react";
import defUphoto from "../../../assets/ErrorPage.jpg";
import { ButtonKM } from "../../UI/Button/ButtonKM";
import { Ulink } from "../../UI/Ulinks/Ulinks";
import { Ulinks } from "../../UI/Ulinks/ProfileLinks";

// MUI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// /MUI
import "./Profile.css";
import Identification from "../Identification/Identification";
import { Link, Route, Routes } from "react-router-dom";

const Profile: React.FC = () => {
	const [defaultName] = useState<string | undefined>("Кимки");
	const { getMe } = useAuth();
	const uQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["users", "me"],
		},
		queryClient,
	);

	switch (uQuery.status) {
		case "pending":
			return <Loader />;
		case "error":
			console.log(uQuery.error);
	}

	// uQuery data status==='success'
	const [uinfo, setUinfo] = useState<GetMeType[] | undefined>([]);
	if (uQuery.status === "success") {
		try {
			queryClient.invalidateQueries({ queryKey: ["users", "me"] });
			console.log("invalidateQueries выполнена успешно");
		} catch (error) {
			console.error("Ошибка при выполнении invalidateQueries:", error);
		}
	}

	useEffect(() => {
		if (uQuery.status === "success") {
			try {
				queryClient.invalidateQueries({ queryKey: ["users", "me"] });
			} catch (error) {
				console.log(`Ошибка: ${error}`);
			}
		}
		setUinfo([uQuery.data]);
	}, [uQuery.status]);

	/**
	 * Accordion
	 */

	const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

	const handleAccordion = (id: number) => {
		setExpanded((prevExpanded) => ({
			...prevExpanded,
			[id]: !prevExpanded[id],
		}));
	};

	if (uinfo) {
		return (
			<>
				<section className="sections">
					<div className="container">
						<div className="profile_content km__content">
							<div className="profile_header">
								<div className="profile ustory_content">Блок "история"</div>
								{uinfo?.map((item) => (
									<span className="sections__title uidentify_text">
										Уважаемый{" "}
										<span className="uidentify_name">{item.username}</span> вы
										не идентифицированный
									</span>
								))}
								<div className="profile_avatar">
									{/* Надо сделать условный рендер */}
									<Avatar className="nav_user-log" alt="user">
										<img
											style={{ maxWidth: "40px", minHeight: "40px" }}
											src={uQuery.data?.photo ? uQuery.data?.photo : defUphoto}
											alt=""
										/>
									</Avatar>
								</div>
							</div>
							<div className="uInfo_content">
								<div className="uLeft_content">
									{Ulinks.map((item, id) => (
										/**
										 * Это говно надо как то поправить,
										 *  чтоб не портит TSX разметку
										 *  */
										<Accordion
											key={id}
											expanded={!!expanded[id]}
											onChange={() => handleAccordion(id)}
										>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls={`panel${id}-content`}
												id={`panel${id}-header`}
											>
												<Typography>{item.label}</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Ulink to={item.url}>{item.label}</Ulink>
											</AccordionDetails>
										</Accordion>
										/**
										 * Гавно закончился
										 */
									))}
								</div>
								<div className="ucenter_info">
									<div className="uprofile_photo">
										<img src={defUphoto} alt="user" className="uphoto" />
										<ButtonKM>Добавить фото</ButtonKM>
									</div>
									<div className="uinfo_text">
										<span className="sections__desc uinfo_tex ">
											ФИО:
											<p>{uQuery.data?.username}</p>
										</span>
										<span className="sections__desc uinfo_tex">
											Телефон:
											<p>{uQuery.data?.number}</p>
										</span>
										<span className="sections__desc uinfo_tex ">
											E-mail :<p>{uQuery.data?.email}</p>
										</span>
										<span className="sections__desc uinfo_tex ">
											Место работы :<p>{uQuery.data?.tax}</p>
										</span>

										<span className="sections__desc uinfo_tex ">
											Тип пользователя:<p>{uQuery.data?.uType}</p>
										</span>
									</div>
								</div>
								<div className="uright_info">
									<Ulink className="btn uidentify_link" to="/identification">
										Идентификация
									</Ulink>
								</div>

								{/* Доп блок для чего-то интересного */}
								{/* <div className="uorg_content">
									<div className="uorg_info">
										<p className="uorg_text">ФИО: {uQuery.data.fullName}</p>
										<p className="уorg_text">ФИО: {uQuery.data.fullName}</p>
										<p className="уorg_text">ФИО: {uQuery.data.fullName}</p>
										<p className="уorg_text">ФИО: {uQuery.data.fullName}</p>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</section>
			</>
		);
	}
};

export default Profile;
