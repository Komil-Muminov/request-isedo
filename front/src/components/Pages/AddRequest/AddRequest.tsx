import "./AddRequest.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, StepLabel, Step, TextField } from "@mui/material";

// Хук из библиотеки react-hook-form для управления состоянием формы.
import { useForm } from "react-hook-form";
import { PostRqstScheme, postRequest } from "../../API/PostRqsts";
import { stepsOfKvd, stepsOfBo } from "../../API/Data/Steps/Steps";

// RTQ
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { fileInfo } from "../../API/Data/Documents/DocumentList";

import "@radix-ui/themes/styles.css";
import { GetMeType, useAuth } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader/Loader";
import ButtonPanelControl from "../../UI/ButtonPanelControl/ButtonPanelControl";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import TitleDocument from "../../UI/TitleDocument/TitleDocument";
import TypeRequest from "../../UI/TypeRequest/TypeRequest";

import AssignmentIcon from "@mui/icons-material/Assignment";

import UserOrOrganizationCard from "../../UI/UserOrOrganizationCard/UserOrOrganizationCard";

import CardFileService from "../../UI/CardFileService/CardFileService";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  getOrganizations,
  TGetOrganizations,
} from "../../API/GetOrganizations";
import { getUsers, TGetUsers } from "../../API/GetUsers";

