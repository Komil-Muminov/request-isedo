import React from "react";

import "./Identification.css";

import InputIdentification from "../../UI/InputIdentification/InputIdentification";

import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Identification = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="wrapper-prev">
        <div className="container">
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{ borderRadius: "50px" }}
          >
            Назад
          </Button>
        </div>
      </div>
      <div className="container">
        <div className="wrapper-identification">
          <h1>Форма идентификации пользователя</h1>
          <form>
            <InputIdentification
              labelText="Наименование организации*"
              typeInput="text"
            />
            <InputIdentification
              labelText="Наименование Отдела*"
              typeInput="text"
            />
            <InputIdentification labelText="Должность*" typeInput="text" />
            <InputIdentification typeInput="file" />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Identification;
