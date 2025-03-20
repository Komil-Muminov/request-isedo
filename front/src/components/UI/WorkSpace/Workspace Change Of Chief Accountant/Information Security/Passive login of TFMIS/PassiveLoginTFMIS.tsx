import "./PassiveLoginTFMIS.css";

import { useState } from "react";

import ButtonPanelControl from "../../../../ButtonPanelControl/ButtonPanelControl";

import NoAccountsIcon from "@mui/icons-material/NoAccounts";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../../../queryClient";
import { TGetUsers } from "../../../../../API/GetUsers";

import { putUserById } from "../../../../../API/PutUserById";
import LoginTfmisCard from "../Login of TFMIS Card/LoginTfmisCard";
import PassiveLoginTFMISModal from "../../../../Passive Login of TFMIS Modal/PassiveLoginTFMISModal";
import { putRqstsById, PutRqstsByIdType } from "../../../../../API/PutRqstById";

const PassiveLoginTFMIS = ({
  currentUser,
  currentAccountant,
  executor,
  rqstsDataById,
}: any) => {
  // GET USERS

  const [show, setShow] = useState<boolean>(false);

  const handleShow = (state: boolean) => {
    setShow(state);
  };

  // Мутация для обновления сертификата
  const mutation = useMutation({
    mutationFn: (updatedUser: TGetUsers) => putUserById(updatedUser), // Функция PUT запроса
    onSuccess: () => {
      // Обновляем сертификаты в кэше после изменения
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Ошибка при обновлении сертификата:", error);
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

  // Функция для изменения статуса сертификата
  const handleChangeStatus = () => {
    if (rqstsDataById)
      putRqstsByIdMutation.mutate({
        ...rqstsDataById,
        stepTask: rqstsDataById && rqstsDataById.stepTask + 1,
      });

    if (
      (rqstsDataById?.reqType === "Смена главного бухгалтера" && currentUser) ||
      (rqstsDataById?.reqType === "Смена руководителя" && currentUser) ||
      (rqstsDataById?.reqType === "Смена главного бухгалтера и руководителя" &&
        currentUser)
    ) {
      mutation.mutate({ ...currentUser, status: false });
    }

    if (
      rqstsDataById?.reqType === "Смена главного бухгалтера и руководителя" &&
      currentAccountant
    ) {
      mutation.mutate({ ...currentAccountant, status: false });
    }

    if (
      (rqstsDataById?.reqType === "Выдача сертификата" && currentUser) ||
      (rqstsDataById?.reqType === "Выдача токена и сертификата" && currentUser)
    ) {
      mutation.mutate(currentUser);
    }

    const changedPassword = currentUser?.password.length + 1;

    if (rqstsDataById?.reqType === "Смена пароля" && currentUser) {
      mutation.mutate({
        ...currentUser,
        password: currentUser?.password + changedPassword,
      });

      putRqstsByIdMutation.mutate({
        ...rqstsDataById,
        stepCode: rqstsDataById.stepCode + 2,
      });
    }
  };

  return (
    <>
      <div className="security-content">
        <div className="panel-control-security">
          <div className="security-title">
            {/* <NoAccountsIcon /> */}
            <p>
              {rqstsDataById?.reqType === "Выдача сертификата" ||
              rqstsDataById?.reqType === "Выдача токена и сертификата"
                ? "Обновление сертификата"
                : rqstsDataById?.reqType === "Смена пароля"
                ? "Смена пароля"
                : "Пассив логина"}
            </p>
          </div>
        </div>

        <LoginTfmisCard
          currentUser={currentUser}
          rqstsDataById={rqstsDataById}
        />
        {rqstsDataById?.reqType ===
          "Смена главного бухгалтера и руководителя" && (
          <LoginTfmisCard
            currentUser={currentAccountant}
            rqstsDataById={rqstsDataById}
          />
        )}
        <div className="panel-buttons">
          {currentUser?.status === false && (
            <div className="wrapper-show-executor">
              <p className="show-executor-title">
                Исполнитель: <span>{executor?.fullName}</span>
              </p>
              <p className="show-executor-title">
                Время: <span>{currentUser?.dateChange}</span>
              </p>
            </div>
          )}
          <div className="panel-executor">
            <ButtonPanelControl
              icon={
                <NoAccountsIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
              }
              text={
                rqstsDataById?.reqType === "Выдача сертификата" ||
                rqstsDataById?.reqType === "Выдача токена и сертификата"
                  ? "Обновить сертификат"
                  : rqstsDataById?.reqType === "Смена пароля"
                  ? "Сменить пароль"
                  : "Отправить в пассив"
              }
              handleSubmit={
                (show === false &&
                  rqstsDataById?.reqType === "Выдача сертификата") ||
                (show === false &&
                  rqstsDataById?.reqType === "Выдача токена и сертификата") ||
                (show === false && rqstsDataById?.reqType === "Смена пароля")
                  ? handleChangeStatus
                  : ""
              }
              handleShow={handleShow}
              activeSendButton={
                rqstsDataById?.stepTask > 1 ||
                (rqstsDataById?.reqType === "Смена пароля" &&
                  rqstsDataById?.stepCode >= 3)
              }
            />
          </div>
        </div>
      </div>
      {show &&
        (rqstsDataById?.reqType === "Смена главного бухгалтера" ||
          rqstsDataById?.reqType === "Смена руководителя" ||
          rqstsDataById?.reqType ===
            "Смена главного бухгалтера и руководителя") && (
          <PassiveLoginTFMISModal
            handleShow={handleShow}
            handleChangeStatus={handleChangeStatus}
          />
        )}
    </>
  );
};

export default PassiveLoginTFMIS;
