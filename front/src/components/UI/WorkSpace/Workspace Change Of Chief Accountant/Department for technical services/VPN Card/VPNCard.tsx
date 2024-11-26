import React from "react";

import "./VPNCard.css";

import VpnLockIcon from "@mui/icons-material/VpnLock";
import { motion } from "framer-motion";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const VPNCardList = ({ title, desc }: any) => {
  return (
    <li className="vpn-list">
      <p className="vpn-list-title">{title}</p>
      <p className="vpn-list-description">
        {desc ? desc : `${desc} не заполнен`}
      </p>
    </li>
  );
};

const VPNCard = ({ currentVPN }: any) => {

  return (
    <div
      className={`info-vpn ${
        currentVPN?.status === false
          ? "passive-vpn"
          : currentVPN
          ? "active-vpn"
          : ""
      }`}
    >
      <div className="wrapper-info-vpn">
        <div className="wrapper-image-vpn">
          {currentVPN?.status === false ? (
            <div className="passive-certificate-icon">
              <motion.div
                initial={{ x: 0 }} // Начальная позиция
                animate={{ x: -10 }} // Позиция после анимации
                transition={{ type: "spring", stiffness: 100, duration: 0.3 }} // Настройки анимации
              >
                <VpnLockIcon
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
            <VpnLockIcon sx={{ fontSize: "100px", color: "#aeff4e" }} />
          )}
        </div>
        <ul className="vpn-info-list">
          <VPNCardList title="ФИО" desc={currentVPN?.fullName} />
          <VPNCardList title="Логин" desc={currentVPN?.login} />
          <VPNCardList title="БЗ" desc={currentVPN?.bz} />
          <VPNCardList title="Организация" desc={currentVPN?.organization} />
          <VPNCardList title="Телефон" desc={currentVPN?.phone} />
          <VPNCardList title="Должность" desc={currentVPN?.role} />
          <VPNCardList
            title="Статус"
            desc={currentVPN?.status ? "Актив" : "Пассив"}
          />
        </ul>
      </div>
    </div>
  );
};

export default VPNCard;
