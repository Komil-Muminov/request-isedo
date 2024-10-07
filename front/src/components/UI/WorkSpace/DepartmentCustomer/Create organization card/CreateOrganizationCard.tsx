import ButtonPanelControl from "../../../ButtonPanelControl/ButtonPanelControl";
import "./CreateOrganizationCard.css";

import GppGoodIcon from "@mui/icons-material/GppGood";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { TGetOrganizations } from "../../../../API/GetOrganizations";

const CreateOrganizationCard = () => {
  const {
    register,
    // Записывает все стейты в массив
    handleSubmit,
  } = useForm<TGetOrganizations>({
    defaultValues: {
      name: "",
      type: "",
      tax: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      description: "",
    },
  });

  const onSubmit = (data: TGetOrganizations) => {
    const updateReqData = {
      ...data,
      status: true,
      userIds: [],
    };
    // postCertificates.mutate(updateReqData);
  };

  return (
    <div className="certificate-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          {/* <CardMembershipIcon /> */}
          <p>Создание карточки организации</p>
        </div>
      </div>
      <div className="inputs-list install-certificate-inputs-list">
        <TextField
          {...register("name")}
          type="text"
          id="name"
          className="request_inp"
          label="Название организации"
        />
        <TextField
          {...register("type")}
          id="type"
          type="text"
          className="request_inp"
          label="Тип организации"
        />
        <TextField
          {...register("tax")}
          id="tax"
          type="text"
          className="request_inp"
          label="ИНН организации"
        />
        <TextField
          {...register("address")}
          id="address"
          type="text"
          className="request_inp"
          label="Адрес"
        />
        <TextField
          {...register("phone")}
          id="phone"
          type="text"
          className="request_inp"
          label="Номер"
        />
        <TextField
          {...register("email")}
          id="email"
          type="text"
          className="request_inp"
          label="E-mail почта"
        />
        <TextField
          {...register("website")}
          id="website"
          type="text"
          className="request_inp"
          label="Веб-сайт"
        />
        <TextField
          {...register("description")}
          id="description"
          type="text"
          className="request_inp"
          label="Описание"
        />
      </div>
      <div className="panel-executor">
        <ButtonPanelControl
          icon={<GppGoodIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
          text="Выдать"
          handleSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default CreateOrganizationCard;
