import { Button } from "@mui/material";
import "./Services.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../../API/GetServices";
import { queryClient } from "../../../../../queryClient";
import { TServices } from "../../../../API/PostServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ServiceCard from "./ServiceCard/ServiceCard";

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

  console.log(services);

  return (
    <div className="service-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          {/* <CardMembershipIcon /> */}
          <p>Выдача сертификата </p>
        </div>
      </div>
      <ul className="wrapper-service">
        {services.map((e) => {
          return <ServiceCard services={e} />;
        })}
      </ul>
    </div>
  );
};

export default Services;
