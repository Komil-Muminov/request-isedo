import "./CertificateRevocationList.css";

import { useEffect, useState } from "react";

import GppBadIcon from "@mui/icons-material/GppBad";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import certificateIcon from "../../../../../../../assets/certificateIcons.png";

import closedHand from "../../../../../../../assets/closedhand.svg";
import pointingHand from "../../../../../../../assets/pointinghand.svg";

import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CertificateRevocationModal from "../CertificateRevocationModal/CertificateRevocationModal";
import ButtonPanelControl from "../../../../../../ButtonPanelControl/ButtonPanelControl";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import GppGoodIcon from "@mui/icons-material/GppGood";

import { getCertificates } from "../../../../../../../API/GetCertificates";
import { TCertificates } from "../../../../../../../API/GetCertificates";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../../../../API/Hooks/useAuth";
import { queryClient } from "../../../../../../../../queryClient";
import { getUsers, TGetUsers } from "../../../../../../../API/GetUsers";

import { statusOfCertificates } from "../../../../../../../API/Data/Certificates/Certificates";
import { putCertificates } from "../../../../../../../API/PutCertificates";
import OrganizationCard from "../../../../../../UserOrOrganizationCard/OrganizationCard/OrganizationCard";
import CertificateCard from "../../CertificateCard/CertificateCard";
import {
  putRqstsById,
  PutRqstsByIdType,
} from "../../../../../../../API/PutRqstById";

interface TProps {
  rqstsDataById: any;
  certificates: TCertificates[];
  executor: any;
  currentOrganization: any;
}

