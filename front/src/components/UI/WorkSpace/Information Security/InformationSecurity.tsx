import "./InformationSecurity.css";

import { useEffect, useState } from "react";

import GppBadIcon from "@mui/icons-material/GppBad";

import closedHand from "../../../../assets/closedhand.svg";
import pointingHand from "../../../../assets/pointinghand.svg";

import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ButtonPanelControl from "../../ButtonPanelControl/ButtonPanelControl";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import NoAccountsIcon from "@mui/icons-material/NoAccounts";

import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRqstsById, GetRqstsByIdType } from "../../../API/GetRqstsById";
import { queryClient } from "../../../../queryClient";
import { getUsers, TGetUsers } from "../../../API/GetUsers";

const InformationSecurity = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  const { id } = useParams();
  const numericId = parseInt(id || "", 10);

  const getRqstsByIdQuery = useQuery(
    {
      queryFn: () => getRqstsById(numericId),
      queryKey: [`request-${numericId}`],
    },
    queryClient
  );

  const [rqstsDataById, setRqstsDataById] = useState<GetRqstsByIdType | null>(
    null
  );

  useEffect(() => {
    if (getRqstsByIdQuery.status === "success") {
      console.log(getRqstsByIdQuery.data); // Проверьте, массив это или объект

      setRqstsDataById(getRqstsByIdQuery.data);
    } else if (getRqstsByIdQuery.status === "error") {
      console.error(getRqstsByIdQuery.error);
    }
  }, [getRqstsByIdQuery]);

  // GET USERS

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

  const currentUser = users?.find((e) => e?.id === rqstsDataById?.userId);

  console.log(currentUser, "НЕ ПУСТОЙ");

  return (
    <>
      <div className="security-content">
        <div className="panel-control-security">
          <div className="security-title">
            <NoAccountsIcon />
            <p>Пассив логина</p>
          </div>
          <ButtonPanelControl
            icon={
              <PersonOffIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
            }
            text="Отправить в пассив"
          />
        </div>
        <div className="table-container-security ">
          <table className="table-security-list">
            <thead>
              <tr>
                <th>Имя и фамилия</th>
                <th>Логин</th>
                <th>Наименование</th>
                <th>Отдел</th>
                <th>Телефон</th>
                <th>e-mail</th>
                <th>Статус</th>
                <th>Дата последнего посещение</th>
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
              >
                <td>
                  <div className="content">
                    <CheckCircleIcon sx={{ color: "green" }} />
                    <p>{currentUser?.fullName}</p>
                  </div>
                </td>
                <td>{currentUser?.username}</td>
                <td>{currentUser?.orgName}</td>
                <td>{currentUser?.role}</td>
                <td>{currentUser?.phone}</td>
                <td>{currentUser?.email}</td>
                <td>Недавно</td>
                <td>26.09.2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InformationSecurity;
