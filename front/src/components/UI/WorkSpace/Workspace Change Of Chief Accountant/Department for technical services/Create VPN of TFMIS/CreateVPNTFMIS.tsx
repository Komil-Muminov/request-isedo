import "./CreateVPNTFMIS.css";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../../../../queryClient";
import { RegType, useAuth } from "../../../../API/Hooks/useAuth";

import { typeRequests } from "../../../../../API/Data/TypeRequests/TypeRequests";

import DomainAddIcon from "@mui/icons-material/DomainAdd";

import {
  addUserOrganization,
  putOrganizationUser,
} from "../../../../../API/PutOrganizationUser";

import { useEffect, useState } from "react";

import VPNCard from "../VPN Card/VPNCard";
import { generatedVPNTFMIS } from "../../../../../API/Hooks/generatedVPNTFMIS";
import { getVPN, TVPN } from "../../../../../API/GetVPN";
import { postVPN } from "../../../../../API/PostVPN";
import { putRqstsById, PutRqstsByIdType } from "../../../../../API/PutRqstById";
import ButtonPanelControl from "../../../../ButtonPanelControl/ButtonPanelControl";
import { getUsers, TGetUsers } from "../../../../../API/GetUsers";

const CreateVPNTFMIS = ({
  rqstsDataById,
  currentOrganization,
  executor,
}: any) => {
  const generatedUserName =
    rqstsDataById &&
    typeRequests &&
    generatedVPNTFMIS(rqstsDataById, typeRequests, rqstsDataById?.fullName);

  const generatedUserNameAccountant =
    rqstsDataById &&
    typeRequests &&
    generatedVPNTFMIS(
      rqstsDataById,
      typeRequests,
      rqstsDataById?.fullNameAccountant
    );

  interface newAccountantType {
    fullNameAccountant: string;
    loginAccountant: string;
    bzAccountant: number;
    phoneAccountant: string;
    roleAccountant: string;
  }

  const { register, handleSubmit } = useForm<TVPN | newAccountantType>({
    defaultValues: {
      // Руководитель
      fullName: rqstsDataById?.fullName,
      login: generatedUserName,
      bz: 123,
      phone: rqstsDataById?.phone,
      role: rqstsDataById?.role,
      // Главный бухгалтер
      fullNameAccountant: rqstsDataById?.fullNameAccountant,
      loginAccountant: generatedUserNameAccountant,
      bzAccountant: 123,
      phoneAccountant: rqstsDataById?.phoneAccountant,
      roleAccountant: rqstsDataById?.roleAccountant,
      // Организация
      organization: currentOrganization?.name,
    },
  });

  const postVPNMutation = useMutation({
    mutationFn: (data: TVPN) => postVPN(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vpn"] }),
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

  // Данные карточки нынешнего главного бухгалтера

  const currentAccountant = users?.find((user) => {
    if (currentOrganization)
      return (
        currentOrganization.userIds.includes(user.id) &&
        user.role === "Главный бухгалтер" &&
        user.status === true
      );
  });

  // Данные карточки нынешнего руководителя

  const currentManagement = users?.find((user) => {
    if (currentOrganization)
      return (
        currentOrganization.userIds.includes(user.id) &&
        user.role === "Руководитель" &&
        user.status === true
      );
  });

  const currentVpnUserId =
    rqstsDataById?.reqType === "Смена главного бухгалтера"
      ? currentAccountant
      : rqstsDataById?.reqType === "Смена руководителя"
      ? currentManagement
      : "";

  console.log(currentAccountant, currentManagement);

  const onSubmit = (data: any) => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, "0")}.${String(
      now.getMonth() + 1
    ).padStart(2, "0")}.${now.getFullYear()} в ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const updateReqData = {
      ...data,
      password: "123",
      status: true,
      userId: currentVpnUserId && currentVpnUserId?.id,
      dateChange: formattedDate,
    };

    const firstVPNData: TVPN = {
      fullName: data.fullName,
      login: data.login,
      bz: data.bz,
      phone: data.phone,
      role: data.role,
      organization: data.organization,
    };

    const secondVPNData: TVPN = {
      fullName: data.fullNameAccountant,
      login: data.loginAccountant,
      bz: data.bzAccountant,
      phone: data.phoneAccountant,
      role: data.roleAccountant,
      organization: data.organization,
    };

    const firstVPN = {
      ...firstVPNData,
      password: "123",
      status: true,
      userId: currentManagement && currentManagement?.id,
      dateChange: formattedDate,
    };

    const secondVPN = {
      ...secondVPNData,
      password: "123",
      status: true,
      userId: currentAccountant && currentAccountant?.id,
      dateChange: formattedDate,
    };

    if (rqstsDataById?.reqType !== "Смена главного бухгалтера и руководителя")
      postVPNMutation.mutate(updateReqData);

    if (rqstsDataById?.reqType === "Смена главного бухгалтера и руководителя") {
      postVPNMutation.mutate(firstVPN);
      postVPNMutation.mutate(secondVPN);
    }

    if (rqstsDataById)
      putRqstsByIdMutation.mutate({
        ...rqstsDataById,
        stepTask: rqstsDataById && rqstsDataById.stepTask + 1,
      });
  };

  const getVpnQuery = useQuery(
    {
      queryFn: () => getVPN(),
      queryKey: ["vpn"],
    },
    queryClient
  );

  const [vpn, setVpn] = useState<TVPN[]>([]);

  useEffect(() => {
    if (getVpnQuery.status === "success") {
      setVpn(getVpnQuery.data);
    }
  }, [getVpnQuery]);

  const newLoginUserId = vpn?.find(
    (e) => e.fullName === rqstsDataById?.fullName
  );

  const newLoginUserAccountantId = vpn?.find(
    (e) => e.fullName === rqstsDataById?.fullNameAccountant
  );

  console.log(newLoginUserId, newLoginUserAccountantId);

  const disabledAddUserInOrganizationButton =
    currentOrganization.userIds.includes(newLoginUserId?.userId);

  console.log(disabledAddUserInOrganizationButton);

  return (
    <div className="certificate-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          {/* <CardMembershipIcon /> */}
          <p>Создание VPN</p>
        </div>
      </div>
      {!disabledAddUserInOrganizationButton && (
        <div className="inputs-list install-certificate-inputs-list">
          <TextField
            {...register("fullName")}
            id="fullName"
            type="text"
            className="request_inp"
            label="ФИО"
          />
          <TextField
            {...register("login")}
            type="text"
            id="login"
            className="request_inp"
            label="Логин"
          />
          <TextField
            {...register("bz")}
            id="bz"
            type="text"
            className="request_inp"
            label="БЗ"
          />
          <TextField
            {...register("organization")}
            id="organization"
            type="text"
            className="request_inp"
            label="Организация"
          />
          <TextField
            {...register("phone")}
            id="phone"
            type="text"
            className="request_inp"
            label="Телефон"
          />
          <TextField
            {...register("role")}
            id="role"
            type="text"
            className="request_inp"
            label="Должность"
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
              {...register("fullNameAccountant")}
              id="fullNameAccountant"
              type="text"
              className="request_inp"
              label="ФИО"
            />
            <TextField
              {...register("loginAccountant")}
              type="text"
              id="loginAccountant"
              className="request_inp"
              label="Логин"
            />
            <TextField
              {...register("bzAccountant")}
              id="bzAccountant"
              type="text"
              className="request_inp"
              label="БЗ"
            />
            <TextField
              {...register("organization")}
              id="organization"
              type="text"
              className="request_inp"
              label="Организация"
            />
            <TextField
              {...register("phoneAccountant")}
              id="phoneAccountant"
              type="text"
              className="request_inp"
              label="Телефон"
            />
            <TextField
              {...register("roleAccountant")}
              id="roleAccountant"
              type="text"
              className="request_inp"
              label="Должность"
            />
          </div>
        )}
      {disabledAddUserInOrganizationButton && (
        <VPNCard currentVPN={newLoginUserId} />
      )}
      {disabledAddUserInOrganizationButton &&
        rqstsDataById?.reqType ===
          "Смена главного бухгалтера и руководителя" && (
          <VPNCard currentVPN={newLoginUserAccountantId} />
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
        </div>
      </div>
    </div>
  );
};

export default CreateVPNTFMIS;
