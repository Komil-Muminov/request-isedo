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
import Select from "@mui/material/Select";
import {
  getOrganizations,
  TGetOrganizations,
} from "../../API/GetOrganizations";
import { getUsers, TGetUsers } from "../../API/GetUsers";
import FileService from "../../UI/File Services/FileService";
import ChangeChiefAccountant from "./Types of Requests/Change of chief accountant/ChangeChiefAccountant";
import ChangeManagement from "./Types of Requests/Change of management/ChangeManagement";
import TokenIssuance from "./Types of Requests/Token issuance/TokenIssuance";
// import { toast, ToastContainer } from "react-toastify";

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
      loginImof: "",
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
        // navigate(`/requests/show/${createdRequestId}`);
      },
    },
    queryClient
  );

  interface FileType {
    fileName: string;
  }

  const [files, setFiles] = useState<FileType[]>([]);

  const handleGetFile = (file: File) => {
    const sizeInBytes = file.size; // Размер в байтах
    const sizeInKB = (sizeInBytes / 1024).toFixed(2); // Преобразуем в КБ (строка)
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2); // Преобразуем в МБ (строка)

    // Преобразуем строки с числами в числа для сравнения
    const fileSize =
      parseFloat(sizeInKB) < 1000 ? `${sizeInKB} КБ` : `${sizeInMB} МБ`;

    const fileName = file.name.split(".")[0];

    const fileType = file.type.split("/")[1]; // Например, "pdf" из "application/pdf"

    const newFile = {
      id: new Date().getTime(),
      fileName: `${fileName}.`,
      size: fileSize,
      type: fileType,
    };

    if (newFile.fileName) {
      setFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const activeSendButton = uinfo?.uType === "bo" && postRqstsMutation.isSuccess;

  const [showTypeRequest, setShowTypeRequest] = useState<boolean>(true);

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

  // Данные карточки нынешнего главного бухгалтера
  const currentAccountant = users?.find(
    (user) =>
      uinfo?.orgName === user.orgName &&
      user.role === "Главный бухгалтер" &&
      user.status === true
  );

  // Данные карточки пользователя
  const currentUser = users?.find((user) => user.username === uinfo?.username);

  console.log(currentUser);

  // Данные карточки организации
  const currentOrganization = organizations?.find((org) => {
    return org.userIds.find((userId) => userId === uinfo?.userId);
  });

  console.log(files);

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

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, "0")}.${String(
      now.getMonth() + 1
    ).padStart(2, "0")}.${now.getFullYear()} в ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const updateReqData = {
      ...data,
      stepCode: stepFound?.stepCode || 0,
      stepTask: 0,
      dateTime: date,
      files: files,
      userId: uinfo?.userId,
      organizationId: currentOrganization?.id,
      services: [],
      dataChange: formattedDate,
    };

    const reqTypeDataTokenIssuance = {
      fullName: currentUser?.fullName,
      tax: currentUser?.tax,
      phone: currentUser?.phone,
      email: currentUser?.email,
      passport: currentUser?.passport,
      role: currentUser?.role,
      reqType: reqType,
      password: "123",
      stepCode: stepFound?.stepCode || 0,
      stepTask: 0,
      dateTime: date,
      files: files,
      userId: uinfo?.userId,
      organizationId: currentOrganization?.id,
      services: [],
      dataChange: formattedDate,
    };

    switch (reqType) {
      case "Смена главного бухгалтера":
        postRqstsMutation.mutate(updateReqData);
        break;
      case "Выдача токена":
        postRqstsMutation.mutate(reqTypeDataTokenIssuance);
    }

    alert(
      `Новый главных бухгалтер ${data?.fullName} не найден в системе, можете продолжить заявку.`
    );

    navigate(`/requests`);
  };

  const [fileUploadedStatus, setFileUploadedStatus] = useState<boolean>(false);

  const handleFileUploadedStatus = (state: boolean) => {
    setFileUploadedStatus(state);
  };

  const secondFileStatus = files.some((e) => e.fileName === fileInfo[1]?.name);
  const thirdFileStatus = files.some((e) => e.fileName === fileInfo[2]?.name);

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
                text="Сохранить"
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
                  {/* <p>{e.initiators}</p> */}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        {/* Детали заявки */}
        {reqType === "Смена главного бухгалтера" && (
          <ChangeChiefAccountant
            currentUser={currentAccountant}
            handleGetFile={handleGetFile}
            fileInfo={fileInfo}
            handleFileUploadedStatus={handleFileUploadedStatus}
            files={files}
            fileUploadedStatus={fileUploadedStatus}
            currentOrganization={currentOrganization}
            secondFileStatus={secondFileStatus}
            thirdFileStatus={thirdFileStatus}
            register={register}
          />
        )}
        {reqType === "Смена руководителя" && (
          <ChangeManagement
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
        )}
        {reqType === "Смена главного бухгалтера и руководителя" && (
          <ChangeManagement
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
        )}
        {reqType === "Выдача токена и сертификата" && (
          <ChangeManagement
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
        )}
        {reqType === "Выдача токена" && (
          <TokenIssuance
            currentUser={currentUser}
            currentOrganization={currentOrganization}
          />
        )}
        {reqType === "Выдача сертификата" && (
          <ChangeManagement
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
        )}
        {reqType === "Смена пароля" && (
          <ChangeManagement
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
        )}
        {reqType === "Создание ИНН в TFMIS" && (
          <ChangeManagement
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
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
