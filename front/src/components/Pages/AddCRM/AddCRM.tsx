import React, { useEffect, useState } from "react";
import "./AddCRM.css";
import TitleDocument from "../../UI/TitleDocument/TitleDocument";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { stepsOfBo, stepsOfKvd } from "../../API/Data/Steps/Steps";
import { Loader } from "../../UI/Loader/Loader";
import { GetMeType, useAuth } from "../../API/Hooks/useAuth";
import { queryClient } from "../../../queryClient";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FileService from "../../UI/File Services/FileService";
import ButtonPanelControl from "../../UI/ButtonPanelControl/ButtonPanelControl";

const AddCRM = () => {
  const navigate = useNavigate();

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

  const steps =
    uinfo?.uType === "kvd"
      ? stepsOfKvd
      : uinfo?.uType === "bo"
      ? stepsOfBo
      : [];

  return (
    <main className="add-content">
      <div className="container">
        <section>
          <div className="details-steps">
            <TitleDocument title="Новая организация" />
          </div>
          <div className="crm-indicator">
            {/* <Stepper>: Компонент для отображения шагового индикатора, который отображает прогресс.
             */}
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
                    <UnsubscribeIcon
                      sx={{ fontSize: "18px", fontWeight: "bold" }}
                    />
                  }
                  text="Сохранить"
                  // handleSubmit={handleSubmit(onSubmit)}
                  // activeSendButton={activeSendButton}
                />
                {uinfo?.uType === "kvd" && (
                  <ButtonPanelControl
                    icon={
                      <CancelIcon
                        sx={{ fontSize: "18px", fontWeight: "bold" }}
                      />
                    }
                    text="Отклонить"
                    activeSendButton={true}
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
              activeStep={steps[0]?.stepCode}
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
          </div>
        </section>
        <section>
          <TitleDocument title="Карточка организации" />
          <div className="wrapper-cards wrapper-cards-padding">
            <div className="inputs-list">
              <TextField
                // {...register("fullName")}
                type="text"
                id="tax"
                className="crm_inp"
                // KM
                label="ИНН"
              />
              <TextField
                // {...register("tax")}
                id="identificator"
                type="text"
                className="crm_inp"
                label="Идентификатор"
              />
              <TextField
                // {...register("phone")}
                id="orgName"
                type="text"
                className="crm_inp"
                label="Название"
              />
              <TextField
                // {...register("email")}
                id="agreementNumber"
                type="text"
                className="crm_inp"
                label="Номер договора"
              />
              <TextField
                // {...register("email")}
                id="agreementDate"
                type="date"
                className="crm_inp"
                label="Дата договора"
                // Нужно убрать value
                value="Этот текст нужно отсюда убрать"
              />
              <TextField
                // {...register("passport")}
                id="address"
                type="text"
                className="crm_inp"
                label="Адресс"
              />
              <Box className="crm_inp" sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Код территории
                  </InputLabel>
                  <Select
                    // {...register("token")}
                    labelId="demo-simple-select-label"
                    id="territoryCode"
                    label="territoryCode"
                  >
                    <MenuItem value="Душанбе">Душанбе</MenuItem>
                    <MenuItem value="Хатлонская область">
                      Хатлонская область
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="crm_inp" sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Единица учета
                  </InputLabel>
                  <Select
                    // {...register("token")}
                    labelId="demo-simple-select-label"
                    id="unitAccount"
                    label="unitAccount"
                  >
                    <MenuItem value="100-Сарраёсати хазинадории марказии ҶТ">
                      100-Сарраёсати хазинадории марказии ҶТ
                    </MenuItem>
                    <MenuItem value="101-шаҳри Душанбе">
                      101-шаҳри Душанбе
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="crm_inp" sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ГРБС (Ответственный)
                  </InputLabel>
                  <Select
                    // {...register("token")}
                    labelId="demo-simple-select-label"
                    id="grbsResponsible"
                    label="grbsResponsible"
                  >
                    <MenuItem value="19319">19319</MenuItem>
                    <MenuItem value="19320">19320</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="crm_inp" sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">ГРБС</InputLabel>
                  <Select
                    // {...register("token")}
                    labelId="demo-simple-select-label"
                    id="grbs"
                    label="grbs"
                  >
                    <MenuItem value="114-114-Вазорати молияи Ҷумҳурии Тоҷикистон">
                      114-114-Вазорати молияи Ҷумҳурии Тоҷикистон
                    </MenuItem>
                    <MenuItem value="110-110-Вазорати корҳои хориҷии Ҷумҳурии Тоҷикистон">
                      110-110-Вазорати корҳои хориҷии Ҷумҳурии Тоҷикистон
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="crm_inp" sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">ПБС</InputLabel>
                  <Select
                    // {...register("token")}
                    labelId="demo-simple-select-label"
                    id="pbs"
                    label="pbs"
                  >
                    <MenuItem value="10801012-10801012-Шуъбаи корҳои дохилии ноҳияи Тоҷикобод">
                      10801012-10801012-Шуъбаи корҳои дохилии ноҳияи Тоҷикобод
                    </MenuItem>
                    <MenuItem value="11403010-11403010-Раёсати молияи ноҳияи Восеъ">
                      11403010-11403010-Раёсати молияи ноҳияи Восеъ
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="crm_inp" sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">БЗ</InputLabel>
                  <Select
                    // {...register("token")}
                    labelId="demo-simple-select-label"
                    id="bz"
                    label="bz"
                  >
                    <MenuItem value="63037">63037</MenuItem>
                    <MenuItem value="72945">72945</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="crm_inp" sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Реквизиты
                  </InputLabel>
                  <Select
                    // {...register("token")}
                    labelId="demo-simple-select-label"
                    id="bz"
                    label="bz"
                  >
                    <MenuItem value="63037">22000444468043800</MenuItem>
                    <MenuItem value="72945">22000444463064488</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <FileService />
              {/* <ul className="required-documents">
                  <p>Необходимые документы:</p>
                  <li>
                    {secondFileStatus ? (
                      <CheckCircleOutlineIcon sx={{ color: "green" }} />
                    ) : (
                      <HighlightOffIcon sx={{ color: "red" }} />
                    )}
                    <p>{fileInfo[1]?.name}</p>
                  </li>
                  <li>
                    {thirdFileStatus ? (
                      <CheckCircleOutlineIcon sx={{ color: "green" }} />
                    ) : (
                      <HighlightOffIcon sx={{ color: "red" }} />
                    )}
                    <p>{fileInfo[2]?.name}</p>
                  </li>
                </ul> */}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AddCRM;
