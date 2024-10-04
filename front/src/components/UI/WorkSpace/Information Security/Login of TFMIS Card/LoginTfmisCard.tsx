import React from "react";

import "./LoginTfmisCard.css";

import CardMembershipIcon from "@mui/icons-material/CardMembership";
import GppBadIcon from "@mui/icons-material/GppBad";

import sampleImage from "../../../../../../../back/uploads/929493.png";

const LoginTfmisList = ({ title, desc }: any) => {
  return (
    <li className="login-tfmis-list">
      <p className="login-tfmis-list-title">{title}</p>
      <p className="login-tfmis-list-description">
        {desc ? desc : `${desc} не заполнен`}
      </p>
    </li>
  );
};

const LoginTfmisCard = ({ currentUser }: any) => {
  return (
    <div
      className={`info-login-tfmis ${
        currentUser?.status === false ? "passive-login-tfmis" : ""
      }`}
    >
      <div className="wrapper-info-login-tfmis">
        <div className="wrapper-image-login-tfmis">
          <img
            src={
              currentUser?.photo
                ? `http://localhost:3000/uploads/${currentUser?.photo}`
                : sampleImage
            }
            alt=""
          />
        </div>
        <ul className="login-tfmis-info-list">
          <LoginTfmisList title="Имя и фамилия" desc={currentUser?.fullName} />
          <LoginTfmisList title="Логин" desc={currentUser?.username} />
          <LoginTfmisList title="Организация" desc={currentUser?.orgName} />
          <LoginTfmisList title="Должность" desc={currentUser?.role} />
          <LoginTfmisList title="Телефон" desc={currentUser?.phone} />
          <LoginTfmisList title="E-mail" desc={currentUser?.email} />
          <LoginTfmisList
            title="Статус"
            desc={currentUser?.status ? "Актив" : "Пассив"}
          />
        </ul>
      </div>
    </div>
  );
};

export default LoginTfmisCard;
