import "./TechnicalServices.css";

import { useEffect, useState } from "react";

import closedHand from "../../../../assets/closedhand.svg";
import pointingHand from "../../../../assets/pointinghand.svg";

import ButtonPanelControl from "../../ButtonPanelControl/ButtonPanelControl";

import NoAccountsIcon from "@mui/icons-material/NoAccounts";

import PersonOffIcon from "@mui/icons-material/PersonOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getVPN, TVPN } from "../../../API/GetVPN";
import { getUsers, TGetUsers } from "../../../API/GetUsers";
import { queryClient } from "../../../../queryClient";
import TechnicalServicesModal from "../../TechnicalServicesModal/TechnicalServicesModal";
import { putVpnById } from "../../../API/PutVpnById";
import VPNCard from "./VPN Card/VPNCard";

const TechnicalServices = () => {
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

  const getVpn = vpn.find((v) => {
    return users?.some((user) => v.userId === user.id);
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
    if (getVpn) mutation.mutate(getVpn);
  };


  return (
    <>
      <div className="technical-content">
        <div className="panel-control-technical">
          <div className="technical-title">
            {/* <NoAccountsIcon /> */}
            <p>Пассив VPN</p>
          </div>
        </div>
        <VPNCard getVpn={getVpn}/>
        {/* <div className="table-container-technical ">
          <table className="table-technical-list">
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Логин</th>
                <th>БЗ</th>
                <th>Организация</th>
                <th>Телефон</th>
                <th>Должность</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  cursor: isMouseDown
                    ? `url(${closedHand}), auto`
                    : `url(${pointingHand}), auto`,
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // Для сброса состояния при выходе мыши
                className={
                  getVpn?.status === false ? "technical-passive-user" : ""
                }
              >
                <td>
                  <div className="content">
                    {getVpn?.status ? (
                      <AccountCircleIcon sx={{ color: "#607d8b" }} />
                    ) : (
                      <DoNotDisturbOnIcon sx={{ color: "red" }} />
                    )}

                    <p>{getVpn?.fullName}</p>
                  </div>
                </td>
                <td>{getVpn?.login}</td>
                <td>{getVpn?.bz}</td>
                <td>{getVpn?.organization}</td>
                <td>{getVpn?.phone}</td>
                <td>{getVpn?.role}</td>
                <td>{getVpn?.status ? "Актив" : "Пассив"}</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div className="panel-executor">
          <ButtonPanelControl
            icon={
              <NoAccountsIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
            }
            text="Отправить в пассив"
            handleShow={handleShow}
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

export default TechnicalServices;
