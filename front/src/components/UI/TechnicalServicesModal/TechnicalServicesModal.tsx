import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";

interface TProps {
  handleShow: (state: boolean) => void;
  handleChangeStatus: () => void;
}

const TechnicalServicesModal: React.FC<TProps> = ({
  handleShow,
  handleChangeStatus,
}) => {
  const handleConfirm = () => {
    handleChangeStatus();
    handleShow(false);
  };
  return (
    <div
      onClick={() => handleShow(false)}
      className="certificate-revocation-modal"
    >
      <div onClick={(event) => event.stopPropagation()} className="content">
        <div className="modal-title">
          <p>Пассив логина</p>
          <IconButton onClick={() => handleShow(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <main className="modal-info">
          <p>Вы действительно хотите отправить логин в пассив?</p>
          {/* <div className="reason-code">
            <p>Отправить в пассив до:</p>
            <input type="date" />
          </div> */}
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

export default TechnicalServicesModal;
