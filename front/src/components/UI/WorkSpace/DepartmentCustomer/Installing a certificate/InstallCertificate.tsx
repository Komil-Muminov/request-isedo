import ButtonPanelControl from "../../../ButtonPanelControl/ButtonPanelControl";
import "./InstallCertificate.css";

import GppGoodIcon from "@mui/icons-material/GppGood";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { TCertificates } from "../../../../API/GetCertificates";
import { postCertificates } from "../../../../API/PostCertificates";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../../../queryClient";
import { useEffect, useState } from "react";
import { statusOfCertificates } from "../../../../API/Data/Certificates/Certificates";
import CertificateCard from "../CertificatesCenter/CertificateCard/CertificateCard";

const InstallCertificate = ({
  rqstsDataById,
  currentOrganization,
  getCertificateUser,
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
  } = useForm<TCertificates>({
    defaultValues: {
      userName: rqstsDataById?.fullName,
      userTax: rqstsDataById?.tax,
      userPhone: rqstsDataById?.phone,
      role: rqstsDataById?.role,
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

  const onSubmit = (data: TCertificates) => {
    const getDate = new Date();

    const day = String(getDate.getDate()).padStart(2, "0");
    const month = String(getDate.getMonth() + 1).padStart(2, "0");
    const year = getDate.getFullYear();

    const dateFrom = `${day}.${month}.${year}`;
    const dateTo = `${day}.${month}.${year + 1}`;

    const updateReqData = {
      ...data,
      userId: rqstsDataById?.userId,
      organizationId: currentOrganization?.id,
      serialNumber: "200000dd1f63274b121773decc00000000dd1f",
      validFrom: dateFrom,
      validTo: dateTo,
      statusCode: 5,
    };

    postCertificateMutation.mutate(updateReqData);
  };

  const statusCertificate = statusOfCertificates.find(
    (e) => e.code === getCertificateUser?.statusCode
  );


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
      {getCertificateUser && (
        <CertificateCard
          getCertificateUser={getCertificateUser}
          statusCertificate={statusCertificate?.name}
          rqstsDataById={rqstsDataById}
        />
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
  );
};

export default InstallCertificate;
