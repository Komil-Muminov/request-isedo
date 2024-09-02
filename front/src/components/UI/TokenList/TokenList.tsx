import ButtonPanelControl from "../ButtonPanelControl/ButtonPanelControl";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import "./TokenList.css";

import { tokens } from "../../API/Data/Tokens/Tokens";
import { useState } from "react";

interface TProps {
  handleShowTokenList: (value: boolean) => void;
}

const TokenList = ({ handleShowTokenList }: TProps) => {
  const [selectedRowIndexes, setSelectedRowIndexes] = useState<number[]>([]);

  const handleRowClick = (index: number) => {
    setSelectedRowIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  return (
    <div className="wrapper-token-list">
      <div className="panel-control-token-list">
        <ButtonPanelControl
          icon={
            <ArrowBackIosIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
          }
          text="Назад"
          goBack={handleShowTokenList}
        />
        <ButtonPanelControl
          icon={<SaveIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
          text="Сохранить"
          //   handleSubmit={handleSave}
          //   handleCloseAfterSave={handleShowServicesList}
        />
      </div>
      <table className="table-token-list">
        <thead>
          <tr>
            <th>Модель токена</th>
            <th>Серийный номер</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((e, index) => {
            const isSelected = selectedRowIndexes.includes(index);
            return (
              <tr
                key={e.id}
                className={isSelected ? "selected" : ""}
                onClick={() => handleRowClick(index)}
              >
                <td>{e.typeToken}</td>
                <td>{e.serialNumber} </td>
                <td>{e.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className=""
        style={{
          padding: "0 20px",
          paddingTop: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <p>Выбрано: </p>
      </div>
    </div>
  );
};

export default TokenList;
