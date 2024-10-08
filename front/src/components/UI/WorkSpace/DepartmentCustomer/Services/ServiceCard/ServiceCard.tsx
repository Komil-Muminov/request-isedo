import React from "react";
import "./ServiceCard.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const ServiceCard = ({ services }: any) => {
  return (
    <li className="service-list">
      <div className="wrapper-image-service-list">
        <AdminPanelSettingsIcon sx={{ fontSize: "100px" }} />
      </div>
      <div className="service-list-info">
        <div className="service-info-title">{services?.serviceName}</div>
      </div>
    </li>
  );
};

export default ServiceCard;
