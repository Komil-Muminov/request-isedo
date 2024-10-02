import React, { useEffect, useState } from "react";

import "./CertificateRevocationModal.css";

import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";

import { statusOfCertificates } from "../../../../../../API/Data/Certificates/Certificates";
import {
  putRqstsById,
  PutRqstsByIdType,
} from "../../../../../../API/PutRqstById";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../../../../../queryClient";
import { useParams } from "react-router-dom";
import {
  getRqstsById,
  GetRqstsByIdType,
} from "../../../../../../API/GetRqstsById";

interface TProps {
  handleShow?: any;
  handleChangeStatus?: any;
}

const CertificateRevocationModal = ({
  handleShow,
  handleChangeStatus,
}: TProps) => {
  const [selectedReason, setSelectedReason] = useState(""); // состояние для выбранного значения

  const handleSelectChange = (event: any) => {
    setSelectedReason(event.target.value); // сохраняем выбранное значение в состояние
  };

  const [rqstsDataById, setRqstsDataById] = useState<GetRqstsByIdType | null>(
    null
  );

  const { id } = useParams();
  const numericId = parseInt(id || "", 10);

  const getRqstsByIdQuery = useQuery(
    {
      queryFn: () => getRqstsById(numericId),
      queryKey: [`request-${numericId}`],
    },
    queryClient
  );

  useEffect(() => {
    if (getRqstsByIdQuery.status === "success") {
      console.log(getRqstsByIdQuery.data); // Проверьте, массив это или объект

      setRqstsDataById(getRqstsByIdQuery.data);
    } else if (getRqstsByIdQuery.status === "error") {
      console.error(getRqstsByIdQuery.error);
    }
  }, [getRqstsByIdQuery]);

  const putRqstsByIdMutation = useMutation(
    {
      mutationFn: (data: PutRqstsByIdType) => putRqstsById(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`request-${numericId}`] });
      },
    },
    queryClient
  );

  const handleConfirm = () => {
    const gotStatusCode = statusOfCertificates.find(
      (e) => e.name === selectedReason
    );
    if (gotStatusCode) {
      handleChangeStatus(gotStatusCode?.code); // вызываем функцию изменения статуса
    }
    handleShow(false); // закрываем модальное окно

    if (rqstsDataById)
      putRqstsByIdMutation.mutate({
        ...rqstsDataById,
        stepTask: rqstsDataById && rqstsDataById.stepTask + 1,
      });
  };

  return (
    <div
      onClick={() => handleShow(false)}
      className="certificate-revocation-modal"
    >
      <div onClick={(event) => event.stopPropagation()} className="content">
        <div className="modal-title">
          <p>Отзыв сертификата</p>
          <IconButton onClick={() => handleShow(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <main className="modal-info">
          <p>Вы действительно хотите отозвать выделенный сертификат?</p>
          <div className="reason-code">
            <p>Код причины:</p>
            <select
              name="revocationReason"
              id="revocationReason"
              onChange={handleSelectChange}
            >
              <option value="">Не определен</option>
              {statusOfCertificates.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="panel-control-buttons">
            <div className="wrapper-buttons">
              <Button
                onClick={handleConfirm}
                variant="contained"
                sx={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "none",
                  borderRadius: "0",
                  border: "1px solid #bdbdbd",
                  color: "#000",
                  textTransform: "none",
                  padding: "0px 40px",
                  ":hover": {
                    backgroundColor: "#dfdede",
                    boxShadow: "none",
                    color: "#000",
                  },
                }}
              >
                Да
              </Button>
              <Button
                onClick={() => handleShow(false)}
                variant="contained"
                sx={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "none",
                  borderRadius: "0",
                  border: "1px solid #bdbdbd",
                  color: "#000",
                  textTransform: "none",
                  padding: "0px 40px",
                  ":hover": {
                    backgroundColor: "#dfdede",
                    boxShadow: "none",
                    color: "#000",
                  },
                }}
              >
                Нет
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CertificateRevocationModal;
