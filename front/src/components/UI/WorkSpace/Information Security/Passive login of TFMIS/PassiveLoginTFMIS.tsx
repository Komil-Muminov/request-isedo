import "./PassiveLoginTFMIS.css";

import { useState } from "react";

import ButtonPanelControl from "../../../ButtonPanelControl/ButtonPanelControl";

import NoAccountsIcon from "@mui/icons-material/NoAccounts";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../../queryClient";
import { TGetUsers } from "../../../../API/GetUsers";

import { putUserById } from "../../../../API/PutUserById";
import LoginTfmisCard from "../Login of TFMIS Card/LoginTfmisCard";
import PassiveLoginTFMISModal from "../../../Passive Login of TFMIS Modal/PassiveLoginTFMISModal";

const PassiveLoginTFMIS = ({ currentUser }: any) => {
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

  // Функция для изменения статуса сертификата
  const handleChangeStatus = () => {
    if (currentUser) mutation.mutate(currentUser);
  };

  return (
    <>
      <div className="security-content">
        <div className="panel-control-security">
          <div className="security-title">
            {/* <NoAccountsIcon /> */}
            <p>Пассив логина</p>
          </div>
        </div>

        <LoginTfmisCard currentUser={currentUser} />

        <div className="panel-executor">
          <ButtonPanelControl
            icon={
              <NoAccountsIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
            }
            text="Отправить в пассив"
            handleShow={handleShow}
          />
        </div>
      </div>
      {show && (
        <PassiveLoginTFMISModal
          handleShow={handleShow}
          handleChangeStatus={handleChangeStatus}
        />
      )}
    </>
  );
};

export default PassiveLoginTFMIS;
