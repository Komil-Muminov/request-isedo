import "./TypeRequest.css";
import AssignmentIcon from "@mui/icons-material/Assignment";

import changeOfAccountant from "../../../assets/icons/change-of-accountant.webp";
import { Button } from "@mui/material";

import { typeRequests } from "../../API/Data/TypeRequests/TypeRequests";

const TypeRequest = ({ setReqType, setShowTypeRequest, reqType }: any) => {
  const handleClick = (value: any) => {
    setReqType(value); // Установите значение в форму
    setShowTypeRequest(false);
  };

  console.log(reqType);

  return (
    <div className="wrapper-modal" onClick={() => setShowTypeRequest(false)}>
      <div className="content" onClick={(event) => event.stopPropagation()}>
        <div className="header">
          <p>Типы заявок</p>
        </div>
        <main className="center">
          <ul className="wrapper-request-list">
            {typeRequests.map((e) => {
              return (
                <li
                  className={e.name === reqType ? "active" : ""}
                  key={e.id}
                  onClick={() => handleClick(e.name)}
                >
                  <div className="icon">
                    <img src={e.image} alt="" />
                  </div>
                  <p>{e.name}</p>
                </li>
              );
            })}
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
