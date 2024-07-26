import "./Registarion.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RegType } from "../../../API/Hooks/useAuth";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { queryClient } from "../../../../queryClient";
import { useAuth } from "../../../API/Hooks/useAuth";
import Authorization from "../Authorization/Authorization";

import InputAuth from "../../../UI/InputAuth/InputAuth";

const Registration = () => {
  // Надо доработать
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<RegType>({
    defaultValues: {
      username: "",
      password: "",
      uType: "",
    },
  });

  const uType = watch("uType");
  const { regMe } = useAuth();
  const data: RegType = getValues();
  console.log(data);
  const regMutate = useMutation(
    {
      mutationFn: () => regMe(data),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rqsts"] }),
      onError: () => console.log(`No`),
    },
    queryClient
  );
  const onSubmit = () => {
    regMutate.mutate();
  };

  switch (regMutate.status) {
    case "success":
      return <Authorization />;
  }

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
                minLengthMessage="Имя пользователя должен содержать минимум 5 символов"
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
