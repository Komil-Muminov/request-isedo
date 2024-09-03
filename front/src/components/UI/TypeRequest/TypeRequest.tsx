import "./TypeRequest.css";
import AssignmentIcon from "@mui/icons-material/Assignment";

import changeOfAccountant from "../../../assets/icons/change-of-accountant.webp";
import { Button } from "@mui/material";

const TypeRequest = ({ setReqType, setShowTypeRequest }: any) => {
  const handleClick = (value: any) => {
    setReqType(value); // Установите значение в форму
    setShowTypeRequest(false);
  };

  return (
    <div className="wrapper-modal" onClick={() => setShowTypeRequest(false)}>
      <div className="content" onClick={(event) => event.stopPropagation()}>
        <div className="header">
          <p>Типы заявок</p>
        </div>
        <main className="center">
          <ul className="wrapper-request-list">
            <li onClick={() => handleClick("Смена главного бухгалтера")}>
              {/* <AssignmentIcon sx={{ fontSize: "50px", color: "#FFEB3B" }} /> */}

              <div className="icon">
                <img src={changeOfAccountant} alt="" />
              </div>
              <p>Смена главного бухгалтера</p>
            </li>
            <li onClick={() => handleClick("Смена руководителя")}>
              <div className="icon">
                <img src={changeOfAccountant} alt="" />
              </div>
              <p>Смена руководителя</p>
            </li>
            <li>
              <div className="icon">
                <img src={changeOfAccountant} alt="" />
              </div>
              <p>Продление сертификата главного бухгалтера</p>
            </li>
            <li>
              <div className="icon">
                <img src={changeOfAccountant} alt="" />
              </div>
              <p>Продление сертификата руководителя</p>
            </li>
            <li>
              <div className="icon">
                <img src={changeOfAccountant} alt="" />
              </div>
              <p>Продажа токена</p>
            </li>
            <li>
              <div className="icon">
                <img src={changeOfAccountant} alt="" />
              </div>
              <p>Предоставление доступа к модулям</p>
            </li>
            <li>
              <div className="icon">
                <img src={changeOfAccountant} alt="" />
              </div>
              <p>Техническая поддержка</p>
            </li>
          </ul>
        </main>
        {/* <div className="footer">
          <Button
            sx={{
              borderRadius: "50px",
              display: "flex",
              gap: "5px",
              backgroundColor: "#607d8b",
              "&:hover": {
                backgroundColor: "#516874",
              },
            }}
            variant="contained"
          >
            Сохранить
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              display: "flex",
              gap: "5px",
              backgroundColor: "#607d8b",
              "&:hover": {
                backgroundColor: "#516874",
              },
            }}
            variant="contained"
          >
            Закрыть
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default TypeRequest;
