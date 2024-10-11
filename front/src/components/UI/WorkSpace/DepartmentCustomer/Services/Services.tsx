import { Button } from "@mui/material";
import "./Services.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getServices } from "../../../../API/GetServices";
import { queryClient } from "../../../../../queryClient";
import { TServices } from "../../../../API/GetServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ServiceCard from "./ServiceCard/ServiceCard";

import GppGoodIcon from "@mui/icons-material/GppGood";
import ButtonPanelControl from "../../../ButtonPanelControl/ButtonPanelControl";
import { PutRequestServices } from "../../../../API/PutRequestServices";
import { GetRqstsByIdType } from "../../../../API/GetRqstsById";

const Services = ({ handleShowServicesList, rqstsDataById }: any) => {
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

  const servicesFilteredByRequestId = services.filter(
    (e) => e.reqType === rqstsDataById?.reqType
  );

  const totalSum = servicesFilteredByRequestId.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.total;
    },
    0
  );

  const putOrganizationUserMutation = useMutation({
    mutationFn: (data: GetRqstsByIdType) => PutRequestServices(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`request-${rqstsDataById?.id}`],
      });
    },
  });

  const handleSubmit = () => {
    if (rqstsDataById) {
      const serviceIds = servicesFilteredByRequestId.map(
        (service) => service.id
      );

      putOrganizationUserMutation.mutate({
        ...rqstsDataById,
        services: [...(rqstsDataById.services || []), ...serviceIds], // Используйте || [] для предотвращения ошибки
      });
    }
  };

  const disabledButton = servicesFilteredByRequestId.every((service) => {
    return rqstsDataById?.services?.includes(service.id);
  });

  const servicesList = services.filter((e) => {
    return rqstsDataById?.services?.some((service: any) => service === e.id);
  });

  const renderCurrentServiceList = () => {
    // Проверяем, есть ли объекты в servicesList
    if (servicesList.length > 0) {
      return servicesList.map((e) => {
        return <ServiceCard key={e.id} service={e} />;
      });
    } else if (servicesFilteredByRequestId.length > 0) {
      // Если servicesList пуст, рендерим servicesFilteredByRequestId
      return servicesFilteredByRequestId.map((e) => {
        return <ServiceCard key={e.id} service={e} />;
      });
    } else {
      return null;
    }
  };

  return (
    <div className="service-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          {/* <CardMembershipIcon /> */}
          <p>Выставление услуги</p>
        </div>
        <p style={{ fontWeight: "bold" }}>
          Общая сумма: <span style={{ fontWeight: "normal" }}>{totalSum}c</span>
        </p>
      </div>
      <ul className="wrapper-service">{renderCurrentServiceList()}</ul>
      <div className="panel-executor">
        <ButtonPanelControl
          icon={<GppGoodIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
          text="Выставить"
          handleSubmit={handleSubmit}
          activeSendButton={disabledButton}
        />
      </div>
    </div>
  );
};

export default Services;
