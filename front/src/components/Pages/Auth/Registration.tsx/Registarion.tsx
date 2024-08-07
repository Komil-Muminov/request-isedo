import "./Registarion.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RegType } from "../../../API/Hooks/useAuth";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { queryClient } from "../../../../queryClient";
import { useAuth } from "../../../API/Hooks/useAuth";
import InputAuth from "../../../UI/InputAuth/InputAuth";
import EmailIcon from "@mui/icons-material/Email";

const Registration = () => {
  // Надо доработать
  const {
    register,
    handleSubmit,
    // Функция для получения текущих значений формы.
    getValues,
    watch,
    formState: { errors },
  } = useForm<RegType>({
    defaultValues: {
      username: "",
      password: "",
      uType: "",
      fullName: "",
      role: "",
      email: "",
      position: "",
      department: "",
    },
  });

  // Функция для отслеживания изменений значений в реальном времени.
  const uType = watch("uType");

  console.log(uType);

  const { regMe } = useAuth();
  const data: RegType = getValues();
  console.log(data);
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
              <InputAuth
                register={register}
                inputName="username"
                inputPlaceholder="Логин"
                requiredMessage="Это поле объязательно к заполенению"
                minLengthMessage="Логин должен содержать минимум 9 символов"
                inputType="text"
                kind="reg_inp"
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
                kind="reg_inp"
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
                kind="reg_inp"
              />

              <span className="form_errors-text">
                {errors?.fullName && errors.fullName.message}
              </span>

              <InputAuth
                register={register}
                inputName="number"
                inputPlaceholder="Телефон"
                requiredMessage="Заполните поле телефон"
                minLengthMessage="Телефон должен содержать минимум 9 символов"
                inputType="text"
                kind="reg_inp"
              />

              <span className="form_errors-text">
                {errors?.number && errors.number.message}
              </span>

              <InputAuth
                register={register}
                inputName="role"
                inputPlaceholder="Должность"
                requiredMessage="Заполните поле должность"
                minLengthMessage="Должность должна содержать минимум 3 символов"
                inputType="text"
                kind="reg_inp"
              />

              <span className="form_errors-text">
                {errors?.role && errors.role.message}
              </span>

              <InputAuth
                register={register}
                inputName="tax"
                inputPlaceholder="ИНН"
                requiredMessage="Заполните поле ИНН"
                minLengthMessage="ИНН должна содержать минимум 7 символов"
                inputType="text"
                kind="reg_inp"
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
                kind="reg_inp"
              />

              <span className="form_errors-text">
                {errors?.email && errors.email.message}
              </span>
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
                kind="reg_inp"
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
                kind="reg_inp"
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
                kind="reg_inp"
              />

              <span className="form_errors-text">
                {errors?.fullName && errors.fullName.message}
              </span>

              <InputAuth
                register={register}
                inputName="position"
                inputPlaceholder="Должность"
                requiredMessage="Заполните поле должность"
                minLengthMessage="Должность должна содержать минимум 5 символов"
                inputType="text"
                kind="reg_inp"
              />
              <span className="form_errors-text">
                {errors?.position && errors.position.message}
              </span>
              <InputAuth
                register={register}
                inputName="department"
                inputPlaceholder="Отдел"
                requiredMessage="Заполните поле отдел"
                minLengthMessage="Отдел должна содержать минимум 5 символов"
                inputType="text"
                kind="reg_inp"
              />

              <span className="form_errors-text">
                {errors?.department && errors.department.message}
              </span>
            </>
          ) : (
            <>НЕТ</>
          )}
        </div>
        <ButtonKM
          disabled={regMutate.isPending}
          isLoading={regMutate.isPending}
          type="submit"
        >
          Зарегистрироваться
        </ButtonKM>
      </form>
      {console.log(data)}
    </>
  );
};

export default Registration;
