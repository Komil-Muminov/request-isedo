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

const ChangeChiefAccountant = ({
  currentUser,
  handleGetFile,
  fileInfo,
  handleFileUploadedStatus,
  files,
  fileUploadedStatus,
  currentOrganization,
  firstRequiredFile,
  secondRequiredFile,
  register,
}: any) => {
  return (
    <>
      <section className="old-accountant">
        <TitleDocument title="Прошлый главный бухгалтер" />
        <div className="wrapper-cards">
          <UserOrOrganizationCard
            currentUser={currentUser}
            title="Карточка пользователя"
            newFileService={<FileService handleGetFile={handleGetFile} />}
            requiredFile={fileInfo[0]?.name}
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
                  <p>{fileInfo[0]?.name}</p>
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
        <TitleDocument title="Новый главный бухгалтер" />
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
                  Наличие токена
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
                  Наличие логина iMoF
                </InputLabel>
                <Select
                  {...register("loginImof")}
                  labelId="demo-simple-select-label"
                  id="loginImof"
                  label="loginImof"
                >
                  <MenuItem value="Есть">Есть</MenuItem>
                  <MenuItem value="Нет">Нет</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FileService />
            <ul className="required-documents">
              <p>Необходимые документы:</p>
              <li>
                {firstRequiredFile ? (
                  <CheckCircleOutlineIcon sx={{ color: "green" }} />
                ) : (
                  <HighlightOffIcon sx={{ color: "red" }} />
                )}
                <p>{fileInfo[1]?.name}</p>
              </li>
              <li>
                {secondRequiredFile ? (
                  <CheckCircleOutlineIcon sx={{ color: "green" }} />
                ) : (
                  <HighlightOffIcon sx={{ color: "red" }} />
                )}
                <p>{fileInfo[2]?.name}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangeChiefAccountant;
