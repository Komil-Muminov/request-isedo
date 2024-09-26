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

  console.log(getCertificateUser);

  return (
    <>
      <div className="certificate-content">
        <div className="panel-control-certificate-revocation">
          <div className="certificates-revocation-title">
            <CardMembershipIcon />
            <p>Отзыв сертификата</p>
          </div>
          <ButtonPanelControl
            icon={<GppBadIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
            text="Отозвать"
            handleShow={handleShow}
          />
        </div>
        <div className="table-container">
          <table className="table-certificate-list">
            <thead>
              <tr>
                <th>Код запроса</th>
                <th>Организация запроса</th>
                <th>Подразделение запроса</th>
                <th>Общее имя запроса</th>
                <th>Город запроса</th>
                <th>Область/республика запроса</th>
                <th>Должность</th>
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
                  <td>{getCertificateUser?.organization}</td>
                  <td>{getCertificateUser?.subdivision}</td>
                  <td>{getCertificateUser?.nameRequest}</td>
                  <td>{getCertificateUser?.cityRequest}</td>
                  <td>{getCertificateUser?.regionRequest}</td>
                  <td>{getCertificateUser?.role}</td>
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
