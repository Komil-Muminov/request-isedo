import "./AddRequest.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, StepLabel, Step, Button, TextField } from "@mui/material";

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

const AddRequest: React.FC = () => {
  // Состояние текущего активного шага в индикаторе.
  const [activeStep, setActiveStep] = useState<number>(0);

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
      reqType: "Смена бухгалтера",
      reqStatus: steps[0]?.step,
      dateTime: "",
    },
  });
  // Функция для отслеживания изменений значений в реальном времени.
  const reqType = watch("reqType");

  const postRqstsMutation = useMutation(
    {
      mutationFn: (data: PostRqstScheme) => postRequest(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["requests"] });
      },
    },
    queryClient
  );

  // Увеличивает номер текущего шага на 1.
  const onSubmit = (data: PostRqstScheme) => {
    console.log(data);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const stepFound = steps.find((e) => e.stepCode === activeStep);
    console.log(data);

    const getDate = new Date();

    const day = String(getDate.getDate()).padStart(2, "0");
    const month = String(getDate.getMonth() + 1).padStart(2, "0");
    const year = getDate.getFullYear();
    const hours = String(getDate.getHours()).padStart(2, "0");
    const minutes = String(getDate.getMinutes()).padStart(2, "0");

    const date = `${day}.${month}.${year}.${hours}:${minutes}`;

    const updateReqData = {
      ...data,
      reqStatus: stepFound ? stepFound.step : "",
      dateTime: date,
    };

    console.log(`reqStatus: ${updateReqData.reqStatus}`);
    postRqstsMutation.mutate(updateReqData);
  };

  const [file, setGetFile] = useState({ number: 0, file: {} });

  const handleGetFile = (id: number, file: File | null) => {
    setGetFile({ number: id, file: file ? file.name : "" });
  };

  console.log(uinfo);

  return (
    <section>
      <div className="wrapper-prev">
        <div className="container">
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{
              borderRadius: "50px",
              color: "#607d8b",
              borderColor: "#607d8b",
              "&:hover": {
                borderColor: "#607d8b",
              },
            }}
          >
            Назад
          </Button>
        </div>
      </div>
      <div className="container">
        <div className="addRequest__content km__content">
          {/* <Stepper>: Компонент для отображения шагового индикатора, который отображает прогресс.
           */}
          <h1>Создание</h1>
          <Stepper
            sx={{ display: "flex", justifyContent: "space-between" }}
            activeStep={activeStep}
            alternativeLabel
          >
            {steps.map((e, index) => (
              <Step key={index}>
                <StepLabel>
                  <p className="step-header">{e.step}</p>
                  <p className="step-initiators">{e.initiators}</p>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <section className="details-request">
          <div className="title">
            <p>Детали заявки</p>
          </div>
          <div className="form_content">
            <form className="request_form" onSubmit={handleSubmit(onSubmit)}>
              <Controller
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
                      <Select.Item value="Смена бухгалтера">
                        Смена бухгалтера
                      </Select.Item>
                      <Select.Item value="Смена руководителя">
                        Смена руководителя
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                )}
              />
              {reqType === "Смена бухгалтера" && (
                <>
                  <div className="inputs-list">
                    <TextField
                      {...register("fullName")}
                      id="fullName"
                      type="text"
                      className="request_inp"
                      label="ФИО"
                      value={uinfo?.fullName || ""}
                    />
                    <TextField
                      {...register("role")}
                      id="role"
                      type="text"
                      className="request_inp"
                      label="Должность"
                      value={uinfo?.role || ""}
                    />
                    <TextField
                      {...register("phone")}
                      id="phone"
                      type="text"
                      className="request_inp"
                      label="Номер телефона"
                      value={uinfo?.phone || ""}
                    />
                    {/* =============== Добавить в базу requests =============== */}
                    <TextField
                      {...register("email")}
                      id="email"
                      type="text"
                      className="request_inp"
                      label="E-mail адрес"
                      value={uinfo?.email || ""}
                    />
                    <TextField
                      {...register("tax")}
                      id="tax"
                      type="text"
                      className="request_inp"
                      label="ИНН"
                      value={uinfo?.tax || ""}
                    />
                    <TextField
                      {...register("orgTax")}
                      id="orgTax"
                      type="text"
                      className="request_inp"
                      label="ИНН"
                      value={uinfo?.orgTax || ""}
                    />
                    <TextField
                      {...register("orgName")}
                      id="orgName"
                      type="text"
                      className="request_inp"
                      label="Организация"
                      value={uinfo?.orgName || ""}
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
                              file={file}
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
                      value={uinfo?.fullName || ""}
                      className="request_inp"
                      // KM
                      placeholder="ФИО"
                    />
                    <TextField
                      {...register("role")}
                      id="role"
                      value={uinfo?.role || ""}
                      type="text"
                      className="request_inp"
                      placeholder="Должность"
                      disabled={!dirtyFields.role}
                    />
                    <TextField
                      {...register("phone")}
                      id="phone"
                      value={uinfo?.phone || ""}
                      type="text"
                      className="request_inp"
                      placeholder="Номер телефона"
                      disabled={!dirtyFields.phone}
                    />
                    <TextField
                      {...register("orgName")}
                      id="orgName"
                      value={uinfo?.orgName || ""}
                      type="text"
                      className="request_inp"
                      placeholder="Организация"
                      disabled={!dirtyFields.orgName}
                    />
                  </div>
                </>
              )}
            </form>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={
                (activeStep !== 0 && uinfo?.uType === "bo") ||
                (activeStep === 0 && uinfo?.uType === "kvd")
              }
              sx={{
                backgroundColor: "#607d8b",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#546d79",
                },
              }}
            >
              Отправить
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AddRequest;
