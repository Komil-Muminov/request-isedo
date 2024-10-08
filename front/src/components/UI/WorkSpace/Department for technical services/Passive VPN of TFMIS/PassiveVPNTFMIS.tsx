import React from "react";

import "./PassiveVPNTFMIS.css";

import { useEffect, useState } from "react";

import closedHand from "../../../../assets/closedhand.svg";
import pointingHand from "../../../../assets/pointinghand.svg";

import ButtonPanelControl from "../../../ButtonPanelControl/ButtonPanelControl";

import NoAccountsIcon from "@mui/icons-material/NoAccounts";

import PersonOffIcon from "@mui/icons-material/PersonOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getVPN, TVPN } from "../../../../API/GetVPN";
import { getUsers, TGetUsers } from "../../../../API/GetUsers";
import { queryClient } from "../../../../../queryClient";
import TechnicalServicesModal from "../../../TechnicalServicesModal/TechnicalServicesModal";
import { putVpnById } from "../../../../API/PutVpnById";
import VPNCard from ".././VPN Card/VPNCard";

const PassiveVPNTFMIS = ({ currentOrganization }: any) => {
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

  const currentVPN = vpn.find((v) => {
    return currentOrganization?.userIds.includes(v.userId);
  });

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
