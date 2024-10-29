import React from "react";

import "./CertificateCard.css";

import CardMembershipIcon from "@mui/icons-material/CardMembership";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ShieldIcon from "@mui/icons-material/Shield";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { motion } from "framer-motion";

const CertificateList = ({ title, desc }: any) => {
  return (
    <li className="certificate-list">
      <p className="certificate-list-title">{title}</p>
      <p className="certificate-list-description">
        {desc ? desc : `${desc} не заполнен`}
      </p>
    </li>
  );
};

const CertificateCard = ({
  getCertificateUser,
  statusCertificate,
  rqstsDataById,
}: any) => {
  return (
    <div
      className={`info-certificate ${
        getCertificateUser?.statusCode === 5
          ? "passive-certificate"
          : getCertificateUser?.statusCode === 0
          ? "active-certificate"
          : ""
      }`}
    >
      <div className="wrapper-info-certificate">
        <div className="wrapper-image-certificate">
          {getCertificateUser?.statusCode === 5 ? (
            <div className="passive-certificate-icon">
              <motion.div
                initial={{ x: 0 }} // Начальная позиция
                animate={{ x: -10 }} // Позиция после анимации
                transition={{ type: "spring", stiffness: 100, duration: 0.3 }} // Настройки анимации
              >
                <ShieldIcon
                  sx={{
                    fontSize: "100px",
                    color: "#fcdb62",
                  }}
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
            <ShieldIcon sx={{ fontSize: "100px", color: "#aeff4e" }} />
          )}
        </div>
        <div className="wrapper-info-list">
          <ul className="certificate-info-list">
            <CertificateList
              title="Код запроса"
              desc={getCertificateUser?.id}
            />
            <CertificateList title="ФИО" desc={getCertificateUser?.userName} />
            <CertificateList
              title="ИНН пользователя"
              desc={getCertificateUser?.userTax}
            />
            <CertificateList
              title="Номер телефон пользователя"
              desc={getCertificateUser?.userPhone}
            />
            <CertificateList
              title="Должность"
              desc={getCertificateUser?.role}
            />
            <CertificateList
              title="Организация"
              desc={getCertificateUser?.orgName}
            />
            <CertificateList
              title="ИНН организации"
              desc={getCertificateUser?.orgTax}
            />
            <CertificateList
              title="Номер телефон организации"
              desc={getCertificateUser?.orgPhone}
            />
            <CertificateList title="Регион" desc={getCertificateUser?.region} />
            <CertificateList title="Адрес" desc={getCertificateUser?.address} />
            <CertificateList
              title="Действителен с"
              desc={getCertificateUser?.validFrom}
            />
            <CertificateList
              title="Действителен до"
              desc={getCertificateUser?.validTo}
            />
            <CertificateList title="Статус" desc={statusCertificate} />
            <CertificateList title="Экспорт" />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
