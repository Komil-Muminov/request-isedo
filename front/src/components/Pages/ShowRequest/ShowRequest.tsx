import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRqstsById, GetRqstsByIdType } from "../../API/GetRqstsById";
import { queryClient } from "../../../queryClient";
import {
  Button,
  TextField,
  Stepper,
  StepLabel,
  Step,
  Typography,
  IconButton,
} from "@mui/material";
import { Select } from "@radix-ui/themes";
import "../AddRequest/AddRequest.css";
import "@radix-ui/themes/styles.css";
import TableRowRequest from "../../UI/TableRow/TableRowRequest";
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

  const [rqstsData, setRqstsData] = useState<GetRqstsByIdType | null>(null);

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
      setRqstsData(getRqstsByIdQuery.data);
    } else if (getRqstsByIdQuery.status === "error") {
      console.error(getRqstsByIdQuery.error);
    }
  }, [getRqstsByIdQuery]);

  if (getRqstsByIdQuery.status === "pending") {
    return <p>Loading...</p>;
  }

  console.log(rqstsData);

  return (
    <main className="show-content">
      <div className="container">
        <div className="details-steps">
          <div className="title">
            <p>Новая заявка</p>
          </div>
        </div>
        <section className="show-steps">
          <div className="panel-control">
            <ButtonPanelControl
              goBack={navigate}
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
              />
              <ButtonPanelControl
                icon={
                  <UnsubscribeIcon
                    sx={{ fontSize: "18px", fontWeight: "bold" }}
                  />
                }
                text="Отправить на резолюцию"
              />
              <ButtonPanelControl
                icon={
                  <CancelIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                }
                text="Отклонить"
              />
              <ButtonPanelControl
                icon={
                  <DoneIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                }
                text="Завершить"
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
            activeStep={0}
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
                  <p className="step-header">{e.step}</p>
                  <p>{e.initiators}</p>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </section>
        <section className="details-request">
          <div className="title">
            <p>Детали заявки</p>
          </div>
          <div className="form_content">
            <form className="request_form">
              <TextField
                type="text"
                id="orgname"
                className="request_inp"
                value={rqstsData?.orgname || ""}
                label="ФИО"
              />
              <TextField
                type="text"
                className="request_inp"
                label="Должность"
                value={rqstsData?.accountant || ""}
              />
              <TextField
                type="text"
                className="request_inp"
                label="Контанты"
                value={rqstsData?.desc || ""}
              />
            </form>
            <Button variant="contained" sx={{ marginTop: "20px" }}>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front">Отправить</span>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ShowRequest;
