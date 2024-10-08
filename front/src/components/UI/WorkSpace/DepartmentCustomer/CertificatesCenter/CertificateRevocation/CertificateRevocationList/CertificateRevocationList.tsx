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

interface TProps {
  getCertificateQuery: any;
  certificates: TCertificates[];
}

const CertificateRevocationList = ({
  getCertificateQuery,
  certificates,
}: TProps) => {
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

        <div className="panel-executor">
          <ButtonPanelControl
            icon={<GppBadIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
            text="Отозвать"
            handleShow={handleShow}
            activeSendButton={
              getCertificateUser?.statusCode === 5 ? true : false
            }
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
