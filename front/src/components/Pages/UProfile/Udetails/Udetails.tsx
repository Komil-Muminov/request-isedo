import { useState, useEffect } from "react";
import { GetMeType, useAuth } from "../../../API/Hooks/useAuth";
import defUphoto from "../../../../assets/ErrorPage.jpg";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../../queryClient";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
} from "@mui/material";
import { Ulink } from "../../../UI/Ulinks/Ulinks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UlinkScheme, UlinksProps } from "../../../UI/Ulinks/ProfileLinks";

import "./Udetails.css";
import "../Profile.css";
import { Loader } from "../../../UI/Loader/Loader";
import { Outlet, Settings } from "@mui/icons-material";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
const Udetails = () => {
	const { getMe } = useAuth();
	const uQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["users", "me"],
		},
		queryClient,
	);

	const [uinfo, setUinfo] = useState<GetMeType | null>(null);
	const [expanded, setExpanded] = useState<number | false>(false);

	useEffect(() => {
		if (uQuery.status === "success") {
			setUinfo(uQuery.data);
		}
	}, [uQuery.status, uQuery.data]);

	if (uQuery.status === "pending") return <Loader />;
	if (uQuery.status === "error") {
		console.log(uQuery.error);
		return null;
	}

	return (
		<>
			<div className="user-info">
				<div className="uprofile_photo">
					<img src={defUphoto} alt="user" className="uphoto" />
					<ButtonKM>Добавить фото</ButtonKM>
				</div>
				<div className="uinfo_text">
					<span className="sections__desc uinfo_tex">
						ФИО:
						<p>{uinfo?.fullName ? uinfo.fullName : uinfo?.username}</p>
					</span>
					<span className="sections__desc uinfo_tex">
						Телефон:
						<p>{uinfo?.number ? uinfo.number : "Пусто"}</p>
					</span>
					<span className="sections__desc uinfo_tex">
						E-mail:
						<p>{uinfo?.email ? uinfo.email : "Пусто"}</p>
					</span>
					<span className="sections__desc uinfo_tex">
						Место работы:
						<p>{uinfo?.tax}</p>
					</span>
					<span className="sections__desc uinfo_tex">
						Тип пользователя:
						<p>{uinfo?.uType}</p>
					</span>
					<span className="sections__desc uinfo_tex">
						Идентификация:
						<p className="uprofile_info-text">
							{uinfo?.uIdentity === false ? "false" : "true"}
						</p>
					</span>
					<span className="sections__desc uinfo_tex">
						Идентификация на рассмотрение:
						<p className="uprofile_info-text">
							{uinfo?.uIdentity === false ? "false" : "true"}
						</p>
					</span>
				</div>
			</div>
			<div className="uright_info">
				<Ulink className="btn uidentify_link" to="/identification">
					Идентификация
				</Ulink>
			</div>
		</>
	);
};

export default Udetails;
