import React from "react";

import "./PassiveVPNTFMIS.css";

import { useEffect, useState } from "react";

import closedHand from "../../../../assets/closedhand.svg";
import pointingHand from "../../../../assets/pointinghand.svg";

import ButtonPanelControl from "../../../../ButtonPanelControl/ButtonPanelControl";

import NoAccountsIcon from "@mui/icons-material/NoAccounts";

import PersonOffIcon from "@mui/icons-material/PersonOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getVPN, TVPN } from "../../../../../API/GetVPN";
import { getUsers, TGetUsers } from "../../../../../API/GetUsers";
import { queryClient } from "../../../../../../queryClient";
import TechnicalServicesModal from "../../../../TechnicalServicesModal/TechnicalServicesModal";
import { putVpnById } from "../../../../../API/PutVpnById";
import VPNCard from ".././VPN Card/VPNCard";

const PassiveVPNTFMIS = ({
  currentOrganization,
  executor,
  rqstsDataById,
}: any) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const [users, setUsers] = useState<TGetUsers[] | null>(null);

  const usersQuery = useQuery(
    {
      queryFn: () => getUsers(),
      queryKey: ["users"],
    },
    queryClient
  );

  useEffect(() => {
    if (usersQuery.status === "success") {
      setUsers(usersQuery.data);
    }
  }, [usersQuery]);

  const getVpnQuery = useQuery(
    {
      queryFn: () => getVPN(),
      queryKey: ["vpn"],
    },
    queryClient
  );

  const [vpn, setVpn] = useState<TVPN[]>([]);

  useEffect(() => {
    if (getVpnQuery.status === "success") {
      setVpn(getVpnQuery.data);
    }
  }, [getVpnQuery]);

  const [show, setShow] = useState<boolean>(false);

  const handleShow = (state: boolean) => {
    setShow(state);
  };

  // Мутация для обновления сертификата
  const mutation = useMutation({
    mutationFn: (updatedVpn: TVPN) => putVpnById(updatedVpn), // Функция PUT запроса
    onSuccess: () => {
      // Обновляем сертификаты в кэше после изменения
      queryClient.invalidateQueries({ queryKey: ["vpn"] });
    },
    onError: (error) => {
      console.error("Ошибка при обновлении VPN:", error);
    },
  });

  // Данные главного бухгалтера

  const currentAccountant = users?.find((user) => {
    if (currentOrganization)
      return (
        currentOrganization.userIds.includes(user.id) &&
        user.role === "Главный бухгалтер"
      );
  });

  // Данные руководителя

  const currentManagement = users?.find((user) => {
    if (currentOrganization)
      return (
        currentOrganization.userIds.includes(user.id) &&
        user.role === "Руководитель"
      );
  });

  const currentVPN = vpn.find((v) => {
    if (
      v?.userId === currentAccountant?.id &&
      rqstsDataById?.reqType === "Смена главного бухгалтера"
    ) {
      return v;
    }

    if (
      v?.userId === currentManagement?.id &&
      rqstsDataById?.reqType === "Смена руководителя"
    ) {
      return v;
    }
  });

  // Функция для изменения статуса сертификата
  const handleChangeStatus = () => {
    if (currentVPN) mutation.mutate(currentVPN);
  };

  return (
    <>
      <div className="vpn-content">
        <div className="panel-control-vpn">
          <div className="vpn-title">
            {/* <NoAccountsIcon /> */}
            <p>Пассив VPN</p>
          </div>
        </div>
        <VPNCard currentVPN={currentVPN} />
        <div className="panel-buttons">
          {currentVPN?.status === false && (
            <div className="wrapper-show-executor">
              <p className="show-executor-title">
                Исполнитель: <span>{executor?.fullName}</span>
              </p>
              <p className="show-executor-title">
                Время: <span>{currentVPN?.dateChange}</span>
              </p>
            </div>
          )}
          <div className="panel-executor">
            <ButtonPanelControl
              icon={
                <NoAccountsIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
              }
              text="Отправить в пассив"
              handleShow={handleShow}
              activeSendButton={!currentVPN?.status}
            />
          </div>
        </div>
      </div>
      {show && (
        <TechnicalServicesModal
          handleShow={handleShow}
          handleChangeStatus={handleChangeStatus}
        />
      )}
    </>
  );
};

export default PassiveVPNTFMIS;