const CertificateRevocationList = ({
  rqstsDataById,
  certificates,
  executor,
  currentOrganization,
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

  // Нынешний главный бухгалтер
  const currentAccountant = users?.find((user) => {
    if (
      currentOrganization &&
      currentOrganization?.userIds?.includes(user.id) &&
      user.role === "Главный бухгалтер" &&
      user.status === true
    ) {
      return user;
    }
  });

  // Нынешний руководитель
  const currentManagement = users?.find((user) => {
    if (
      currentOrganization &&
      currentOrganization?.userIds?.includes(user.id) &&
      user.role === "Руководитель" &&
      user.status === true
    ) {
      return user;
    }
  });

  console.log(currentAccountant);
  console.log(currentManagement);

  // Получаем сертификат пользователя по идентификатору пользователя
  const getCertificateUser = certificates.find((cert) => {
    if (
      rqstsDataById?.reqType === "Смена главного бухгалтера" &&
      currentAccountant.fullName === cert.userName
    ) {
      return cert;
    }
    if (
      (rqstsDataById?.reqType === "Смена руководителя" &&
        currentManagement.fullName === cert.userName) ||
      (rqstsDataById?.reqType === "Смена главного бухгалтера и руководителя" &&
        currentManagement.fullName === cert.userName)
    ) {
      return cert;
    }
    // return users?.some((user) => cert.userId === user.id);
  });

  const getCertificateAccountantAndManagement = certificates.find((cert) => {
    if (
      currentAccountant.fullName === cert.userName &&
      rqstsDataById?.reqType === "Смена главного бухгалтера и руководителя"
    ) {
      return cert;
    }
  });

  console.log(getCertificateAccountantAndManagement);

  // Данные для типа заявки "Смена сертификата", если заявку подает руководитель, то смена сертификата бухгалтера, а иначе наоборот

  const getCertificateIssuanceType = certificates.find(
    (cert) => cert.userName === rqstsDataById?.fullName
  );

  const getCertificate =
    rqstsDataById?.reqType === "Выдача сертификата" ||
    rqstsDataById?.reqType === "Выдача токена и сертификата"
      ? getCertificateIssuanceType
      : getCertificateUser;

  const statusCertificate = statusOfCertificates.find(
    (e) => e.code === getCertificate?.statusCode
  );

  // Мутация для обновления сертификата
  const certificateMutation = useMutation({
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

  const putRqstsByIdMutation = useMutation(
    {
      mutationFn: (data: PutRqstsByIdType) => putRqstsById(data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`request-${rqstsDataById?.id}`],
        });
      },
    },
    queryClient
  );

  // Функция для изменения статуса сертификата
  const handleChangeStatus = (code: number) => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, "0")}.${String(
      now.getMonth() + 1
    ).padStart(2, "0")}.${now.getFullYear()} в ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const dateFrom = `${day}.${month}.${year}`;
    const dateTo = `${day}.${month}.${year + 1}`;

    if (rqstsDataById)
      putRqstsByIdMutation.mutate({
        ...rqstsDataById,
        stepTask: rqstsDataById && rqstsDataById.stepTask + 1,
      });

    if (
      rqstsDataById?.reqType === "Смена главного бухгалтера" &&
      getCertificate
    ) {
      certificateMutation.mutate({
        ...getCertificate,
        statusCode: code, // Изменение statusCode с 0 на 5
        dateChange: formattedDate,
      });
    }

    if (rqstsDataById?.reqType === "Смена руководителя" && getCertificate) {
      certificateMutation.mutate({
        ...getCertificate,
        statusCode: code, // Изменение statusCode с 0 на 5
        dateChange: formattedDate,
      });
    }

    if (
      (rqstsDataById?.reqType === "Выдача сертификата" && getCertificate) ||
      (rqstsDataById?.reqType === "Выдача токена и сертификата" &&
        getCertificate)
    ) {
      certificateMutation.mutate({
        ...getCertificate,
        validFrom: dateFrom,
        validTo: dateTo,
        dateChange: formattedDate,
      });
    }
  };

  const activeButtonIssuanceCertificateType =
    (rqstsDataById?.stepTask > 0 &&
      rqstsDataById?.reqType === "Выдача сертификата") ||
    (rqstsDataById?.stepTask > 0 &&
      rqstsDataById?.reqType === "Выдача токена и сертификата");

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
          getCertificateUser={getCertificate}
          statusCertificate={statusCertificate?.name}
          rqstsDataById={rqstsDataById}
        />
        {rqstsDataById?.reqType ===
          "Смена главного бухгалтера и руководителя" && (
          <CertificateCard
            getCertificateUser={getCertificateAccountantAndManagement}
            statusCertificate={statusCertificate?.name}
            rqstsDataById={rqstsDataById}
          />
        )}
        <div className="panel-buttons">
          {getCertificate?.statusCode === 5 && (
            <div className="wrapper-show-executor">
              <p className="show-executor-title">
                Исполнитель: <span>{executor?.fullName}</span>
              </p>
              <p className="show-executor-title">
                Время: <span>{getCertificate?.dateChange}</span>
              </p>
            </div>
          )}
          <div className="panel-executor">
            <ButtonPanelControl
              icon={
                rqstsDataById?.reqType === "Смена главного бухгалтера" ||
                rqstsDataById?.reqType === "Смена руководителя" ? (
                  <GppBadIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                ) : (
                  <GppGoodIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                )
              }
              text={
                rqstsDataById?.reqType === "Смена главного бухгалтера" ||
                rqstsDataById?.reqType === "Смена руководителя"
                  ? "Отозвать"
                  : "Выдать"
              }
              handleShow={handleShow}
              handleSubmit={handleChangeStatus}
              activeSendButton={
                getCertificate?.statusCode === 5 ||
                activeButtonIssuanceCertificateType
                  ? true
                  : false
              }
            />
          </div>
        </div>
      </div>
      {(show && rqstsDataById?.reqType === "Смена главного бухгалтера") ||
        (show && rqstsDataById?.reqType === "Смена руководителя" && (
          <CertificateRevocationModal
            handleShow={handleShow}
            handleChangeStatus={handleChangeStatus}
          />
        ))}
    </>
  );
};

export default CertificateRevocationList;
