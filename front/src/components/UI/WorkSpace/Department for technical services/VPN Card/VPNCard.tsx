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

const VPNCard = ({ getVpn }: any) => {

  return (
    <div
      className={`info-vpn ${getVpn?.status === false ? "passive-vpn" : ""}`}
    >
      <div className="wrapper-info-vpn">
        <div className="wrapper-image-vpn">
          <VpnLockIcon sx={{ fontSize: "100px" }} />
        </div>
        <ul className="vpn-info-list">
          <VPNCardList title="ФИО" desc={getVpn?.fullName} />
          <VPNCardList title="Логин" desc={getVpn?.login} />
          <VPNCardList title="БЗ" desc={getVpn?.bz} />
          <VPNCardList title="Организация" desc={getVpn?.organization} />
          <VPNCardList title="Телефон" desc={getVpn?.phone} />
          <VPNCardList title="Должность" desc={getVpn?.role} />
          <VPNCardList
            title="Статус"
            desc={getVpn?.status ? "Актив" : "Пассив"}
          />
        </ul>
      </div>
    </div>
  );
};

export default VPNCard;