const AddRequest: React.FC = () => {
  // Состояние текущего активного шага в индикаторе.

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

  const {
    register,
    // Записывает все стейты в массив
    handleSubmit,
    // Функция dirtyFields возвращает true или false в зависимости от того, было ли изменено поле "Название организации".
    // Поле для бухгалтера становится доступным только если поле "Название организации" было изменено.
    watch,
    setValue,
    getValues,
    formState: { dirtyFields },
  } = useForm<PostRqstScheme>({
    defaultValues: {
      fullName: "",
      tax: "",
      phone: "",
      email: "",
      passport: "",
      role: "",
      token: "",
      reqType: "Смена главного бухгалтера",
      dateTime: "",
      password: "123",
    },
  });

  // useEffect(() => {
  //   if (uQuery.status === "success" && uinfo) {
  //     setValue("fullName", uinfo.fullName || "");
  //     setValue("role", uinfo.role || "");
  //     setValue("phone", uinfo.phone || "");
  //     setValue("email", uinfo.email || "");
  //     setValue("tax", uinfo.tax || "");
  //   }
  // }, [uQuery.status, uinfo]);

  // Функция для отслеживания изменений значений в реальном времени.
  const reqType = watch("reqType");

  const postRqstsMutation = useMutation(
    {
      mutationFn: (data: PostRqstScheme) => postRequest(data),
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["requests"] });
        // const createdRequestId = response.requestData.id;
        // navigate(`/account/show/${createdRequestId}`);
      },
    },
    queryClient
  );

  interface FileType {
    number: number;
    fileName: string;
  }

  const [files, setFiles] = useState<FileType[]>([]);

  const [getFile, setGetFile] = useState({ number: 0, fileName: "" });

  const handleGetFile = (
    id: number,
    file: File | null,
    executorFile: number
  ) => {
    const newFile = {
      number: id,
      fileName: file ? file.name : "",
      userId: executorFile,
    };

    setGetFile(newFile);

    if (newFile.fileName) {
      setFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const activeSendButton = uinfo?.uType === "bo" && postRqstsMutation.isSuccess;

  const [showTypeRequest, setShowTypeRequest] = useState<boolean>(false);

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

  // Данные карточки пользователя
  const currentUser = users?.find((user) => {
    return organizations?.find((org) => {
      return org.userIds.find((userId) => userId === user.id);
    });
  });

  // Данные карточки организации
  const currentOrganization = organizations?.find((org) => {
    return org.userIds.find((userId) => userId === uinfo?.userId);
  });

  // Увеличивает номер текущего шага на 1.
  const onSubmit = (data: PostRqstScheme) => {
    const stepFound = steps.find((e) => e.stepCode === 0);

    const getDate = new Date();

    const day = String(getDate.getDate()).padStart(2, "0");
    const month = String(getDate.getMonth() + 1).padStart(2, "0");
    const year = getDate.getFullYear();
    const hours = String(getDate.getHours()).padStart(2, "0");
    const minutes = String(getDate.getMinutes()).padStart(2, "0");

    const date = `${day}.${month}.${year}.${hours}:${minutes}`;

    const updateReqData = {
      ...data,
      stepCode: stepFound?.stepCode || 0,
      stepTask: 0,
      dateTime: date,
      files: files,
      userId: uinfo?.userId,
      organizationId: currentOrganization?.id,
    };

    postRqstsMutation.mutate(updateReqData);
  };



  return (
    <section className="add-content">
      <div className="container">
        <div className="details-steps">
          <TitleDocument title="Новая заявка" />
        </div>
        <div className="addRequest__content">
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
                  <AssignmentIcon
                    sx={{ fontSize: "18px", fontWeight: "bold" }}
                  />
                }
                text="Выбрать тип заявки"
                setShowTypeRequest={setShowTypeRequest}
              />
              {/* <ButtonPanelControl
                icon={
                  <SaveIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                }
                text="Сохранить"
                handleSubmit={handleSubmit(onSubmit)}
                activeSendButton={activeSendButton}
              /> */}
              <ButtonPanelControl
                icon={
                  <UnsubscribeIcon
                    sx={{ fontSize: "18px", fontWeight: "bold" }}
                  />
                }
                text="Подписать"
                handleSubmit={handleSubmit(onSubmit)}
                activeSendButton={activeSendButton}
              />
              {uinfo?.uType === "kvd" && (
                <ButtonPanelControl
                  icon={
                    <CancelIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
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
        {/* Детали заявки */}
        {reqType === "Смена главного бухгалтера" && (
          <>
            <section className="old-accountant">
              <TitleDocument title="Нынешний главный бухгалтер" />
              <div className="wrapper-cards">
                <UserOrOrganizationCard
                  currentUser={currentUser}
                  title="Карточка пользователя"
                  fileService={
                    <CardFileService
                      item={fileInfo[0]}
                      handleGetFile={handleGetFile}
                      getFile={getFile}
                    />
                  }
                />
                <UserOrOrganizationCard
                  currentOrganization={currentOrganization}
                  title="Карточка организации"
                />
              </div>
            </section>
            <section className="new-accountant">
              <TitleDocument title="Новый главный бухгалтер" />
              <div className="wrapper-cards wrapper-cards-padding">
                <div className="inputs-list">
                  <TextField
                    {...register("fullName")}
                    type="text"
                    id="fullName"
                    className="request_inp"
                    // KM
                    label="ФИО"
                  />
                  <TextField
                    {...register("tax")}
                    id="tax"
                    type="text"
                    className="request_inp"
                    label="ИНН"
                  />
                  <TextField
                    {...register("phone")}
                    id="phone"
                    type="text"
                    className="request_inp"
                    label="Номер телефона"
                  />
                  <TextField
                    {...register("email")}
                    id="email"
                    type="text"
                    className="request_inp"
                    label="E-mail адрес"
                  />
                  <TextField
                    {...register("passport")}
                    id="passport"
                    type="text"
                    className="request_inp"
                    label="Серия и номер паспорта"
                  />
                  <TextField
                    {...register("role")}
                    id="role"
                    type="text"
                    className="request_inp"
                    label="Должность"
                  />
                  {/* test commit  */}
                  <Box className="request_inp" sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Наличие токена
                      </InputLabel>
                      <Select
                        {...register("token")}
                        labelId="demo-simple-select-label"
                        id="token"
                        label="token"
                      >
                        <MenuItem value="Есть">Есть</MenuItem>
                        <MenuItem value="Нет">Нет</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <CardFileService
                    item={fileInfo[1]}
                    handleGetFile={handleGetFile}
                    getFile={getFile}
                    // size="wrapper-file-width"
                  />
                  <CardFileService
                    item={fileInfo[2]}
                    handleGetFile={handleGetFile}
                    getFile={getFile}
                    // size="wrapper-file-width"
                  />
                </div>
              </div>
            </section>
          </>
        )}
        {reqType === "Смена руководителя" && (
          <section className="details-request">
            <TitleDocument title="Требуемые документы" />
            <div className="form_content">
              <form className="request_form" onSubmit={handleSubmit(onSubmit)}>
                <div className="inputs-list">
                  <TextField
                    {...register("fullName")}
                    type="text"
                    id="fullName"
                    className="request_inp"
                    // KM
                    placeholder="ФИО"
                  />
                  <TextField
                    {...register("role")}
                    id="role"
                    type="text"
                    className="request_inp"
                    placeholder="Должность"
                    disabled={!dirtyFields.role}
                  />
                  <TextField
                    {...register("phone")}
                    id="phone"
                    type="text"
                    className="request_inp"
                    placeholder="Номер телефона"
                    disabled={!dirtyFields.phone}
                  />
                </div>
              </form>
            </div>
          </section>
        )}
      </div>

      {showTypeRequest && (
        <TypeRequest
          setReqType={(value: any) => setValue("reqType", value)}
          setShowTypeRequest={setShowTypeRequest}
          reqType={reqType}
        />
      )}
    </section>
  );
};

export default AddRequest;
