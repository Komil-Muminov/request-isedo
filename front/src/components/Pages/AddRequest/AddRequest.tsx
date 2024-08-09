import "./AddRequest.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stepper,
  StepLabel,
  Step,
  Button,
  TextField,
  IconButton,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Хук из библиотеки react-hook-form для управления состоянием формы.
import { useForm } from "react-hook-form";
import { PostRqstScheme, postRequest } from "../../API/PostRqsts";
import { steps } from "../../API/Data/Steps/Steps";

// RTQ
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";

import TableRowAddRequest from "../../UI/TableRow/TableRowAddRequest";
import { documentList } from "../../API/Data/Documents/DocumentList";

const AddRequest: React.FC = () => {
  // Состояние текущего активного шага в индикаторе.
  const [activeStep, setActiveStep] = useState<number>(0);

  const navigate = useNavigate();

  const {
    register,
    // Записывает все стейты в массив
    handleSubmit,
    // Функция dirtyFields возвращает true или false в зависимости от того, было ли изменено поле "Название организации".
    // Поле для бухгалтера становится доступным только если поле "Название организации" было изменено.
    watch,
    formState: { dirtyFields },
  } = useForm<PostRqstScheme>({
    defaultValues: {
      orgname: "",
      accountant: "",
      desc: "",
      reqType: "Смена бухгалтера",
      reqStatus: steps[0],
    },
  });
  // Функция для отслеживания изменений значений в реальном времени.
  const reqType = watch("reqType");

  const postRqstsMutation = useMutation({
    mutationFn: (data: PostRqstScheme) => postRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });

  // Увеличивает номер текущего шага на 1.
  const onSubmit = (data: PostRqstScheme) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const updateReqData = { ...data, reqStatus: steps[activeStep] };
    console.log(`reqStatus: ${updateReqData.reqStatus}`);
    postRqstsMutation.mutate(updateReqData);
  };

  // Надо получить данные про юзера и дать инпуту как дефаулт значение д
  // const getMeQuery = useQuery(
  // 	{
  // 		queryFn: () => getMe(),
  // 		queryKey: ["getU_addreq"],
  // 	},
  // 	queryClient,
  // );

  // Список документов для предоставление заявителем

  return (
    <section className="sections">
      <div className="wrapper-prev">
        <div className="container">
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{ borderRadius: "50px" }}
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
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <section className="details-request">
          <div className="title">
            <p>Детали заявки</p>
          </div>
          <div className="form_content">
            <form className="request_form">
              <select
                {...register("reqType")}
                className="req-select"
                id="rType"
              >
                <option className="reg_inp-option" value="">
                  Выберите тип заявки
                </option>
                <option className="reg_inp-option" value="Смена бухгалтера">
                  Смена бухгалтера
                </option>
                <option className="reg_inp-option" value="Смена руководителя">
                  Смена руководителя
                </option>
              </select>
              {reqType === "Смена бухгалтера" && (
                <>
                  <TextField
                    {...register("orgname")}
                    type="text"
                    id="orgname"
                    className="request_inp"
                    placeholder="ФИО бухгалтера"
                  />
                  <TextField
                    {...register("accountant")}
                    type="text"
                    className="request_inp"
                    placeholder="Должность бухгалтера"
                    disabled={!dirtyFields.orgname}
                  />
                  <TextField
                    {...register("desc")}
                    type="text"
                    className="request_inp"
                    placeholder="Контанты бухгалтера"
                    disabled={!dirtyFields.accountant}
                  />
                  <div className="wrapper-table">
                    <Button variant="text" sx={{ mb: "20px" }}>
                      Добавить документ
                    </Button>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Файл</th>
                          <th>Тип документа</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documentList.map((element: any, index: any) => {
                          return (
                            <TableRowAddRequest
                              key={index}
                              fileId={index + 1}
                              typeName={element}
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
                  <TextField
                    {...register("orgname")}
                    type="text"
                    id="orgname"
                    className="request_inp"
                    placeholder="ФИО руководителя"
                  />
                  <TextField
                    {...register("accountant")}
                    type="text"
                    className="request_inp"
                    placeholder="Должность руководителя"
                    disabled={!dirtyFields.orgname}
                  />
                  <TextField
                    {...register("desc")}
                    type="text"
                    className="request_inp"
                    placeholder="Контанты руководителя"
                    disabled={!dirtyFields.accountant}
                  />
                  <TextField
                    {...register("desc")}
                    type="text"
                    className="request_inp"
                    placeholder="Организация руководителя"
                    disabled={!dirtyFields.accountant}
                  />
                </>
              )}
            </form>
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              type={`submit`}
              onClick={handleSubmit(onSubmit)}
              disabled={
                !dirtyFields.accountant ||
                !dirtyFields.orgname ||
                !dirtyFields.desc
              }
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
