import { Button } from "@mui/material";
import "./Services.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../API/GetServices";
import { queryClient } from "../../../queryClient";
import { TServices } from "../../API/PostServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface TProps {
  handleShowServicesList: (value: boolean) => void;
}

const Services = ({ handleShowServicesList }: TProps) => {
  const getServicesQuery = useQuery(
    {
      queryFn: () => getServices(),
      queryKey: ["services"],
    },
    queryClient
  );

  const [services, setServices] = useState<TServices[]>([]);

  useEffect(() => {
    if (getServicesQuery.status === "success") {
      setServices(getServicesQuery.data);
    }
  }, [getServicesQuery]);

  const location = useLocation();

  const requestIdTemp = location.pathname.split("/");

  const requestId = parseInt(requestIdTemp[requestIdTemp.length - 1]);

  const servicesFilteredByRequestId = services.filter(
    (e) => e.requestId === requestId
  );

  const totalSumOfServices = servicesFilteredByRequestId.reduce(
    (accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.total);
    },
    0
  );

  return (
    <div className="service-content">
      <div className="panel-control-service">
        <Button
          onClick={() => handleShowServicesList(true)}
          variant="text"
          className="add-services"
        >
          <AddCircleIcon />
          <p>Услуги</p>
        </Button>
        <div className="services-info">
          <p>
            Количество: <span>{servicesFilteredByRequestId.length}</span>
          </p>
          <p>
            На сумму: <span>TJS {totalSumOfServices}</span>
          </p>
        </div>
      </div>
      <table className="table-service">
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
          {servicesFilteredByRequestId?.map((e) => {
            return (
              <tr key={e.id}>
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
      {services.length === 0 && (
        <p className="title-add-services">Добавьте услугу</p>
      )}
    </div>
  );
};

export default Services;
