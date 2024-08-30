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
    </div>
  );
};

export default Token;
