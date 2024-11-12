import React from "react";
import TitleDocument from "../../../../UI/TitleDocument/TitleDocument";
import { TextField } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UserOrOrganizationCard from "../../../../UI/UserOrOrganizationCard/UserOrOrganizationCard";
import FileService from "../../../../UI/File Services/FileService";

const TokenIssuance = ({ currentUser, currentOrganization }: any) => {
  return (
    <>
      <section className="old-accountant">
        <TitleDocument title="Пользователь системы" />
        <div className="wrapper-cards">
          <UserOrOrganizationCard
            currentUser={currentUser}
            title="Карточка пользователя"
            // newFileService={<FileService handleGetFile={handleGetFile} />}
            // requiredFile={fileInfo[0]?.name}
            // handleFileUploadedStatus={handleFileUploadedStatus}
            // uploadedFile={files}
            // requiredDocuments={
            //   <ul className="required-documents">
            //     <p>Необходимые документы:</p>
            //     <li>
            //       {fileUploadedStatus ? (
            //         <CheckCircleOutlineIcon sx={{ color: "green" }} />
            //       ) : (
            //         <HighlightOffIcon sx={{ color: "red" }} />
            //       )}
            //       <p>{fileInfo[0]?.name}</p>
            //     </li>
            //   </ul>
            // }
          />
          <UserOrOrganizationCard
            currentOrganization={currentOrganization}
            title="Карточка организации"
          />
        </div>
      </section>
    </>
  );
};

export default TokenIssuance;
