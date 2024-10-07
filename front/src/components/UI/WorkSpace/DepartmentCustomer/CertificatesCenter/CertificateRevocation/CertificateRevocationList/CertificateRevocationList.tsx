import "./CertificateRevocationList.css";

import { useEffect, useState } from "react";

import GppBadIcon from "@mui/icons-material/GppBad";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import certificateIcon from "../../../../../../../assets/certificateIcons.png";

import closedHand from "../../../../../../../assets/closedhand.svg";
import pointingHand from "../../../../../../../assets/pointinghand.svg";

import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CertificateRevocationModal from "../CertificateRevocationModal/CertificateRevocationModal";
import ButtonPanelControl from "../../../../../ButtonPanelControl/ButtonPanelControl";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { getCertificates } from "../../../../../../API/GetCertificates";
import { TCertificates } from "../../../../../../API/GetCertificates";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../../../API/Hooks/useAuth";
import { queryClient } from "../../../../../../../queryClient";
import { getUsers, TGetUsers } from "../../../../../../API/GetUsers";

import { statusOfCertificates } from "../../../../../../API/Data/Certificates/Certificates";
import { putCertificates } from "../../../../../../API/PutCertificates";
import OrganizationCard from "../../../../../UserOrOrganizationCard/OrganizationCard/OrganizationCard";
import CertificateCard from "../../CertificateCard/CertificateCard";

const CertificateRevocationList = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const [show, setShow] = useState<boolean>(false);

  const handleShow = (state: boolean) => {
    setShow(state);
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

  const getCertificateQuery = useQuery({
    queryFn: () => getCertificates(),
    queryKey: ["certificates"],
  });

  const [certificates, setCertificates] = useState<TCertificates[]>([]);

  useEffect(() => {
    if (getCertificateQuery.status === "success") {
      setCertificates(getCertificateQuery.data);
    }
  }, [getCertificateQuery]);

  // Получаем сертификат пользвателя по идентификатору пользователя
  const getCertificateUser = certificates.find((cert) => {
    return users?.some((user) => cert.userId === user.id);
  });

  const statusCertificate = statusOfCertificates.find(
    (e) => e.code === getCertificateUser?.statusCode
  );

  // Мутация для обновления сертификата
  const mutation = useMutation({
    mutationFn: (updatedCertificate: TCertificates) =>
      putCertificates(updatedCertificate), // Функция PUT запроса
    onSuccess: () => {
      // Обновляем сертификаты в кэше после изменения
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
    onError: (error) => {
      console.error("Ошибка при обновлении сертификата:", error);
    },
  });

  // Функция для изменения статуса сертификата
  const handleChangeStatus = (code: number) => {
    if (getCertificateUser) {
      mutation.mutate({
        ...getCertificateUser,
        statusCode: code, // Изменение statusCode с 0 на 5
      });
    }
  };

  console.log(certificates, "USERID", users, "ID");

  return (
    <>
      <div className="certificate-content">
        <div className="panel-control-certificate-revocation">
          <div className="certificates-revocation-title">
            {/* <CardMembershipIcon /> */}
            <p>Отзыв сертификата</p>
          </div>
        </div>
        <CertificateCard
          getCertificateUser={getCertificateUser}
          statusCertificate={statusCertificate?.name}
        />
        {/* <div className="table-container">
          <table className="table-certificate-list">
            <thead>
              <tr>
                <th>Код запроса</th>
                <th>ФИО</th>
                <th>ИНН пользователя</th>
                <th>Номер телефон пользователя</th>
                <th>Должность</th>
                <th>Организация</th>
                <th>ИНН организации</th>
                <th>Номер телефон организации</th>
                <th>Регион</th>
                <th>Адрес</th>
                <th>Серийный номер</th>
                <th>Действителен с</th>
                <th>Действителен до</th>
                <th>Статус</th>
                <th>Экспорт</th>
              </tr>
            </thead>
            <tbody>
              {getCertificateUser && (
                <tr
                  className={
                    getCertificateUser?.statusCode === 5 ? "change-status" : ""
                  }
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
                      {getCertificateUser?.statusCode === 5 ? (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      ) : (
                        <img src={certificateIcon} alt="" />
                      )}

                      <p>{getCertificateUser?.id}</p>
                    </div>
                  </td>
                  <td>{getCertificateUser?.userName}</td>
                  <td>{getCertificateUser?.userTax}</td>
                  <td>{getCertificateUser?.userPhone}</td>
                  <td>{getCertificateUser?.role}</td>
                  <td>{getCertificateUser?.orgName}</td>
                  <td>{getCertificateUser?.orgTax}</td>
                  <td>{getCertificateUser?.orgPhone}</td>
                  <td>{getCertificateUser?.region}</td>
                  <td>{getCertificateUser?.address}</td>
                  <td>{getCertificateUser?.serialNumber}</td>
                  <td>{getCertificateUser?.validFrom}</td>
                  <td>{getCertificateUser?.validTo}</td>
                  <td>{statusCertificate?.name}</td>
                  <td>
                    <FileDownloadOutlinedIcon />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}
        <div className="panel-executor">
          <ButtonPanelControl
            icon={<GppBadIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
            text="Отозвать"
            handleShow={handleShow}
          />
        </div>
      </div>
      {show && (
        <CertificateRevocationModal
          handleShow={handleShow}
          handleChangeStatus={handleChangeStatus}
        />
      )}
    </>
  );
};

export default CertificateRevocationList;
