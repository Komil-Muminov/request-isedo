import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import "./ShowRequest.css";
import ButtonPanelControl from "../../UI/ButtonPanelControl/ButtonPanelControl";

import "../../../index.css";
import TitleDocument from "../../UI/TitleDocument/TitleDocument";
import WorkSpace from "../../UI/WorkSpace/WorkSpace";
import { putRqstsById, PutRqstsByIdType } from "../../API/PutRqstById";
import UserOrOrganizationCard from "../../UI/UserOrOrganizationCard/UserOrOrganizationCard";
import CardFileService from "../../UI/CardFileService/CardFileService";
import { fileInfo } from "../../API/Data/Documents/DocumentList";

import CorporateFareIcon from "@mui/icons-material/CorporateFare";

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

  console.log(getRqstsByIdQuery.data, "Check");

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
      console.log(getRqstsByIdQuery.data); // Проверьте, массив это или объект

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

  console.log(getRqstsByIdQuery.data, "===============");

  const handlePutRqstById = () => {
    const updateReqData = {
      ...rqstsDataById,
      stepCode: rqstsDataById && rqstsDataById.stepCode + 1,
    };
    putRqstsByIdMutation.mutate(updateReqData);
  };

  if (getRqstsByIdQuery.status === "pending") {
    return <p>Loading...</p>;
  }

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
                />
              )}

              <ButtonPanelControl
                icon={
                  <CancelIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                }
                text="Отклонить"
                activeSendButton={false}
              />
              <ButtonPanelControl
                icon={
                  <DoneIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                }
                text="Завершить"
                activeSendButton={true}
              />
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
            activeStep={rqstsDataById?.stepCode}
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
                  <p>{e.initiators}</p>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </section>
        <section className="old-accountant">
          <TitleDocument title="Нынешний главный бухгалтер" />
          <div className="wrapper-cards">
            <UserOrOrganizationCard
              uinfo={uinfo}
              title="Карточка пользователя"
              fileService={
                <CardFileService
                  item={fileInfo[0]}
                  rqstsDataById={rqstsDataById}
                />
              }
            />
            <UserOrOrganizationCard
              CorporateFareIcon={CorporateFareIcon}
              title="Карточка организации"
            />
          </div>
        </section>
        <section className="new-accountant">
          <TitleDocument title="Новый главный бухгалтер" />
          <div className="wrapper-cards">
            <UserOrOrganizationCard
              uinfo={rqstsDataById}
              title="Карточка пользователя"
              fileService={
                <>
                  <CardFileService
                    item={fileInfo[1]}
                    rqstsDataById={rqstsDataById}
                  />
                  <CardFileService
                    item={fileInfo[2]}
                    rqstsDataById={rqstsDataById}
                  />
                </>
              }
            />
            <UserOrOrganizationCard
              CorporateFareIcon={CorporateFareIcon}
              title="Карточка организации"
            />
          </div>
        </section>

        {/* Рабочее пространство */}
        {uinfo?.uType !== "bo" && <WorkSpace />}
      </div>
    </main>
  );
};

export default ShowRequest;
