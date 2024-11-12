import React from "react";
import TitleDocument from "../../../../UI/TitleDocument/TitleDocument";
import { TextField } from "@mui/material";

const ChangeManagement = ({
  handleSubmit,
  onSubmit,
  register,
}: any) => {
  return (
    <section className="details-request">
      <TitleDocument title="Требуемые документы" />
      <div className="form_content">
        <form className="request_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs-list">
            <TextField
              {...register("fullName")}
              type="text"
              id="fullName"
              className="request_inp"
              // KM
              placeholder="ФИО"
            />
            <TextField
              {...register("role")}
              id="role"
              type="text"
              className="request_inp"
              placeholder="Должность"
            />
            <TextField
              {...register("phone")}
              id="phone"
              type="text"
              className="request_inp"
              placeholder="Номер телефона"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangeManagement;
