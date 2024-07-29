import "./AddRequest.css";
import React, { useState } from "react";
import { Prev } from "../../UI/PrevLink/Prev";
import { Stepper, StepLabel, Step, Button } from "@mui/material";
// Хук из библиотеки react-hook-form для управления состоянием формы.
import { useForm } from "react-hook-form";
import { PostRqstScheme } from "../../API/PostRqsts";
import { steps } from "../../API/Data/Steps/Steps";
import { postRequest } from "../../API/PostRqsts";
const AddRequest: React.FC = () => {
  // Состояние текущего активного шага в индикаторе.
  const [activeStep, setActiveStep] = useState<number>(0);

  const {
    register,
    handleSubmit,
    // Функция dirtyFields возвращает true или false в зависимости от того, было ли изменено поле "Название организации".
    // Поле для бухгалтера становится доступным только если поле "Название организации" было изменено.
    formState: { dirtyFields },
  } = useForm<PostRqstScheme>({
    defaultValues: {
      orgname: "",
      accountant: "",
      desc: "",
    },
  });

  /**
   * Inputs disabled
   */
  const onSubmit = (data: PostRqstScheme) => {
    // Увеличивает номер текущего шага на 1.
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(`postRequest:${postRequest} + `);
    postRequest(data);
  };
  return (
    <section className="sections">
      <div className="container">
        <div className="addRequest__content km__content">
          <h1>Создание</h1>
          {/* <Stepper>: Компонент для отображения шагового индикатора, который отображает прогресс.
           */}
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="form_content">
            <form className="request_form ">
              <input
                {...register("orgname")}
                type="text"
                id="orgname"
                className="inp request_inp"
                placeholder="БО"
              />
              <input
                {...register("accountant")}
                type="text"
                className="inp request_inp"
                placeholder="Бухгалтер"
                disabled={!dirtyFields.orgname}
              />
              <input
                {...register("desc")}
                type="text"
                className="inp request_inp"
                placeholder="Описание"
                disabled={!dirtyFields.accountant}
              />
            </form>
            <Button
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
        </div>
        <Prev className="addrequest_prev" to={"#"}>
          Назад
        </Prev>
      </div>
    </section>
  );
};

export default AddRequest;
