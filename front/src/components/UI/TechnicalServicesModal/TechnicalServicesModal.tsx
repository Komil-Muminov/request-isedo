import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import { putRqstsById, PutRqstsByIdType } from "../../API/PutRqstById";
import { queryClient } from "../../../queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRqstsById, GetRqstsByIdType } from "../../API/GetRqstsById";
import { useParams } from "react-router-dom";

interface TProps {
  handleShow: (state: boolean) => void;
  handleChangeStatus: () => void;
}

const TechnicalServicesModal: React.FC<TProps> = ({
  handleShow,
  handleChangeStatus,
}) => {
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
    if (rqstsDataById)
      putRqstsByIdMutation.mutate({
        ...rqstsDataById,
        stepTask: rqstsDataById && rqstsDataById.stepTask + 1,
      });
    handleChangeStatus();
    handleShow(false);
  };
  return (
    <div
      onClick={() => handleShow(false)}
      className="certificate-revocation-modal"
    >
      <div onClick={(event) => event.stopPropagation()} className="content">
        <div className="modal-title">
          <p>Пассив логина</p>
          <IconButton onClick={() => handleShow(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <main className="modal-info">
          <p>Вы действительно хотите отправить логин в пассив?</p>
          {/* <div className="reason-code">
            <p>Отправить в пассив до:</p>
            <input type="date" />
          </div> */}
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

export default TechnicalServicesModal;
