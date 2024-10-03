import ButtonPanelControl from "../../../ButtonPanelControl/ButtonPanelControl";
import "./InstallCertificate.css";

import GppBadIcon from "@mui/icons-material/GppBad";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { TextField } from "@mui/material";

const InstallCertificate = () => {
  return (
    <div className="certificate-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          <CardMembershipIcon />
          <p>Установка сертификата </p>
        </div>
      </div>
      <div className="inputs-list install-certificate-inputs-list">
        <TextField
          // {...register("fullName")}
          type="text"
          id="fullName"
          className="request_inp"
          // KM
          label="ФИО"
        />
        <TextField
          // {...register("email")}
          id="email"
          type="text"
          className="request_inp"
          label="ИНН пользователя"
        />
        <TextField
          // {...register("tax")}
          id="tax"
          type="text"
          className="request_inp"
          label="Организация"
        />
        <TextField
          // {...register("phone")}
          id="phone"
          type="text"
          className="request_inp"
          label="ИНН Организации"
        />
        <TextField
          // {...register("passport")}
          id="passport"
          type="text"
          className="request_inp"
          label="Должность"
        />
        <TextField
          // {...register("role")}
          id="role"
          type="text"
          className="request_inp"
          label="Регион"
        />
        <TextField
          // {...register("role")}
          id="role"
          type="text"
          className="request_inp"
          label="Адрес"
        />
        <TextField
          // {...register("role")}
          id="role"
          type="text"
          className="request_inp"
          label="Номер телефона"
        />
      </div>
    </div>
  );
};

export default InstallCertificate;
