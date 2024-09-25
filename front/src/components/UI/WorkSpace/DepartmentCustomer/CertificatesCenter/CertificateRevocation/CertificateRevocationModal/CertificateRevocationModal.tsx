import React, { useState } from "react";

import "./CertificateRevocationModal.css";

import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";

import { statusOfCertificates } from "../../../../../../API/Data/Certificates/Certificates";

interface TProps {
  handleShow?: any;
  handleChangeStatus?: any;
}

const CertificateRevocationModal = ({
  handleShow,
  handleChangeStatus,
}: TProps) => {
  const [selectedReason, setSelectedReason] = useState(""); // состояние для выбранного значения

  const handleSelectChange = (event: any) => {
    setSelectedReason(event.target.value); // сохраняем выбранное значение в состояние
  };

  const handleConfirm = () => {
    const gotStatusCode = statusOfCertificates.find(
      (e) => e.name === selectedReason
    );
    if (gotStatusCode) {
      handleChangeStatus(gotStatusCode?.code); // вызываем функцию изменения статуса
    }
    handleShow(false); // закрываем модальное окно
  };

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
            <select
              name="revocationReason"
              id="revocationReason"
              onChange={handleSelectChange}
            >
              <option value="">Не определен</option>
              {statusOfCertificates.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="panel-control-buttons">
            <div className="wrapper-buttons">
              <Button
                onClick={handleConfirm}
                variant="contained"
                sx={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "none",
                  borderRadius: "0",
                  border: "1px solid #bdbdbd",
                  color: "#000",
                  textTransform: "none",
                  padding: "0px 40px",
                  ":hover": {
                    backgroundColor: "#dfdede",
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
                  backgroundColor: "#e8e8e8",
                  boxShadow: "none",
                  borderRadius: "0",
                  border: "1px solid #bdbdbd",
                  color: "#000",
                  textTransform: "none",
                  padding: "0px 40px",
                  ":hover": {
                    backgroundColor: "#dfdede",
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
