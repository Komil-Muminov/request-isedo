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
import WorkSpace from "../../UI/WorkSpace/WorkSpace";
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

  // Данные карточки пользователя
  const currentUser = users?.find((user) => {
    return organizations?.find((org) => {
      return org.userIds.find((userId) => userId === user.id);
    });
  });

  // Данные карточки организации
  const currentOrganization = organizations?.find(
    (e) => e.id === rqstsDataById?.organizationId
  );

  // Это условие не корректная, необходимо убедится что userIds существует новый бухгалтер, а не заявитель
  const disabledAddUserButton = currentOrganization?.userIds.includes(
    rqstsDataById?.userId
  );

  if (getRqstsByIdQuery.status === "pending") {
    return <p>Loading...</p>;
  }

  const newLoginTfmis = users?.find((e) => {
    if (e.status === true && e.role === "Главный бухгалтер")
      return currentOrganization?.userIds.includes(e.id);
  });

  console.log(newLoginTfmis);

  return (
    <main className="show-content">
      <div className="container">
        <div className="details-steps">
          <TitleDocument title={`Заявка №${rqstsDataById?.id}`} />
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
            activeStep={
              rqstsDataById?.stepCode === 3
                ? rqstsDataById?.stepCode + 1
                : rqstsDataById?.stepCode
            }
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
                          {idx !== e.stages.length - 1 && " | "}
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
        <section className="old-accountant">
          <TitleDocument title="Нынешний главный бухгалтер" />
          <div className="wrapper-cards">
            <UserOrOrganizationCard
              currentUser={currentUser}
              title="Карточка пользователя"
              PDFViewerService={<PDFViewerService item={fileInfo[0]} />}
              // fileService={
              //   <CardFileService
              //     item={fileInfo[0]}
              //     rqstsDataById={rqstsDataById}
              //   />
              // }
            />
            <UserOrOrganizationCard
              currentOrganization={currentOrganization}
              title="Карточка организации"
            />
          </div>
        </section>
        <section className="new-accountant">
          <TitleDocument title="Новый главный бухгалтер" />
          <div className="wrapper-cards">
            <UserOrOrganizationCard
              currentUser={rqstsDataById}
              userType={uinfo?.uType}
              title="Карточка пользователя"
              PDFViewerService={
                <div className="wrapper-new-user-files">
                  <PDFViewerService
                    currentFiles={rqstsDataById?.files}
                    hideFirstItem={true}
                  />
                </div>
              }
              checkUser={
                <div className="panel-check-user">
                  <ButtonPanelControl
                    icon={
                      <PersonSearchIcon
                        sx={{ fontSize: "18px", fontWeight: "bold" }}
                      />
                    }
                    text="Проверить заявку"
                    activeSendButton={disabledAddUserButton}
                  />
                </div>
              }
            />
            <UserOrOrganizationCard
              currentOrganization={currentOrganization}
              title="Карточка организации"
            />
          </div>
        </section>
        {rqstsDataById?.stepCode === 3 && uinfo?.uType === "bo" && (
          <section className="access-system">
            <TitleDocument title="Доступ в систему" />
            <div className="wrapper-cards">
              <div className="file-list">
                <PDFViewerService title="Логин TFMIS" />
                <PDFViewerService title="Логин VPN" />
                <PDFViewerService title="Счет-фактура" />
              </div>
            </div>
          </section>
        )}

        {/* Рабочее пространство */}
        {uinfo?.uType !== "bo" && (
          <WorkSpace
            currentUser={currentUser}
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
          />
        )}
      </div>
    </main>
  );
};

export default ShowRequest;
