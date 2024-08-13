import { Avatar, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { useAuth, GetMeType } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader/Loader";
import { useEffect, useState } from "react";
import defUphoto from "../../../assets/ErrorPage.jpg";
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
    queryClient
  );

  const [uinfo, setUinfo] = useState<GetMeType | null>(null);
  const [expanded, setExpanded] = useState<number | false>(false);

  useEffect(() => {
    if (uQuery.status === "success") {
      setUinfo(uQuery.data);
    }
  }, [uQuery.status, uQuery.data]);

  const handleAccordion = (id: number) => {
    setExpanded(expanded === id ? false : id);
  };

  if (uQuery.status === "pending") return <Loader />;
  if (uQuery.status === "error") {
    console.log(uQuery.error);
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

            {/* <div className="profile_avatar">
              <Avatar className="nav_user-log" alt="user">
                <img
                  style={{ maxWidth: "40px", minHeight: "40px" }}
                  src={uinfo?.photo ? uinfo.photo : defUphoto}
                  alt="user"
                />
              </Avatar>
            </div> */}
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
                    <Ulink to={url}>
                      {" "}
                      <button className="btn-challenge">
                        <span>Главная страница</span>
                        <div className="hover-area">
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="hover-col"></div>
                          <div className="icon-home">
                            <div className="roof roof-1"></div>
                            <div className="roof roof-2"></div>
                            <div className="roof-design roof-design-1"></div>
                            <div className="roof-design roof-design-2"></div>
                            <div className="roof-side roof-side-1"></div>
                            <div className="roof-side roof-side-2"></div>
                            <div className="roof-wall roof-wall-1"></div>
                            <div className="roof-wall roof-wall-2"></div>
                            <div className="wall wall-1"></div>
                            <div className="wall wall-2"></div>
                            <div className="wall wall-3"></div>
                            <div className="wall wall-4"></div>
                            <div className="door"></div>
                            <div className="floor"></div>
                          </div>
                        </div>
                      </button>
                    </Ulink>
                    {subLinks && handleShowSubLinks(subLinks)}
                  </AccordionDetails>
                </Accordion>
              ))}
            </aside>
            <aside className="profile_right">
              <Outlet />
            </aside>
          </div>

          {/* <div className="profile_content km__content">
					<div className="profile_header">
						<div className="profile ustory_content">Блок "история"</div>
						{uinfo && (
							<span className="sections__title uidentify_text">
								Уважаемый{" "}
								<span className="uidentify_name">{uinfo.username}</span> вы не
								идентифицированный.
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
									<Outlet />
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
					</div>
				</div> */}
        </div>
      </div>
    </section>
  );
};

export default Profile;
