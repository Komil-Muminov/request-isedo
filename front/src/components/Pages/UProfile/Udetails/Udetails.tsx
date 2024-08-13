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
  Button,
} from "@mui/material";
import { Ulink } from "../../../UI/Ulinks/Ulinks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UlinkScheme, UlinksProps } from "../../../UI/Ulinks/ProfileLinks";

import "./Udetails.css";
import "../Profile.css";
import { Loader } from "../../../UI/Loader/Loader";
import { Outlet, Settings } from "@mui/icons-material";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import UserInfoList from "../../../UI/UserInfoList/UserInfoList";
import { Link } from "react-router-dom";

const Udetails = () => {
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

  if (uQuery.status === "pending") return <Loader />;
  if (uQuery.status === "error") {
    console.log(uQuery.error);
    return null;
  }

  console.log(uinfo);

  return (
    <>
      <div className="user-content">
        <div className="user-details">
          <p className="user-details_title">
            {uinfo?.uIdentity
              ? `Подтвержденная учетная запись`
              : `Не подтвержденная учетная запись`}
          </p>
          <div className="user-details-content">
            <div className="user-details_photo">
              <img src={defUphoto} alt="" className="photo" />
              <div className="file-service-photo">
                <input type="file" />
              </div>
            </div>
            <div className="user-details-text">
              <ul className="user-details_list">
                <UserInfoList
                  title="ФИО"
                  description={
                    uinfo?.fullName ? uinfo.fullName : uinfo?.username
                  }
                />
                <UserInfoList
                  title="Тип пользователя"
                  description={uinfo?.uType ? uinfo.uType : "Тип не указан"}
                />
                <UserInfoList
                  title="Идентификация"
                  description={
                    uinfo?.uType === "kvd"
                      ? "Идентифицирован"
                      : "Идентификация на рассмотрение"
                  }
                />
                <UserInfoList
                  title={uinfo?.department ? "Отдел" : "Номер телефона"}
                  description={
                    uinfo?.department ? uinfo.department : uinfo?.number
                  }
                />
                <UserInfoList
                  title={uinfo?.position ? "Должность" : "ИНН"}
                  description={uinfo?.position ? uinfo.position : uinfo?.tax}
                />
                {uinfo?.email && (
                  <UserInfoList
                    title="E-mail"
                    description={
                      uinfo?.email ? uinfo.email : "E-mail адрес не указан."
                    }
                  />
                )}
              </ul>
              <Link to="/uprofile/uIdentity">
                <Button variant="contained" fullWidth>
                  Идентификация
                </Button>
              </Link>
            </div>
          </div>
          {/* <div className="uprofile_content"> */}
          {/* <div className="uprofile-title">
              {uinfo && (
                <span className="sections__title uidentify_text">
                  Уважаемый{" "}
                  <span className="uidentify_name">{uinfo.username}</span> вы не
                  идентифицированный.
                </span>
              )}
              <div className="uprofile_photo">
                <img src={defUphoto} alt="user" className="uphoto" />
                <ButtonKM>Добавить фото</ButtonKM>
              </div>
            </div> */}
          {/* <div className="uinfo_text">
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
            </div> */}
          {/* </div> */}
        </div>
      </div>
      {/* <div className="uright_info">
        <Ulink className="btn uidentify_link" to="/uprofile/uIdentity">
          Идентификация
        </Ulink>
      </div> */}
    </>
  );
};

export default Udetails;
