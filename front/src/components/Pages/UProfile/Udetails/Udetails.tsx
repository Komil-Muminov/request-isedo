import "../Profile.css";
import "./Udetails.css";
export const Udetails = () => {
	return (
		<>
			<div className="udetails__conten km__content">
				<h2>Данные юзера</h2>
				{/* <div className="profile_header">
					<div className="profile ustory_content">Блок "история"</div>
					{uinfo && (
						<span className="sections__title uidentify_text">
							Уважаемый <span className="uidentify_name">{uinfo.username}</span>{" "}
							вы не идентифицированный.
						</span>
					)}
					<div className="profile_avatar">
						<Avatar className="nav_user-log" alt="user">
							<img
								style={{ maxWidth: "40px", minHeight: "40px" }}
								src={uinfo?.photo ? uinfo.photo : defUphoto}
								alt="user"
							/>
						</Avatar>
					</div>
				</div>
				<div className="uInfo_content">
					<div className="uLeft_content">
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
					</div>
					<div className="ucenter_info">
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
					</div>
				</div> */}
			</div>
		</>
	);
};
