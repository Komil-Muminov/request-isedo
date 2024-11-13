import { Button, IconButton } from "@mui/material";
import "./ServicesModal.css";

import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const ServicesModal = ({
  handleShow,
  services,
  rqstsDataById,
  handleSubmit,
  setSelectedRowIndexes,
  selectedRowIndexes,
}: any) => {
  // Добавляем эффекты для установки выбранных строк по умолчанию
  useEffect(() => {
    const defaultSelectedIndexes = services
      ?.map((e: any, index: number) =>
        e.reqType.includes(rqstsDataById?.reqType) ? index : -1
      )
      .filter((index: number) => index !== -1); // убираем все -1
    setSelectedRowIndexes(defaultSelectedIndexes);
  }, [services, rqstsDataById]);

  const handleRowClick = (index: number) => {
    setSelectedRowIndexes((prevIndexes: any) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i: any) => i !== index)
        : [...prevIndexes, index]
    );
  };

  return (
    <div className="services-modal">
      <div className="content">
        <div className="modal-title">
          <p>Выбор услуг</p>
          <IconButton onClick={() => handleShow(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="modal-info-services">
          <table className="table-service-list">
            <thead>
              <tr>
                <th>Услуга</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Единица измерения</th>
                <th>Тип получателя</th>
                <th>Налог</th>
                <th>Сумма налога</th>
                <th>Итого</th>
              </tr>
            </thead>
            <tbody>
              {services?.map((e: any, index: any) => {
                const isSelected = selectedRowIndexes.includes(index);
                return (
                  <tr
                    key={e.id}
                    className={isSelected ? "selected" : ""}
                    onClick={() => handleRowClick(index)}
                  >
                    <td>{e.serviceName}</td>
                    <td>{e.price}</td>
                    <td>{e.amount}</td>
                    <td>{e.unit}</td>
                    <td>{e.recipientType}</td>
                    <td>{e.tax}</td>
                    <td>{e.sumTax}</td>
                    <td>{e.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="panel-control-buttons-services">
            <div className="wrapper-buttons">
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  backgroundColor: "#607d8b",
                  boxShadow: "none",
                  borderRadius: "10px",
                  border: "1px solid #bdbdbd",
                  color: "#fff",
                  textTransform: "none",
                  padding: "0px 40px",
                  ":hover": {
                    backgroundColor: "#40545d",
                    boxShadow: "none",
                    color: "#fff",
                  },
                }}
              >
                Да
              </Button>
              <Button
                onClick={() => handleShow(false)}
                variant="contained"
                sx={{
                  backgroundColor: "#607d8b",
                  boxShadow: "none",
                  borderRadius: "10px",
                  border: "1px solid #bdbdbd",
                  color: "#fff",
                  textTransform: "none",
                  padding: "0px 40px",
                  ":hover": {
                    backgroundColor: "#40545d",
                    boxShadow: "none",
                    color: "#fff",
                  },
                }}
              >
                Нет
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;
