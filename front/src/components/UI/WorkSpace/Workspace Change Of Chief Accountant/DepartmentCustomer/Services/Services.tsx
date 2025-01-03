import { Button } from "@mui/material";
import "./Services.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getServices } from "../../../../../API/GetServices";
import { queryClient } from "../../../../../../queryClient";
import { TServices } from "../../../../../API/GetServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ServiceCard from "./ServiceCard/ServiceCard";

import GppGoodIcon from "@mui/icons-material/GppGood";
import ButtonPanelControl from "../../../../ButtonPanelControl/ButtonPanelControl";
import { PutRequestServices } from "../../../../../API/PutRequestServices";
import { GetRqstsByIdType } from "../../../../../API/GetRqstsById";
import ServicesModal from "../../../../ServicesModal/ServicesModal";
import PDFViewerService from "../../../../PDF Viewer Service/PDFViewerService";

const Services = ({
  handleShowServicesList,
  rqstsDataById,
  executor,
  defaultService,
}: any) => {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = (state: boolean) => {
    setShow(state);
  };

  const getServicesQuery = useQuery(
    {
      queryFn: () => getServices(),
      queryKey: ["services"],
    },
    queryClient
  );

  const [services, setServices] = useState<TServices[]>([]);
  const [selectedRowIndexes, setSelectedRowIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (getServicesQuery.status === "success") {
      setServices(getServicesQuery.data);
    }
  }, [getServicesQuery]);

  const servicesFilteredByRequestId = services.filter((service) => {
    return service.reqType.includes(rqstsDataById?.reqType);
  });

  console.log(servicesFilteredByRequestId);
  

  const selectedServicesTotal = selectedRowIndexes.map(
    (index) => services[index]
  );

  const defaultTotalSum = servicesFilteredByRequestId.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.total;
    },
    0
  );

  const totalSum = selectedServicesTotal.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.total;
  }, 0);

  const [serviceIds, setServiceIds] = useState<number[]>([]);

  const putOrganizationUserMutation = useMutation({
    mutationFn: (data: GetRqstsByIdType) => PutRequestServices(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`request-${rqstsDataById?.id}`],
      });
    },
  });

  const handleChoose = () => {
    if (rqstsDataById) {
      // Отбираем услуги по индексам, выбранным пользователем
      const selectedServices = selectedRowIndexes.map(
        (index) => services[index]
      );

      // Получаем их ID для отправки на сервер
      // const serviceIds = selectedServices.map((service) => service.id);
      setServiceIds(selectedServices.map((service) => service.id));
    }

    handleShow(false);
  };

  const handleSubmit = () => {
    const services = [
      ...(Array.isArray(rqstsDataById.services) ? rqstsDataById.services : []),
      ...(Array.isArray(serviceIds) && serviceIds.length > 0
        ? serviceIds
        : [...defaultService]), // Преобразуем defaultService в массив, если оно не массив
    ];

    console.log(services);

    const servicesData = {
      ...rqstsDataById,
      services,
    };

    putOrganizationUserMutation.mutate(servicesData);
  };

  const servicesList = services.filter((e) => {
    return rqstsDataById?.services?.some((service: any) => service === e.id);
  });

  const disabledButton = servicesList.length > 0 ? true : false;

  const renderCurrentServiceList = () => {
    if (serviceIds.length > 0) {
      // Если есть выбранные услуги, отображаем их
      return services
        .filter((service) => serviceIds.includes(service.id))
        .map((service) => <ServiceCard key={service.id} service={service} />);
    } else if (servicesList.length > 0) {
      // Если выбранных услуг нет, но есть услуги из servicesList
      return (
        <div className="wrapper-new-user-files">
          <PDFViewerService title="Замима" hideFirstItem={true} />
        </div>
      );
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
    <>
      <div className="service-content">
        <div className="panel-control-certificate-revocation">
          <div className="certificates-revocation-title">
            {/* <CardMembershipIcon /> */}
            <p>Выставление услуги</p>
          </div>
          <p style={{ fontWeight: "bold" }}>
            Общая сумма:{" "}
            <span style={{ fontWeight: "normal" }}>
              {!totalSum ? defaultTotalSum : totalSum}c
            </span>
          </p>
        </div>
        <ul className="wrapper-service">{renderCurrentServiceList()}</ul>
        <div className="panel-buttons">
          {rqstsDataById?.services.length > 0 && (
            <div className="wrapper-show-executor">
              <p className="show-executor-title">
                Исполнитель: <span>{executor?.fullName}</span>
              </p>
              <p className="show-executor-title">
                Время: <span>{rqstsDataById?.dateChange}</span>
              </p>
            </div>
          )}
          <div className="panel-executor">
            <ButtonPanelControl
              icon={
                <GppGoodIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
              }
              text="Выбрать услугу"
              handleShow={handleShow}
              activeSendButton={disabledButton}
            />
            <ButtonPanelControl
              icon={
                <GppGoodIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
              }
              text="Выставить"
              activeSendButton={disabledButton}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      {show && (
        <ServicesModal
          handleShow={handleChoose}
          services={services}
          rqstsDataById={rqstsDataById}
          handleSubmit={handleChoose}
          setSelectedRowIndexes={setSelectedRowIndexes}
          selectedRowIndexes={selectedRowIndexes}
        />
      )}
    </>
  );
};

export default Services;
