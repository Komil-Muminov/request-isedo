import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRqstsById, GetRqstsByIdType } from "../../API/GetRqstsById";
import { queryClient } from "../../../queryClient";
import { Stepper, StepLabel, Step } from "@mui/material";
import "../AddRequest/AddRequest.css";
import "@radix-ui/themes/styles.css";
import { GetMeType, useAuth } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader/Loader";
import { stepsOfKvd, stepsOfBo } from "../../API/Data/Steps/Steps";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DomainAddIcon from "@mui/icons-material/DomainAdd";

import "./ShowRequest.css";

import "../../../index.css";
import TitleDocument from "../../UI/TitleDocument/TitleDocument";
import { putRqstsById, PutRqstsByIdType } from "../../API/PutRqstById";
import UserOrOrganizationCard from "../../UI/UserOrOrganizationCard/UserOrOrganizationCard";
import CardFileService from "../../UI/CardFileService/CardFileService";
import { fileInfo } from "../../API/Data/Documents/DocumentList";

import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import {
  getOrganizations,
  TGetOrganizations,
} from "../../API/GetOrganizations";
import { getUsers, TGetUsers } from "../../API/GetUsers";
import ButtonPanelControl from "../../UI/ButtonPanelControl/ButtonPanelControl";
import {
  addUserOrganization,
  putOrganizationUser,
} from "../../API/PutOrganizationUser";
import FileService from "../../UI/File Services/FileService";
import PDFViewerService from "../../UI/PDF Viewer Service/PDFViewerService";
import { postRequestFile } from "../../API/postRequestFile";
import ShowChangeChiefAccountant from "./Show Types Of Request/Show Change of chief accountant/ShowChangeChiefAccountant";
import ShowTokenIssuance from "./Show Types Of Request/Show Token issuance/ShowTokenIssuance";
import ShowCertificateIssuance from "./Show Types Of Request/Show Certificate issuance/ShowCertificateIssuance";
import ShowChangeManagement from "./Show Types Of Request/Show Change of management/ShowChangeManagement";
import ShowTokenCertificateIssuance from "./Show Types Of Request/Show Issuance Of Token and Certificate/ShowTokenCertificateIssuance";
import ShowChangePassword from "./Show Types Of Request/Show Change password/ShowChangePassword";
import ShowChangeChiefAccountantAndManagement from "./Show Types Of Request/Show Change of Chief accountant and Management/ShowChangeChiefAccountantAndManagement";

