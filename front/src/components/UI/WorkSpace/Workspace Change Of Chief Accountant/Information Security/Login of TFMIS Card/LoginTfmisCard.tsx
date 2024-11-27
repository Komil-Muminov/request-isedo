import React from "react";

import "./LoginTfmisCard.css";

import CardMembershipIcon from "@mui/icons-material/CardMembership";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ShieldIcon from "@mui/icons-material/Shield";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import sampleImage from "../../../../../../../../back/uploads/929493.png";
import { motion } from "framer-motion";

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

const LoginTfmisCard = ({ currentUser, rqstsDataById }: any) => {
  const successIssuanceCertificate =
    (rqstsDataById?.reqType === "Выдача сертификата" &&
      rqstsDataById?.stepTask > 1) ||
    (rqstsDataById?.reqType === "Выдача токена и сертификата" &&
      rqstsDataById?.stepTask > 1) ||
    (rqstsDataById?.reqType === "Смена пароля" && rqstsDataById?.stepCode >= 3)
      ? true
      : false;

  return (
    <div
      className={`info-login-tfmis ${
        currentUser?.status === false ||
        (!successIssuanceCertificate &&
          rqstsDataById?.reqType === "Выдача сертификата") ||
        (!successIssuanceCertificate &&
          rqstsDataById?.reqType === "Выдача токена и сертификата") ||
        (!successIssuanceCertificate &&
          rqstsDataById?.reqType === "Смена пароля")
          ? "passive-login-tfmis"
          : currentUser
          ? "active-login-tfmis"
          : ""
      }`}
    >
      <div className="wrapper-info-login-tfmis">
        <div className="wrapper-image-login-tfmis">
          {currentUser?.status === false ? (
            <div className="passive-login-tfmis-icon">
              <motion.div
                initial={{ x: 0 }} // Начальная позиция
                animate={{ x: -10 }} // Позиция после анимации
                transition={{ type: "spring", stiffness: 100, duration: 0.3 }} // Настройки анимации
              >
                <img
                  className="passive-login-tfmis-image"
                  src={
                    currentUser?.photo
                      ? `http://localhost:3000/uploads/${currentUser?.photo}`
                      : sampleImage
                  }
                  alt=""
                />
              </motion.div>

              {/* Анимация для линии */}
              <motion.div
                initial={{ opacity: 0 }} // Начальная непрозрачность
                animate={{ opacity: 1 }} // Непрозрачность после анимации
                transition={{ duration: 0.3, delay: 0.5 }} // Задержка перед анимацией
                className="line"
              ></motion.div>
              {/* Анимация для HighlightOffIcon */}
              <motion.div
                initial={{ scale: 0 }} // Начальный масштаб
                animate={{ scale: 1 }} // Масштаб после анимации
                transition={{ duration: 0.3, delay: 1 }} // Задержка перед анимацией
              >
                <svg height={0} width={0}>
                  <linearGradient id="linearColors" x1={0} y1={0} x2={1} y2={0}>
                    <stop offset={0} stopColor="#ff4141" />
                    <stop offset={1} stopColor="#fcdb62" />
                  </linearGradient>
                </svg>
                <HighlightOffIcon
                  sx={{ fill: "url(#linearColors)", fontSize: "50px" }}
                />
              </motion.div>
            </div>
          ) : (
            <img
              className="passive-login-tfmis-image"
              src={
                currentUser?.photo
                  ? `http://localhost:3000/uploads/${currentUser?.photo}`
                  : sampleImage
              }
              alt=""
            />
          )}
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
