import { useState } from "react";
import "./ServicesList.css";

import ButtonPanelControl from "../ButtonPanelControl/ButtonPanelControl";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";

import { services } from "../../API/Data/Services/Services";

import { postServices, TServices } from "../../API/PostServices";
import { queryClient } from "../../../queryClient";
import { useMutation } from "@tanstack/react-query";

import { useLocation } from "react-router-dom";

interface TProps {
  handleShowServicesList: (value: boolean) => void;
}

const ServicesList = ({ handleShowServicesList }: TProps) => {
  const [selectedRowIndexes, setSelectedRowIndexes] = useState<number[]>([]);

  const location = useLocation();

  const requestIdTemp = location.pathname?.split("/");

  const requestId = parseInt(requestIdTemp[requestIdTemp.length - 1]);

  const postServiceMutation = useMutation(
    {
      mutationFn: (data: TServices) => postServices(data, requestId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["services"] });
      },
    },
    queryClient
  );

  const handleRowClick = (index: number) => {
    setSelectedRowIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const handleSave = () => {
    const selectedServices = services.filter((_, index) =>
      selectedRowIndexes.includes(index)
    );

    selectedServices.forEach((service) => {
      postServiceMutation.mutate(service);
    });
  };

  return (
    <div className="wrapper-service-list">
      <div className="panel-control-service-list">
        <ButtonPanelControl
          icon={
            <ArrowBackIosIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
          }
          text="Назад"
          goBack={handleShowServicesList}
        />
        <ButtonPanelControl
          icon={<SaveIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
          text="Сохранить"
          handleSubmit={handleSave}
          handleCloseAfterSave={handleShowServicesList}
        />
      </div>
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
          {services?.map((e, index) => {
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
        <p>Выбрано: {selectedRowIndexes.length}</p>
      </div>
    </div>
  );
};

export default ServicesList;
