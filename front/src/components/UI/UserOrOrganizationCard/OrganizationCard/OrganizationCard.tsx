import "../UserOrOrganizationCard.css";
import sampleImage from "../../../../../../back/uploads/929493.png";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

const OrganizationCard = ({ currentOrganization }: any) => {
  return (
    <div className="info-accountant">
      <div className="wrapper-info">
        <div className="wrapper-image">
          <CorporateFareIcon sx={{ fontSize: "100px" }} />
        </div>
        <div className="wrapper-text">
          <h2>
            {currentOrganization
              ? currentOrganization?.name
              : "Название не заполнено"}
          </h2>
          <p>
            <span>ИНН:</span>{" "}
            {currentOrganization ? currentOrganization?.tax : "ИНН не заполнен"}
          </p>
          <p>
            <span>Номер телефона:</span>{" "}
            {currentOrganization
              ? currentOrganization?.phone
              : "Номер не заполнен"}
          </p>
          <p>
            <span>E-mail адрес:</span>{" "}
            {currentOrganization
              ? currentOrganization?.email
              : "Почта не заполнена"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard;
