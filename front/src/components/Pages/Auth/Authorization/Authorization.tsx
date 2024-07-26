import "./Authorization.css";
import { useForm } from "react-hook-form";
import { LogType, useAuth } from "../../../API/Hooks/useAuth";
import { ButtonKM } from "../../../UI/Button/ButtonKM";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../queryClient";

import InputAuth from "../../../UI/InputAuth/InputAuth";

const Authorization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LogType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { logMe } = useAuth();
  const navigate = useNavigate();
  const logMutate = useMutation({
    mutationFn: (data: LogType) => logMe(data),
  });

  const onSubmit = (data: LogType) => {
    logMutate.mutate(data);
  };

  if (logMutate.isSuccess) {
    // navigate("account");
    try {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      console.log(`logMutate's invalidate success ${logMutate.status}`);
    } catch (error) {
      console.log(
        `logMutate's invalidate is false ${logMutate.status && error}`
      );
    }
    navigate("uprofile");
  }

  return (
    <>
      <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-auth_form-content">
          <h3>Министерство финансов</h3>
          <InputAuth
            register={register}
            inputName="username"
            inputPlaceholder="Логин"
            requiredMessage="Это поле объязательно к заполенению"
            minLengthMessage="Имя пользователя должен содержать минимум 2 символов"
            inputType="text"
            kind="reg_inp"
            inputDefaultValue={""}
            inputDisabled={""}
          />

          <span className="form_errors-text">
            {errors?.username && errors.username.message}
          </span>
          <InputAuth
            register={register}
            inputName="password"
            inputPlaceholder="Пароль"
            requiredMessage="Заполните поле password"
            minLengthMessage="Пароль должен содержать минимум 2 символов"
            inputType="password"
            kind="reg_inp"
            inputDefaultValue={""}
            inputDisabled={!dirtyFields.username}
          />

          <span className="form_errors-text">
            {errors?.password && errors.password.message}
          </span>
        </div>
        <ButtonKM
          disabled={!dirtyFields.username || !dirtyFields.password}
          isLoading={logMutate.isPending}
          type="btn submit_btn"
        >
          Авторизация
        </ButtonKM>
      </form>
    </>
  );
};

export default Authorization;
