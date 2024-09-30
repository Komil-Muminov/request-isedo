import "./Registarion.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RegType } from "../../../API/Hooks/useAuth";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { queryClient } from "../../../../queryClient";
import { useAuth } from "../../../API/Hooks/useAuth";
import InputAuth from "../../../UI/InputAuth/InputAuth";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { departments } from "../../../API/Data/Departments/Departments";

const Registration = () => {
  // Надо доработать
  const {
    register,
    handleSubmit,
    // Функция для получения текущих значений формы.
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegType>({
    defaultValues: {
      uType: "",
      username: "",
      password: "",
      fullName: "",
      phone: "",
      tax: "",
      email: "",
      orgName: "",
      orgTax: "",
      role: "",
      department: "",
      inn: "",
      organization: "",
    },
  });

  // Функция для отслеживания изменений значений в реальном времени.
  const uType = watch("uType");
  const departmentValue = watch("department"); // Отслеживаем значение department

  console.log(departmentValue);

  const { regMe } = useAuth();
  const data: RegType = getValues();

  const regMutate = useMutation(
    {
      mutationFn: () => regMe(data),
      //   Функция для обработки успешного завершения мутации (инвалидация запросов).
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rqsts"] }),
      onError: () => console.log(`No`),
    },
    queryClient
  );
  const onSubmit = () => {
    regMutate.mutate();
  };

  const [showRegisterButton, setShowRegisterButton] = useState<boolean>(false);

  // switch (regMutate.status) {
  //   case "success":
  //     return <Authorization />;
  // }

  return (
    <>
      <form className="form-reg" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-reg_form-content">
          <h3>Министерство финансов</h3>
          <select
            {...register("uType")}
            className="reg_inp reg_inp-select"
            id="uType"
          >
            <option className="reg_inp-option" value="">
              Тип пользователя
            </option>
            <option className="reg_inp-option" value="kvd">
              КВД
            </option>
            <option className="reg_inp-option" value="organization">
              Организация
            </option>
            <option className="reg_inp-option" value="mfrt">
              МФРТ
            </option>
            <option className="reg_inp-option" value="bo">
              БО
            </option>
            <option className="reg_inp-option" value="ko">
              КО
            </option>
          </select>
          {uType == "bo" ? (
            <>
              {showRegisterButton === false && (
                <>
                  <p>Данные пользователя</p>
                  <InputAuth
                    register={register}
                    inputName="username"
                    inputPlaceholder="Логин"
                    requiredMessage="Это поле объязательно к заполенению"
                    minLengthMessage="Логин должен содержать минимум 9 символов"
                    inputType="text"
                    kind=""
                  />
                  <span className="form_errors-text">
                    {errors?.username && errors.username.message}
                  </span>
                  <InputAuth
                    register={register}
                    inputName="password"
                    inputPlaceholder="Пароль"
                    requiredMessage="Заполните поле password"
                    minLengthMessage="Пароль должен содержать минимум 5 символов"
                    inputType="password"
                    kind=""
                  />
                  <span className="form_errors-text">
                    {errors?.password && errors.password.message}
                  </span>
                  <InputAuth
                    register={register}
                    inputName="fullName"
                    inputPlaceholder="ФИО"
                    requiredMessage="Заполните поле ФИО"
                    minLengthMessage="ФИО должен содержать минимум 5 символов"
                    inputType="text"
                    kind=""
                  />
                  <span className="form_errors-text">
                    {errors?.fullName && errors.fullName.message}
                  </span>
                  <InputAuth
                    register={register}
                    inputName="phone"
                    inputPlaceholder="Телефон"
                    requiredMessage="Заполните поле телефон"
                    minLengthMessage="Телефон должен содержать минимум 9 символов"
                    inputType="text"
                    kind=""
                  />
                  <span className="form_errors-text">
                    {errors?.phone && errors.phone.message}
                  </span>
                  <InputAuth
                    register={register}
                    inputName="tax"
                    inputPlaceholder="ИНН"
                    requiredMessage="Заполните поле ИНН"
                    minLengthMessage="ИНН должна содержать минимум 7 символов"
                    inputType="text"
                    kind=""
                  />
                  <span className="form_errors-text">
                    {errors?.tax && errors.tax.message}
                  </span>
                  <InputAuth
                    register={register}
                    inputName="email"
                    inputPlaceholder="E-mail адресс"
                    requiredMessage="Заполните поле email"
                    minLengthMessage="E-mail должна содержать минимум 7 символов"
                    inputType="text"
                    kind=""
                  />
                  <span className="form_errors-text">
                    {errors?.email && errors.email.message}
                  </span>
                </>
              )}
              {showRegisterButton === true && (
                <>
                  <p>Данные организации</p>

                  <InputAuth
                    register={register}
                    inputName="orgName"
                    inputPlaceholder="Наименование организации"
                    requiredMessage="Заполните поле наименование организации"
                    minLengthMessage="Наименование организации должна содержать минимум 3 символов"
                    inputType="text"
                    kind=""
                  />
                  <span className="form_errors-text">
                    {errors?.orgName && errors.orgName.message}
                  </span>
                  <InputAuth
                    register={register}
                    inputName="orgTax"
                    inputPlaceholder="ИНН"
                    requiredMessage="Заполните поле ИНН"
                    minLengthMessage="ИНН должна содержать минимум 3 символов"
                    inputType="text"
                    kind=""
                  />
                  <span className="form_errors-text">
                    {errors?.orgTax && errors.orgTax.message}
                  </span>
                  <InputAuth
                    register={register}
                    inputName="role"
                    inputPlaceholder="Должность"
                    requiredMessage="Заполните поле должность"
                    minLengthMessage="Должность должна содержать минимум 3 символов"
                    inputType="text"
                    kind=""
                  />
                  <span className="form_errors-text">
                    {errors?.role && errors.role.message}
                  </span>
                </>
              )}

              {regMutate.isSuccess && (
                <div className="email-message">
                  <EmailIcon />
                  <p>
                    Перейдите на почту {} для того чтобы завершить регистрацию!
                  </p>
                </div>
              )}
            </>
          ) : uType === "kvd" ? (
            <>
              <InputAuth
                register={register}
                inputName="username"
                inputPlaceholder="Логин"
                requiredMessage="Это поле объязательно к заполенению"
                minLengthMessage="Логин должен содержать минимум 9 символов"
                inputType="text"
                kind=""
              />

              <span className="form_errors-text">
                {errors?.username && errors.username.message}
              </span>

              <InputAuth
                register={register}
                inputName="password"
                inputPlaceholder="Пароль"
                requiredMessage="Заполните поле password"
                minLengthMessage="Пароль должен содержать минимум 5 символов"
                inputType="password"
                kind=""
              />

              <span className="form_errors-text">
                {errors?.password && errors.password.message}
              </span>

              <InputAuth
                register={register}
                inputName="fullName"
                inputPlaceholder="ФИО"
                requiredMessage="Заполните поле ФИО"
                minLengthMessage="ФИО должен содержать минимум 5 символов"
                inputType="text"
                kind=""
              />

              <span className="form_errors-text">
                {errors?.fullName && errors.fullName.message}
              </span>

              <InputAuth
                register={register}
                inputName="role"
                inputPlaceholder="Должность"
                requiredMessage="Заполните поле должность"
                minLengthMessage="Должность должна содержать минимум 5 символов"
                inputType="text"
                kind=""
              />
              <span className="form_errors-text">
                {errors?.role && errors.role.message}
              </span>
              <FormControl fullWidth>
                <InputLabel id="department-select-label">Отдел</InputLabel>
                <Select
                  sx={{ borderRadius: "50px" }}
                  labelId="department-select-label"
                  id="department-select"
                  value={departmentValue} // Используем значение из watch
                  label="Отдел"
                  onChange={(e) =>
                    setValue("department", e.target.value as string)
                  } // Обновляем значение в форме
                  error={!!errors.department} // Отображаем ошибку, если есть
                >
                  {departments.map((e) => (
                    <MenuItem value={e.name} key={e.id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <span className="form_errors-text">
                {errors?.department && errors.department.message}
              </span>
            </>
          ) : uType === "ko" ? (
            <>
              <InputAuth
                register={register}
                inputName="organization"
                inputPlaceholder="Наименование организации"
                requiredMessage="Заполните поле Организация"
                minLengthMessage="Организация не должен быть пустым"
                inputType="text"
                kind=""
              />
              <InputAuth
                register={register}
                inputName="username"
                inputPlaceholder="username/login"
                requiredMessage="Заполните поле username"
                minLengthMessage="username не должен быть пустым"
                inputType="text"
                kind=""
              />
              <InputAuth
                register={register}
                inputName="inn"
                inputPlaceholder="ИНН организации"
                requiredMessage="Заполните поле ИНН"
                minLengthMessage="ИНН не должен быть пустым"
                inputType="text"
                kind=""
              />

              <InputAuth
                register={register}
                inputName="role"
                inputPlaceholder="Должность"
                requiredMessage="Заполните поле должность"
                minLengthMessage="Должность не должен быть пустым"
                inputType="text"
                kind=""
              />

              <InputAuth
                register={register}
                inputName="password"
                inputPlaceholder="password"
                requiredMessage="Заполните поле password"
                minLengthMessage="password не должен быть пустым"
                inputType="password"
                kind=""
              />
            </>
          ) : (
            ""
          )}

          {/* <p className="choose__utype_text">Выберите тип пользователя</p> */}
        </div>
        {(showRegisterButton === false && uType !== "" && uType !== "kvd") ||
        uType !== "ko" ? (
          <ButtonKM onClick={() => setShowRegisterButton(true)}>Далее</ButtonKM>
        ) : (showRegisterButton === true && uType !== "") || uType === "kvd" ? (
          <ButtonKM
            disabled={regMutate.isPending}
            isLoading={regMutate.isPending}
            type="submit"
          >
            Зарегистрироваться
          </ButtonKM>
        ) : (
          <></>
        )}
      </form>
      {console.log(data)}
    </>
  );
};

export default Registration;
