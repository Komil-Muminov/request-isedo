import React from "react";
import "./ServiceCard.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const ServiceCard = ({ service }: any) => {


  return (
    <li className="service-list">
      <div className="wrapper-image-service-list">
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "100px",
            color: "#607d8b",
          }}
        />
      </div>
      <div className="service-list-info">
        <div className="service-info-details">
          <p>{service?.serviceName}</p>
          <p>
            {service?.unit}: <span>{service?.amount}</span>
          </p>
          <p>
            Сумма без НДС: <span>{service?.price}c</span>
          </p>
          <p>
            НДС: <span>{service?.sumTax}c</span>
          </p>
          <p>
            Общее: <span>{service?.total}c</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default ServiceCard;
