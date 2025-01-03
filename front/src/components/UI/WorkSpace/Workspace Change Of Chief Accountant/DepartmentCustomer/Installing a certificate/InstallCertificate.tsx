import ButtonPanelControl from "../../../../ButtonPanelControl/ButtonPanelControl";
import "./InstallCertificate.css";

import GppGoodIcon from "@mui/icons-material/GppGood";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  AccountantManagementCertificate,
  TCertificates,
} from "../../../../../API/GetCertificates";
import { postCertificates } from "../../../../../API/PostCertificates";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../../../../queryClient";
import { useEffect, useState } from "react";
import { statusOfCertificates } from "../../../../../API/Data/Certificates/Certificates";
import CertificateCard from "../CertificatesCenter/CertificateCard/CertificateCard";
import { putRqstsById, PutRqstsByIdType } from "../../../../../API/PutRqstById";

const InstallCertificate = ({
  rqstsDataById,
  currentOrganization,
  getCertificateUser,
  getCertificateAccountant,
  executor,
}: any) => {
  const {
    register,
    // Записывает все стейты в массив
    handleSubmit,
    // Функция dirtyFields возвращает true или false в зависимости от того, было ли изменено поле "Название организации".
    // Поле для бухгалтера становится доступным только если поле "Название организации" было изменено.
    watch,
    setValue,
    getValues,
    formState: { dirtyFields },
  } = useForm<TCertificates | AccountantManagementCertificate>({
    defaultValues: {
      // Руководитель
      userName: rqstsDataById?.fullName,
      userTax: rqstsDataById?.tax,
      userPhone: rqstsDataById?.phone,
      role: rqstsDataById?.role,
      // Главный бухгалтер
      userNameAccountant: rqstsDataById?.fullNameAccountant,
      userTaxAccountant: rqstsDataById?.taxAccountant,
      userPhoneAccountant: rqstsDataById?.phoneAccountant,
      roleAccountant: rqstsDataById?.roleAccountant,
      // Организация
      orgName: currentOrganization?.name,
      orgTax: currentOrganization?.tax,
      orgPhone: currentOrganization?.phone,
      address: currentOrganization?.address,
    },
  });

  const postCertificateMutation = useMutation({
    mutationFn: (data: TCertificates) => postCertificates(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
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

  const onSubmit = (data: any) => {
    const getDate = new Date();

    const day = String(getDate.getDate()).padStart(2, "0");
    const month = String(getDate.getMonth() + 1).padStart(2, "0");
    const year = getDate.getFullYear();

    const dateFrom = `${day}.${month}.${year}`;
    const dateTo = `${day}.${month}.${year + 1}`;

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, "0")}.${String(
      now.getMonth() + 1
    ).padStart(2, "0")}.${now.getFullYear()} в ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const certificateDataFirstVersion: TCertificates = {
      userName: data.userName,
      userTax: data.userTax,
      userPhone: data.userPhone,
      role: data.role,
      orgName: data.orgName,
      orgTax: data.orgTax,
      orgPhone: data.orgPhone,
      address: data.address,
    };

    const certificateDataSecondVersion: TCertificates = {
      userName: data?.userNameAccountant,
      userTax: data?.userTaxAccountant,
      userPhone: data?.userPhoneAccountant,
      role: data?.roleAccountant,
      orgName: data?.orgName,
      orgTax: data?.orgTax,
      orgPhone: data?.orgPhone,
      address: data?.address,
    };

    const firstCertificateData = {
      ...certificateDataFirstVersion,
      userId: null,
      organizationId: currentOrganization?.id,
      serialNumber: "200000dd1f63274b121773decc00000000dd1f",
      validFrom: dateFrom,
      validTo: dateTo,
      statusCode: 0,
      dateChange: formattedDate,
    };

    const secondCertificateData = {
      ...certificateDataSecondVersion,
      userId: null,
      organizationId: currentOrganization?.id,
      serialNumber: "200000dd1f63274b121773decc00000000dd1f",
      validFrom: dateFrom,
      validTo: dateTo,
      statusCode: 0,
      dateChange: formattedDate,
    };

    postCertificateMutation.mutate(firstCertificateData);

    if (rqstsDataById?.reqType === "Смена главного бухгалтера и руководителя") {
      postCertificateMutation.mutate(secondCertificateData);
    }

    if (rqstsDataById)
      putRqstsByIdMutation.mutate({
        ...rqstsDataById,
        stepTask: rqstsDataById && rqstsDataById.stepTask + 1,
      });
  };

  const statusCertificate = statusOfCertificates.find(
    (e) => e.code === getCertificateUser?.statusCode
  );

  const statusCertificateAccountant = statusOfCertificates.find(
    (e) => e.code === getCertificateAccountant?.statusCode
  );

  console.log(getCertificateAccountant);

  return (
    <div className="certificate-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          {/* <CardMembershipIcon /> */}
          <p>Выдача сертификата </p>
        </div>
      </div>
      {!getCertificateUser && (
        <div className="inputs-list install-certificate-inputs-list">
          <TextField
            {...register("userName")}
            type="text"
            id="userName"
            className="request_inp"
            label="ФИО"
          />
          <TextField
            {...register("userTax")}
            id="userTax"
            type="text"
            className="request_inp"
            label="ИНН пользователя"
          />
          <TextField
            {...register("userPhone")}
            id="userPhone"
            type="text"
            className="request_inp"
            label="Номер телефон пользователя"
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
            label="Организация"
          />
          <TextField
            {...register("orgTax")}
            id="orgTax"
            type="text"
            className="request_inp"
            label="ИНН Организации"
          />
          <TextField
            {...register("orgPhone")}
            id="orgPhone"
            type="text"
            className="request_inp"
            label="Номер телефон организации"
          />
          <TextField
            {...register("address")}
            id="address"
            type="text"
            className="request_inp"
            label="Адрес"
          />
        </div>
      )}
      {!getCertificateAccountant &&
        rqstsDataById?.reqType ===
          "Смена главного бухгалтера и руководителя" && (
          <div
            style={{ borderTop: "1px solid #00000021" }}
            className="inputs-list install-certificate-inputs-list"
          >
            <TextField
              {...register("userNameAccountant")}
              type="text"
              id="userNameAccountant"
              className="request_inp"
              label="ФИО"
            />
            <TextField
              {...register("userTaxAccountant")}
              id="userTaxAccountant"
              type="text"
              className="request_inp"
              label="ИНН пользователя"
            />
            <TextField
              {...register("userPhoneAccountant")}
              id="userPhoneAccountant"
              type="text"
              className="request_inp"
              label="Номер телефон пользователя"
            />
            <TextField
              {...register("roleAccountant")}
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
              label="Организация"
            />
            <TextField
              {...register("orgTax")}
              id="orgTax"
              type="text"
              className="request_inp"
              label="ИНН Организации"
            />
            <TextField
              {...register("orgPhone")}
              id="orgPhone"
              type="text"
              className="request_inp"
              label="Номер телефон организации"
            />
            <TextField
              {...register("address")}
              id="address"
              type="text"
              className="request_inp"
              label="Адрес"
            />
          </div>
        )}
      {getCertificateUser && (
        <CertificateCard
          getCertificateUser={getCertificateUser}
          statusCertificate={statusCertificate?.name}
          rqstsDataById={rqstsDataById}
        />
      )}
      {getCertificateAccountant &&
        rqstsDataById?.reqType ===
          "Смена главного бухгалтера и руководителя" && (
          <CertificateCard
            getCertificateUser={getCertificateAccountant}
            statusCertificate={statusCertificateAccountant?.name}
            rqstsDataById={rqstsDataById}
          />
        )}
      <div className="panel-buttons">
        {getCertificateUser && (
          <div className="wrapper-show-executor">
            <p className="show-executor-title">
              Исполнитель: <span>{executor?.fullName}</span>
            </p>
            <p className="show-executor-title">
              Время: <span>{getCertificateUser?.dateChange}</span>
            </p>
          </div>
        )}
        <div className="panel-executor">
          <ButtonPanelControl
            icon={<GppGoodIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
            text="Выдать"
            handleSubmit={handleSubmit(onSubmit)}
            activeSendButton={getCertificateUser ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default InstallCertificate;
