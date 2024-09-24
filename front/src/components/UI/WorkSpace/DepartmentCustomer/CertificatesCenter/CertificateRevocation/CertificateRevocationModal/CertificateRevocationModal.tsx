import React from "react";

import "./CertificateRevocationModal.css";

import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";

interface TProps {
  handleShow?: any;
}

const CertificateRevocationModal = ({ handleShow }: TProps) => {
  return (
    <div
      onClick={() => handleShow(false)}
      className="certificate-revocation-modal"
    >
      <div onClick={(event) => event.stopPropagation()} className="content">
        <div className="modal-title">
          <p>Отзыв сертификата</p>
          <IconButton onClick={() => handleShow(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <main className="modal-info">
          <p>Вы действительно хотите отозвать выделенный сертификат?</p>
          <div className="reason-code">
            <p>Код причины:</p>
            <select name="" id="">
              <option value="">Не определен</option>
              <option value="">Компрометация ключа</option>
              <option value="">Компрометация ЦС</option>
              <option value="">Изменение принадлежности</option>
              <option value="">Сертификат заменен</option>
              <option value="">Прекращение работы</option>
              <option value="">Приостановка действия</option>
            </select>
          </div>
          <div className="panel-control-buttons">
            <div className="wrapper-buttons">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#d8d8d8",
                  boxShadow: "none",
                  borderRadius: "0",
                  border: "1px solid #bdbdbd",
                  color: "#000",
                  textTransform: "none",
                  padding: "0px 40px",
                  ":hover": {
                    backgroundColor: "#cdcccc",
                    boxShadow: "none",
                    color: "#000",
                  },
                }}
              >
                Да
              </Button>
              <Button
                onClick={() => handleShow(false)}
                variant="contained"
                sx={{
                  backgroundColor: "#d8d8d8",
                  boxShadow: "none",
                  borderRadius: "0",
                  border: "1px solid #bdbdbd",
                  color: "#000",
                  textTransform: "none",
                  padding: "0px 40px",
                  ":hover": {
                    backgroundColor: "#cdcccc",
                    boxShadow: "none",
                    color: "#000",
                  },
                }}
              >
                Нет
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CertificateRevocationModal;
