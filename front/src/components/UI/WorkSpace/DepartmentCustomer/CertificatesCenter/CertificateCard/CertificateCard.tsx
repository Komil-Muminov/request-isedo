import React from "react";

import "./CertificateCard.css";

import CardMembershipIcon from "@mui/icons-material/CardMembership";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";

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

  const oldAndNewCertificateStatus =
    getCertificateUser?.userId === rqstsDataById?.userId;

  return (
    <div
      className={`info-certificate ${
        getCertificateUser?.statusCode === 5 &&
        oldAndNewCertificateStatus === false
          ? "passive-certificate"
          : getCertificateUser?.statusCode === 5 &&
            oldAndNewCertificateStatus === true
          ? "active-certificate"
          : ""
      }`}
    >
      <div className="wrapper-info-certificate">
        <div className="wrapper-image-certificate">
          {oldAndNewCertificateStatus === false ? (
            <GppBadIcon sx={{ fontSize: "100px", color: "#fcdb62" }} />
          ) : (
            <GppGoodIcon sx={{ fontSize: "100px", color: "#42ff73" }} />
          )}
        </div>
        <ul className="certificate-info-list">
          <CertificateList title="Код запроса" desc={getCertificateUser?.id} />
          <CertificateList title="ФИО" desc={getCertificateUser?.userName} />
          <CertificateList
            title="ИНН пользователя"
            desc={getCertificateUser?.userTax}
          />
          <CertificateList
            title="Номер телефон пользователя"
            desc={getCertificateUser?.userPhone}
          />
          <CertificateList title="Должность" desc={getCertificateUser?.role} />
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
            title="Серийный номер"
            desc={getCertificateUser?.serialNumber}
          />
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
  );
};

export default CertificateCard;
