import React from "react";

import "./VPNCard.css";

import VpnLockIcon from "@mui/icons-material/VpnLock";

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
  console.log(currentVPN);

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
            <VpnLockIcon sx={{ fontSize: "100px", color: "#fcdb62" }} />
          ) : (
            <VpnLockIcon sx={{ fontSize: "100px", color: "#42ff73" }} />
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
