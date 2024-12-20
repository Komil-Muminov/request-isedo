import ButtonPanelControl from "../../../../ButtonPanelControl/ButtonPanelControl";
import "./CreateLoginTFMIS.css";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../../../../queryClient";
import { RegType, useAuth } from "../../../../../API/Hooks/useAuth";

import { typeRequests } from "../../../../../API/Data/TypeRequests/TypeRequests";

import DomainAddIcon from "@mui/icons-material/DomainAdd";

import { generatedLoginTFMIS } from "../../../../../API/Hooks/generatedLoginTFMIS";
import {
  addUserOrganization,
  putOrganizationUser,
} from "../../../../../API/PutOrganizationUser";
import { getUsers, TGetUsers } from "../../../../../API/GetUsers";
import { useEffect, useState } from "react";
import LoginTfmisCard from "../Login of TFMIS Card/LoginTfmisCard";
import { putRqstsById, PutRqstsByIdType } from "../../../../../API/PutRqstById";
import { TCertificates } from "../../../../../API/GetCertificates";
import { putCertificates } from "../../../../../API/PutCertificates";

const CreateLoginTFMIS = ({
  rqstsDataById,
  currentOrganization,
  executor,
  currentCertificateUser,
  currentCertificateUserAccountant,
}: any) => {
  console.log(currentCertificateUser);
  console.log(currentCertificateUserAccountant);

  const generatedUserName =
    rqstsDataById &&
    typeRequests &&
    generatedLoginTFMIS(rqstsDataById, typeRequests, rqstsDataById?.fullName);

  const generatedUserNameAccountant =
    rqstsDataById &&
    typeRequests &&
    generatedLoginTFMIS(
      rqstsDataById,
      typeRequests,
      rqstsDataById?.fullNameAccountant
    );

  interface newAccountantType {
    usernameAccountant: string;
    fullNameAccountant: string;
    phoneAccountant: string;
    taxAccountant: string;
    emailAccountant: string;
    roleAccountant: string;
    passportAccountant: string;
  }

  const { register, handleSubmit } = useForm<RegType | newAccountantType>({
    defaultValues: {
      // Руководитель
      username: generatedUserName,
      fullName: rqstsDataById?.fullName,
      phone: rqstsDataById?.phone,
      tax: rqstsDataById?.tax,
      email: rqstsDataById?.email,
      role: rqstsDataById?.role,
      passport: rqstsDataById?.passport,
      // Главный бухгалтер
      usernameAccountant: generatedUserNameAccountant,
      fullNameAccountant: rqstsDataById?.fullNameAccountant,
      phoneAccountant: rqstsDataById?.phoneAccountant,
      taxAccountant: rqstsDataById?.taxAccountant,
      emailAccountant: rqstsDataById?.emailAccountant,
      roleAccountant: rqstsDataById?.roleAccountant,
      passportAccountant: rqstsDataById?.passportAccountant,
      // Организация
      orgName: currentOrganization?.name,
      orgTax: currentOrganization?.tax,
    },
  });

  const { regMe } = useAuth();

  const { isSuccess } = useMutation({});

  const regMeMutation = useMutation({
    mutationFn: (data: RegType) => regMe(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const putRqstsByIdMutation = useMutation(
    {
      mutationFn: (data: PutRqstsByIdType) => putRqstsById(data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`request-${rqstsDataById?.id}`],
        });
      },
    },
    queryClient
  );

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

  const onSubmit = (data: any) => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, "0")}.${String(
      now.getMonth() + 1
    ).padStart(2, "0")}.${now.getFullYear()} в ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const firstUserData: RegType = {
      username: data.username,
      fullName: data.fullName,
      phone: data.phone,
      tax: data.tax,
      email: data.email,
      role: data.role,
      passport: data.passport,
    };

    const secondUserData: RegType = {
      username: data.usernameAccountant,
      fullName: data.fullNameAccountant,
      phone: data.phoneAccountant,
      tax: data.taxAccountant,
      email: data.emailAccountant,
      role: data.roleAccountant,
      passport: data.passportAccountant,
    };

    const firstUser = {
      ...firstUserData,
      uType:
        rqstsDataById?.reqType === typeRequests[0]?.name ||
        rqstsDataById?.reqType === typeRequests[1]?.name ||
        rqstsDataById?.reqType === typeRequests[2]?.name
          ? "bo"
          : "",
      password: "123",
      photo: "",
      dateChange: formattedDate,
    };

    console.log(secondUserData);

    const secondUser = {
      ...secondUserData,
      uType:
        rqstsDataById?.reqType === typeRequests[0]?.name ||
        rqstsDataById?.reqType === typeRequests[1]?.name ||
        rqstsDataById?.reqType === typeRequests[2]?.name
          ? "bo"
          : "",
      password: "123",
      photo: "",
      dateChange: formattedDate,
    };

    regMeMutation.mutate(firstUser);

    if (rqstsDataById?.reqType === "Смена главного бухгалтера и руководителя") {
      regMeMutation.mutate(secondUser);
    }

    if (rqstsDataById)
      putRqstsByIdMutation.mutate({
        ...rqstsDataById,
        stepTask: rqstsDataById && rqstsDataById.stepTask + 1,
      });

    addNewUserToOrganization();

    if (rqstsDataById?.reqType === "Смена главного бухгалтера и руководителя") {
      addNewUserToOrganization();
    }
  };

  const putOrganizationUserMutation = useMutation({
    mutationFn: (data: addUserOrganization) => putOrganizationUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  const newLoginUserId = users?.find(
    (e) => e.fullName === rqstsDataById?.fullName
  );

  const newLoginUserAccountantId = users?.find(
    (e) => e.fullName === rqstsDataById?.fullNameAccountant
  );

  console.log(newLoginUserId);
  console.log(newLoginUserAccountantId);

  const disabledAddUserInOrganizationButton =
    currentOrganization.userIds.includes(newLoginUserId?.id);

  // Мутация для обновления сертификата
  const certificateMutation = useMutation({
    mutationFn: (updatedCertificate: TCertificates) =>
      putCertificates(updatedCertificate), // Функция PUT запроса
    onSuccess: () => {
      // Обновляем сертификаты в кэше после изменения
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
    onError: (error) => {
      console.error("Ошибка при обновлении сертификата:", error);
    },
  });

  const addNewUserToOrganization = () => {
    if (currentOrganization && newLoginUserId) {
      putOrganizationUserMutation.mutate({
        updatedOrganization: currentOrganization,
        userId: newLoginUserId?.id,
      });

      certificateMutation.mutate({
        ...currentCertificateUser,
        userId: newLoginUserId?.id,
      });
    }

    if (
      currentOrganization &&
      newLoginUserAccountantId &&
      rqstsDataById?.reqType === "Смена главного бухгалтера и руководителя"
    ) {
      putOrganizationUserMutation.mutate({
        updatedOrganization: currentOrganization,
        userId: newLoginUserAccountantId?.id,
      });

      certificateMutation.mutate({
        ...currentCertificateUserAccountant,
        userId: newLoginUserAccountantId?.id,
      });
    }
  };

  return (
    <div className="certificate-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          {/* <CardMembershipIcon /> */}
          <p>Создание логина</p>
        </div>
      </div>
      {!disabledAddUserInOrganizationButton && (
        <div className="inputs-list install-certificate-inputs-list">
          <TextField
            {...register("tax")}
            id="tax"
            type="text"
            className="request_inp"
            label="ИНН"
          />
          <TextField
            {...register("fullName")}
            type="text"
            id="fullName"
            className="request_inp"
            label="ФИО"
          />
          <TextField
            {...register("username")}
            id="username"
            type="text"
            className="request_inp"
            label="Логин"
          />
          <TextField
            {...register("email")}
            id="email"
            type="text"
            className="request_inp"
            label="e-mail"
          />
          <TextField
            {...register("phone")}
            id="phone"
            type="text"
            className="request_inp"
            label="Телефон"
          />
          <TextField
            {...register("passport")}
            id="passport"
            type="text"
            className="request_inp"
            label="Паспорт"
          />
          <TextField
            {...register("role")}
            id="role"
            type="text"
            className="request_inp"
            label="Должность"
          />
          <TextField
            {...register("orgName")}
            id="orgName"
            type="text"
            className="request_inp"
            label="Название организации"
          />
          <TextField
            {...register("orgTax")}
            id="orgTax"
            type="text"
            className="request_inp"
            label="ИНН организация"
          />
        </div>
      )}
      {!disabledAddUserInOrganizationButton &&
        rqstsDataById?.reqType ===
          "Смена главного бухгалтера и руководителя" && (
          <div
            style={{ borderTop: "1px solid #00000021" }}
            className="inputs-list install-certificate-inputs-list"
          >
            <TextField
              {...register("taxAccountant")}
              id="taxAccountant"
              type="text"
              className="request_inp"
              label="ИНН"
            />
            <TextField
              {...register("fullNameAccountant")}
              type="text"
              id="fullNameAccountant"
              className="request_inp"
              label="ФИО"
            />
            <TextField
              {...register("usernameAccountant")}
              id="usernameAccountant"
              type="text"
              className="request_inp"
              label="Логин"
            />
            <TextField
              {...register("emailAccountant")}
              id="emailAccountant"
              type="text"
              className="request_inp"
              label="e-mail"
            />
            <TextField
              {...register("phoneAccountant")}
              id="phoneAccountant"
              type="text"
              className="request_inp"
              label="Телефон"
            />
            <TextField
              {...register("passportAccountant")}
              id="passportAccountant"
              type="text"
              className="request_inp"
              label="Паспорт"
            />
            <TextField
              {...register("role")}
              id="roleAccountant"
              type="text"
              className="request_inp"
              label="Должность"
            />
            <TextField
              {...register("orgName")}
              id="orgName"
              type="text"
              className="request_inp"
              label="Название организации"
            />
            <TextField
              {...register("orgTax")}
              id="orgTax"
              type="text"
              className="request_inp"
              label="ИНН организация"
            />
          </div>
        )}
      {disabledAddUserInOrganizationButton && (
        <LoginTfmisCard currentUser={newLoginUserId} />
      )}
      {disabledAddUserInOrganizationButton &&
        rqstsDataById?.reqType ===
          "Смена главного бухгалтера и руководителя" && (
          <LoginTfmisCard currentUser={newLoginUserAccountantId} />
        )}
      <div className="panel-buttons">
        {disabledAddUserInOrganizationButton && (
          <div className="wrapper-show-executor">
            <p className="show-executor-title">
              Исполнитель: <span>{executor?.fullName}</span>
            </p>
            <p className="show-executor-title">
              Время: <span>{newLoginUserId?.dateChange}</span>
            </p>
          </div>
        )}
        <div className="panel-executor">
          <ButtonPanelControl
            icon={
              <AccountCircleIcon
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              />
            }
            text="Создать"
            handleSubmit={handleSubmit(onSubmit)}
            activeSendButton={newLoginUserId ? true : false}
          />
          <ButtonPanelControl
            icon={
              <DomainAddIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
            }
            text="Привязать к организации"
            handleSubmit={addNewUserToOrganization}
            activeSendButton={disabledAddUserInOrganizationButton}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateLoginTFMIS;