const ShowRequest = () => {
  const navigate = useNavigate();

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

  const { getMe } = useAuth();
  const uQuery = useQuery(
    {
      queryFn: () => getMe(),
      queryKey: ["users", "me"],
    },
    queryClient
  );

  const [uinfo, setUinfo] = useState<GetMeType | null>(null);
  // const [expanded, setExpanded] = useState<number | false>(false);

  useEffect(() => {
    if (uQuery.status === "success") {
      setUinfo(uQuery.data);
    }
  }, [uQuery.status, uQuery.data]);

  if (uQuery.status === "pending") return <Loader />;
  if (uQuery.status === "error") {
    console.log(uQuery.error);
    return null;
  }

  const steps =
    uinfo?.uType === "kvd"
      ? stepsOfKvd
      : uinfo?.uType === "bo"
      ? stepsOfBo
      : [];

  useEffect(() => {
    if (getRqstsByIdQuery.status === "success") {
      setRqstsDataById(getRqstsByIdQuery.data);
    } else if (getRqstsByIdQuery.status === "error") {
      console.error(getRqstsByIdQuery.error);
    }
  }, [getRqstsByIdQuery]);

  const putRqstsByIdMutation = useMutation(
    {
      mutationFn: (data: PutRqstsByIdType) => putRqstsById(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`request-${numericId}`] });
      },
    },
    queryClient
  );

  const handlePutRqstById = () => {
    const updateReqData = {
      ...rqstsDataById,
      stepCode: rqstsDataById && rqstsDataById.stepCode + 1,
      stepTask: rqstsDataById && rqstsDataById.stepTask,
    };
    putRqstsByIdMutation.mutate(updateReqData);
  };

  const handleCheckRequest = () => {
    const update = {
      ...rqstsDataById,
      status: true,
    };
    putRqstsByIdMutation.mutate(update);
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

  const [organizations, setOrganizations] = useState<
    TGetOrganizations[] | null
  >(null);

  const getOrganizationsQuery = useQuery(
    {
      queryFn: () => getOrganizations(),
      queryKey: ["organizations"],
    },
    queryClient
  );

  useEffect(() => {
    if (getOrganizationsQuery.status === "success") {
      setOrganizations(getOrganizationsQuery.data);
    }
  }, [getOrganizationsQuery]);

  // FILES SERVICE

  const postFileMutation = useMutation(
    {
      mutationFn: (data: PutRqstsByIdType) => postRequestFile(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["request", requestId] });
      },
    },
    queryClient
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      postFileMutation.mutate(formData);
    }
  };

  // Данные карточки организации
  const currentOrganization = organizations?.find(
    (e) => e.id === rqstsDataById?.organizationId
  );

  // Данные карточки нынешнего главного бухгалтера

  const currentAccountant = users?.find((user) => {
    if (currentOrganization)
      return (
        currentOrganization.userIds.includes(user.id) &&
        user.role === "Главный бухгалтер"
      );
  });

  // Данные карточки нынешнего руководителя

  const currentManagement = users?.find((user) => {
    if (currentOrganization)
      return (
        currentOrganization.userIds.includes(user.id) &&
        user.role === "Руководитель"
      );
  });

  // Данные карточки нынешнего главного бухгалтера который актив
  const currentAccountantActive = users?.find((user) => {
    if (currentOrganization)
      return (
        currentOrganization.userIds.includes(user.id) &&
        user.role === "Главный бухгалтер" &&
        user.status === true
      );
  });

  // Данные карточки нынешнего руководителя который актив
  const currentHeadActive = users?.find((user) => {
    if (currentOrganization)
      return (
        currentOrganization.userIds.includes(user.id) &&
        user.role === "Руководитель" &&
        user.status === true
      );
  });

  const currentPastUsers = users?.filter((e) => {
    if (rqstsDataById?.pastUserIds?.includes(e.id)) {
      return e;
    }
  });

  const currentPastAccountant = currentPastUsers?.find(
    (e) => e.role === "Главный бухгалтер"
  );

  const currentPastManagement = currentPastUsers?.find(
    (e) => e.role === "Руководитель"
  );

  // Данные карточки пользователя в заявке

  const currentUserRequest = users?.find(
    (e) => e.fullName === rqstsDataById?.fullName
  );

  if (getRqstsByIdQuery.status === "pending") {
    return <p>Loading...</p>;
  }

  const newLoginTfmis = users?.find((e) => {
    if (e.status === true && e.role === "Главный бухгалтер")
      return currentOrganization?.userIds.includes(e.id);
  });

  const handleActiveStep = () => {
    if (
      (rqstsDataById?.stepCode === 3 &&
        rqstsDataById?.reqType === "Смена главного бухгалтера") ||
      (rqstsDataById?.stepCode === 3 &&
        rqstsDataById?.reqType === "Смена руководителя") ||
      (rqstsDataById?.stepCode === 3 &&
        rqstsDataById?.reqType === "Смена главного бухгалтера и руководителя")
    ) {
      return rqstsDataById?.stepCode + 1;
    }

    if (
      rqstsDataById?.stepCode === 3 &&
      rqstsDataById?.reqType === "Выдача токена"
    ) {
      return rqstsDataById?.stepCode + 2;
    }

    if (
      rqstsDataById?.stepCode === 3 &&
      rqstsDataById?.reqType === "Выдача сертификата"
    ) {
      return rqstsDataById?.stepCode + 2;
    }

    if (
      rqstsDataById?.stepCode === 3 &&
      rqstsDataById?.reqType === "Выдача токена и сертификата"
    ) {
      return rqstsDataById?.stepCode + 2;
    }

    if (
      rqstsDataById?.stepCode === 3 &&
      rqstsDataById?.reqType === "Смена пароля"
    ) {
      return rqstsDataById?.stepCode + 2;
    }

    return rqstsDataById?.stepCode;
  };

  const issuanceCertificateUser = users?.find((e) =>
    rqstsDataById?.pastUserIds.includes(e.id)
  );

  console.log(issuanceCertificateUser);

  // ======================= WORKSPACE =====================

  return (
    <main className="show-content">
      <div className="container">
        <div className="details-steps">
          <TitleDocument
            title={`Заявка №${rqstsDataById?.id} - ${rqstsDataById?.reqType}`}
          />
        </div>
        <section className="show-steps">
          <div className="panel-control">
            <ButtonPanelControl
              goBack={() => navigate(-1)}
              icon={
                <ArrowBackIosIcon
                  sx={{ fontSize: "18px", fontWeight: "bold" }}
                />
              }
              text="Назад"
            />
            <div className="wrapper-buttons">
              <ButtonPanelControl
                icon={
                  <SaveIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                }
                text="Сохранить"
                activeSendButton={true}
              />
              {uinfo?.uType !== "kvd" && (
                <ButtonPanelControl
                  icon={
                    <UnsubscribeIcon
                      sx={{ fontSize: "18px", fontWeight: "bold" }}
                    />
                  }
                  text="Подписать"
                  handleSubmit={handlePutRqstById}
                  activeSendButton={rqstsDataById?.stepCode >= 1}
                />
              )}
              {uinfo?.uType === "kvd" && (
                <ButtonPanelControl
                  icon={
                    <CancelIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                  }
                  text="Отклонить"
                  activeSendButton={rqstsDataById?.stepCode === 3}
                />
              )}
              {uinfo?.uType === "kvd" && (
                <ButtonPanelControl
                  icon={
                    <DoneIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                  }
                  text="Завершить"
                  activeSendButton={true}
                />
              )}
            </div>
          </div>
          <Stepper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
              width: "100%",
              // Убираем линии между шагами
              "& .MuiStepConnector-root": {
                display: "none",
              },
            }}
            activeStep={handleActiveStep()}
            alternativeLabel
          >
            {steps.map((e, index) => (
              <Step
                key={index}
                sx={{
                  display: "flex",
                  flex: "1",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  "&:first-of-type": {
                    flex: "0 0 auto", // первый шаг фиксированный
                    marginLeft: 0,
                  },
                  "&:last-of-type": {
                    flex: "0 0 auto", // последний шаг фиксированный
                    marginRight: 0,
                  },
                }}
              >
                <StepLabel>
                  <p className="step-header">{e.stepName}</p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {e.stages?.map((stage, idx) => {
                      let color = ""; // по умолчанию цвет не задан

                      if (rqstsDataById?.stepCode === 3) {
                        color = "green"; // если stepCode равен 3, все этапы зелёные
                      } else if (
                        rqstsDataById &&
                        rqstsDataById?.stepTask <= 3
                      ) {
                        color = idx <= 0 ? "green" : "orange"; // если stepTask от 0 до 3 — завершенные зелёные, остальное оранжевое
                      } else if (
                        rqstsDataById &&
                        rqstsDataById?.stepTask >= 4 &&
                        rqstsDataById &&
                        rqstsDataById?.stepTask <= 6
                      ) {
                        color = idx <= 1 ? "green" : "orange"; // stepTask от 4 до 6 — 2 этап
                      } else if (rqstsDataById?.services?.length) {
                        color = "green"; // если services заполнен — все зелёные
                      }

                      return (
                        <p
                          key={idx}
                          style={{
                            color: color,
                            whiteSpace: "pre", // Сохраняем пробелы
                          }}
                        >
                          {stage}
                          {idx !== e.stages.length - 1 && ", "}
                          {/* Убираем | для последнего этапа */}
                        </p>
                      );
                    })}
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </section>
        {rqstsDataById?.reqType === "Смена главного бухгалтера" && (
          <ShowChangeChiefAccountant
            currentUser={currentAccountant}
            fileInfo={fileInfo}
            currentOrganization={currentOrganization}
            rqstsDataById={rqstsDataById}
            uinfo={uinfo}
            handleCheckRequest={handleCheckRequest}
          />
        )}
        {rqstsDataById?.reqType === "Смена руководителя" && (
          <ShowChangeManagement
            currentUser={currentManagement}
            fileInfo={fileInfo}
            currentOrganization={currentOrganization}
            rqstsDataById={rqstsDataById}
            uinfo={uinfo}
            handleCheckRequest={handleCheckRequest}
          />
        )}
        {rqstsDataById?.reqType ===
          "Смена главного бухгалтера и руководителя" && (
          <ShowChangeChiefAccountantAndManagement
            currentAccountant={currentPastAccountant}
            currentManagement={currentPastManagement}
            fileInfo={fileInfo}
            currentOrganization={currentOrganization}
            rqstsDataById={rqstsDataById}
            uinfo={uinfo}
            handleCheckRequest={handleCheckRequest}
          />
        )}
        {rqstsDataById?.reqType === "Выдача токена" && (
          <ShowTokenIssuance
            currentOrganization={currentOrganization}
            rqstsDataById={rqstsDataById}
            uinfo={uinfo}
            handleCheckRequest={handleCheckRequest}
          />
        )}
        {rqstsDataById?.reqType === "Выдача сертификата" && (
          <ShowCertificateIssuance
            currentOrganization={currentOrganization}
            rqstsDataById={rqstsDataById}
            issuanceCertificateUser={issuanceCertificateUser}
            uinfo={uinfo}
            currentUserRequest={currentUserRequest}
            handleCheckRequest={handleCheckRequest}
          />
        )}
        {rqstsDataById?.reqType === "Выдача токена и сертификата" && (
          <ShowTokenCertificateIssuance
            currentOrganization={currentOrganization}
            rqstsDataById={rqstsDataById}
            uinfo={uinfo}
            currentUserRequest={currentUserRequest}
            handleCheckRequest={handleCheckRequest}
          />
        )}
        {rqstsDataById?.reqType === "Смена пароля" && (
          <ShowChangePassword
            currentOrganization={currentOrganization}
            rqstsDataById={rqstsDataById}
            uinfo={uinfo}
            currentUserRequest={currentUserRequest}
            handleCheckRequest={handleCheckRequest}
          />
        )}
        {rqstsDataById && rqstsDataById?.stepCode >= 3 && (
          <section className="access-system">
            <TitleDocument title="Документы услуг" />
            <div className="wrapper-cards wrapper-documents">
              <div className="file-list">
                <PDFViewerService title="Счет-фактура" />
                <PDFViewerService title="Замима" hideFirstItem={true} />
                {/* {rqstsDataById?.stepCode === 3 && uinfo?.uType === "bo" && (
                <>
                  <PDFViewerService title="Логин TFMIS" />
                  <PDFViewerService title="Логин VPN" />
                </>
              )} */}
              </div>
              <h1 style={{ fontSize: "16px" }}>
                Логин и пароль для входа в системы отправлены на электронную
                почту нового главного бухгалтера.
              </h1>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ShowRequest;
