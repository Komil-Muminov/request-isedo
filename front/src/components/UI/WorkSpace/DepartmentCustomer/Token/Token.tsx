import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useRef, useState } from "react";
import "./Token.css";
import { useLocation } from "react-router-dom";

const Token = ({ setShowTokenList, handleShowTokenList }: any) => {
  const location = useLocation();
  const requestIdTemp = location.pathname.split("/");
  const requestId = parseInt(requestIdTemp[requestIdTemp.length - 1]);

  return (
    <div className="token-content">
      <div className="panel-control-token">
        <Button
          onClick={() => handleShowTokenList(true)}
          variant="text"
          className="add-token"
        >
          <AddCircleIcon />
          <p>Токен</p>
        </Button>
      </div>
      <table className="table-token">
        <thead>
          <tr>
            <th>Серийный номер</th>
            <th>Модель токена</th>
            <th>Дата создания</th>
            <th>Создал</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>22000999056568</td>
            <td>Рутокен ЭЦП 2.0</td>
            <td>08.02.2021 15:31</td>
            <td>Supervisor</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Token;
