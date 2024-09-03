import "./AddRequest.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, StepLabel, Step, TextField, Button } from "@mui/material";

// Хук из библиотеки react-hook-form для управления состоянием формы.
import { useForm, Controller } from "react-hook-form";
import { PostRqstScheme, postRequest } from "../../API/PostRqsts";
import { stepsOfKvd, stepsOfBo } from "../../API/Data/Steps/Steps";

// RTQ
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { fileInfo } from "../../API/Data/Documents/DocumentList";

import "@radix-ui/themes/styles.css";
import { Select } from "@radix-ui/themes";
import TableRowRequest from "../../UI/TableRow/TableRowRequest";
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
    control,
    register,
    // Записывает все стейты в массив
    handleSubmit,
    // Функция dirtyFields возвращает true или false в зависимости от того, было ли изменено поле "Название организации".
    // Поле для бухгалтера становится доступным только если поле "Название организации" было изменено.
    watch,
    setValue,

    formState: { dirtyFields },
  } = useForm<PostRqstScheme>({
    defaultValues: {
      fullName: "",
      role: "",
      phone: "",
      email: "",
      tax: "",
      orgTax: "",
      orgName: "",
      reqType: "Смена главного бухгалтера",
      dateTime: "",
    },
  });

  useEffect(() => {
    if (uQuery.status === "success" && uinfo) {
      setValue("fullName", uinfo.fullName || "");
      setValue("role", uinfo.role || "");
      setValue("phone", uinfo.phone || "");
      setValue("email", uinfo.email || "");
      setValue("tax", uinfo.tax || "");
      setValue("orgTax", uinfo.orgTax || "");
      setValue("orgName", uinfo.orgName || "");
    }
  }, [uQuery.status, uinfo]);

  // Функция для отслеживания изменений значений в реальном времени.
  const reqType = watch("reqType");

  const postRqstsMutation = useMutation(
    {
      mutationFn: (data: PostRqstScheme) => postRequest(data),
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["requests"] });
        const createdRequestId = response.requestData.id;
        navigate(`/account/show/${createdRequestId}`);
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

  const handleGetFile = (id: number, file: File | null) => {
    const newFile = { number: id, fileName: file ? file.name : "" };

    setGetFile(newFile);

    if (newFile.fileName) {
      setFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  console.log(files);

  // Увеличивает номер текущего шага на 1.
  const onSubmit = (data: PostRqstScheme) => {
    console.log(data);

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
      dateTime: date,
      files: files,
    };

    console.log(updateReqData);

    postRqstsMutation.mutate(updateReqData);
  };

  const activeSendButton = uinfo?.uType === "bo" && postRqstsMutation.isSuccess;

  console.log(steps);

  console.log(reqType);

  const [showTypeRequest, setShowTypeRequest] = useState<boolean>(false);

  console.log(uinfo);

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
                  <SaveIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                }
                text="Сохранить"
                handleSubmit={handleSubmit(onSubmit)}
                activeSendButton={activeSendButton}
              />
              <ButtonPanelControl
                icon={
                  <UnsubscribeIcon
                    sx={{ fontSize: "18px", fontWeight: "bold" }}
                  />
                }
                text="Подписать"
              />
              <ButtonPanelControl
                icon={
                  <CancelIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
                }
                text="Отклонить"
                activeSendButton={true}
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
        <section className="old-accountant">
          <TitleDocument title="Предыдущий бухгалтер" />
          <div className="info-accountant">
            <div className="wrapper-info">
              <div className="wrapper-image">
                <img src={`http://localhost:3000${uinfo?.photo}`} alt="" />
              </div>
              <div className="wrapper-text">
                <h2>Шарипов Амир</h2>
                <p>
                  <span>ИНН:</span> 250001455
                </p>
                <p>
                  <span>Номер телефона:</span> 88-000-86-71
                </p>
                <p>
                  <span>E-mail адрес:</span> jsharipovamir@gmail.com
                </p>
                <p>
                  <span>Паспорт:</span> A0644063
                </p>
              </div>
            </div>
            <div className="info-organization">
              <Button
                sx={{
                  borderRadius: "50px",
                  display: "flex",
                  gap: "5px",
                  backgroundColor: "#607d8b",
                  "&:hover": {
                    backgroundColor: "#516874",
                  },
                }}
                variant="contained"
              >
                Подробнее
              </Button>
            </div>
          </div>
        </section>
        <section className="details-request">
          <TitleDocument title="Детали заявки" />
          <div className="form_content">
            <form className="request_form" onSubmit={handleSubmit(onSubmit)}>
              <Button
                sx={{
                  borderRadius: "50px",
                  display: "flex",
                  gap: "5px",
                  backgroundColor: "#607d8b",
                  "&:hover": {
                    backgroundColor: "#516874",
                  },
                }}
                variant="contained"
                onClick={() => setShowTypeRequest(true)}
              >
                Выбрать тип заявки
              </Button>
              {/* <Controller
                name="reqType"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger color="gray" />
                    <Select.Content color="gray" variant="solid" highContrast>
                      <Select.Item value="Выберите тип заявки">
                        Выберите тип заявки
                      </Select.Item>
                      <Select.Item value="Смена главного бухгалтера">
                        Смена главного бухгалтера
                      </Select.Item>
                      <Select.Item value="Смена руководителя">
                        Смена руководителя
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                )}
              /> */}
              {reqType === "Смена главного бухгалтера" && (
                <>
                  <div className="inputs-list">
                    <TextField
                      {...register("fullName")}
                      id="fullName"
                      type="text"
                      className="request_inp"
                      label="ФИО"
                    />
                    <TextField
                      {...register("role")}
                      id="role"
                      type="text"
                      className="request_inp"
                      label="Должность"
                    />
                    <TextField
                      {...register("phone")}
                      id="phone"
                      type="text"
                      className="request_inp"
                      label="Номер телефона"
                    />
                    {/* =============== Добавить в базу requests =============== */}
                    <TextField
                      {...register("email")}
                      id="email"
                      type="text"
                      className="request_inp"
                      label="E-mail адрес"
                    />
                    <TextField
                      {...register("tax")}
                      id="tax"
                      type="text"
                      className="request_inp"
                      label="ИНН"
                    />
                    <TextField
                      {...register("orgTax")}
                      id="orgTax"
                      type="text"
                      className="request_inp"
                      label="ИНН"
                    />
                    <TextField
                      {...register("orgName")}
                      id="orgName"
                      type="text"
                      className="request_inp"
                      label="Организация"
                    />
                  </div>

                  <div className="wrapper-table">
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Файл</th>
                          <th>Тип документа</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fileInfo.map((e) => {
                          return (
                            <TableRowRequest
                              key={e.id}
                              item={e}
                              handleGetFile={handleGetFile}
                              getFile={getFile}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              {reqType === "Смена руководителя" && (
                <>
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
                    <TextField
                      {...register("orgName")}
                      id="orgName"
                      type="text"
                      className="request_inp"
                      placeholder="Организация"
                      disabled={!dirtyFields.orgName}
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </section>
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
