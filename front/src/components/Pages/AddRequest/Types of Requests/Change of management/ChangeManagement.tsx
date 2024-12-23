import React from "react";
import TitleDocument from "../../../../UI/TitleDocument/TitleDocument";
import UserOrOrganizationCard from "../../../../UI/UserOrOrganizationCard/UserOrOrganizationCard";
import FileService from "../../../../UI/File Services/FileService";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ChangeManagement = ({
  currentUser,
  handleGetFile,
  fileInfo,
  handleFileUploadedStatus,
  files,
  fileUploadedStatus,
  currentOrganization,
  firstRequiredFile,
  secondRequiredFile,
  thirdRequiredFile,
  register,
}: any) => {
  return (
    <>
      <section className="old-accountant">
        <TitleDocument title="Прошлый руководитель" />
        <div className="wrapper-cards">
          <UserOrOrganizationCard
            currentUser={currentUser}
            title="Карточка пользователя"
            newFileService={<FileService handleGetFile={handleGetFile} />}
            requiredFile={fileInfo[3]?.name}
            handleFileUploadedStatus={handleFileUploadedStatus}
            uploadedFile={files}
            requiredDocuments={
              <ul className="required-documents">
                <p>Необходимые документы:</p>
                <li>
                  {fileUploadedStatus ? (
                    <CheckCircleOutlineIcon sx={{ color: "green" }} />
                  ) : (
                    <HighlightOffIcon sx={{ color: "red" }} />
                  )}
                  <p>{fileInfo[3]?.name}</p>
                </li>
              </ul>
            }
            // fileService={
            //   <CardFileService
            //     item={fileInfo[0]}
            //     handleGetFile={handleGetFile}
            //     getFile={getFile}
            //   />
            // }
          />
          <UserOrOrganizationCard
            currentOrganization={currentOrganization}
            title="Карточка организации"
          />
        </div>
      </section>
      <section className="new-accountant">
        <TitleDocument title="Новый руководитель" />
        <div className="wrapper-cards wrapper-cards-padding">
          <div className="inputs-list">
            <TextField
              {...register("fullName")}
              type="text"
              id="fullName"
              className="request_inp"
              // KM
              label="ФИО"
            />
            <TextField
              {...register("tax")}
              id="tax"
              type="text"
              className="request_inp"
              label="ИНН"
            />
            <TextField
              {...register("phone")}
              id="phone"
              type="text"
              className="request_inp"
              label="Номер телефона"
            />
            <TextField
              {...register("email")}
              id="email"
              type="text"
              className="request_inp"
              label="E-mail адрес"
            />
            <TextField
              {...register("passport")}
              id="passport"
              type="text"
              className="request_inp"
              label="Серия и номер паспорта"
            />
            <TextField
              {...register("role")}
              id="role"
              type="text"
              className="request_inp"
              label="Должность"
            />
            {/* test commit  */}
            <Box className="request_inp" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Укажите, есть ли у вас токен
                </InputLabel>
                <Select
                  {...register("token")}
                  labelId="demo-simple-select-label"
                  id="token"
                  label="token"
                >
                  <MenuItem value="Есть">Есть</MenuItem>
                  <MenuItem value="Нет">Нет</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className="request_inp" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Выберите заявку
                </InputLabel>
                <Select
                  {...register("token")}
                  labelId="demo-simple-select-label"
                  id="token"
                  label="token"
                >
                  <MenuItem value="Есть">
                    Заявка на получение доступов в ИСУГФ - TFMIS
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              {...register("certificateSeries")}
              id="certificateSeries"
              type="text"
              className="request_inp"
              label="Серия сертификата"
            />
            <FileService />
            <ul className="required-documents">
              <p>Необходимые документы:</p>
              <li>
                {secondRequiredFile ? (
                  <CheckCircleOutlineIcon sx={{ color: "green" }} />
                ) : (
                  <HighlightOffIcon sx={{ color: "red" }} />
                )}
                <p>{fileInfo[4]?.name}</p>
              </li>
              <li>
                {thirdRequiredFile ? (
                  <CheckCircleOutlineIcon sx={{ color: "green" }} />
                ) : (
                  <HighlightOffIcon sx={{ color: "red" }} />
                )}
                <p>{fileInfo[5]?.name}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangeManagement;
