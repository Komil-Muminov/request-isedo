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

import { getUsers, TGetUsers } from "../../../../API/GetUsers";
import { useEffect, useState } from "react";

import VPNCard from "../VPN Card/VPNCard";
import { generatedVPNTFMIS } from "../../../../../API/Hooks/generatedVPNTFMIS";
import { getVPN, TVPN } from "../../../../../API/GetVPN";
import { postVPN } from "../../../../../API/PostVPN";
import { putRqstsById, PutRqstsByIdType } from "../../../../../API/PutRqstById";
import ButtonPanelControl from "../../../../ButtonPanelControl/ButtonPanelControl";

const CreateVPNTFMIS = ({ rqstsDataById, currentOrganization, executor }: any) => {
  const generatedUserName =
    rqstsDataById &&
    typeRequests &&
    generatedVPNTFMIS(rqstsDataById, typeRequests);

  const { register, handleSubmit } = useForm<TVPN>({
    defaultValues: {
      fullName: rqstsDataById?.fullName,
      login: generatedUserName,
      bz: 123,
      organization: currentOrganization?.name,
      phone: rqstsDataById?.phone,
      role: rqstsDataById?.role,
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

  const onSubmit = (data: TVPN) => {
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
      userId: rqstsDataById?.userId,
      dateChange: formattedDate,
    };

    console.log(updateReqData);

    postVPNMutation.mutate(updateReqData);

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

  const newLoginUserId = vpn?.find((e) => e.login === generatedUserName);

  const disabledAddUserInOrganizationButton =
    currentOrganization.userIds.includes(newLoginUserId?.userId);

  console.log(newLoginUserId);

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
      {disabledAddUserInOrganizationButton && (
        <VPNCard currentVPN={newLoginUserId} />
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
