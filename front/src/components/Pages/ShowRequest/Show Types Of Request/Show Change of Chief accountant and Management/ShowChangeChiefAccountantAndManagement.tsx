import React from "react";
import TitleDocument from "../../../../UI/TitleDocument/TitleDocument";
import UserOrOrganizationCard from "../../../../UI/UserOrOrganizationCard/UserOrOrganizationCard";
import PDFViewerService from "../../../../UI/PDF Viewer Service/PDFViewerService";
import ButtonPanelControl from "../../../../UI/ButtonPanelControl/ButtonPanelControl";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { departments } from "../../../../API/Data/Departments/Departments";
import WorkSpaceChangeOfChiefAccountant from "../../../../UI/WorkSpace/Workspace Change Of Chief Accountant/WorkSpaceChangeOfChiefAccountant";
import WorkSpaceChangeManagement from "../../../../UI/WorkSpace/Workspace Change Of Management/WorkSpaceChangeManagement";
import WorkSpaceChangeOfChiefAccountantAndManagement from "../../../../UI/WorkSpace/Workspace Change Of Chief Accountant and Management/WorkSpaceChangeOfChiefAccountantAndManagement";
import { TextField } from "@mui/material";

const ShowChangeChiefAccountantAndManagement = ({
  fileInfo,
  currentOrganization,
  rqstsDataById,
  uinfo,
  currentAccountant,
  currentManagement,
  handleCheckRequest,
}: any) => {
  const ManagementFilesTemp = rqstsDataById?.files.filter((e: any) => {
    if (e.fileName.includes("рохбар")) {
      return e;
    }
  });

  const AccountantFilesTemp = rqstsDataById?.files.filter((e: any) => {
    if (e.fileName.includes("сармухосиб")) {
      return e;
    }
  });

  const oldUsersFiles = rqstsDataById?.files.filter((e: any) => {
    if (e.fileName.includes("озод")) {
      return e;
    }
  });

  const ManagementFiles = [ManagementFilesTemp[1], ManagementFilesTemp[2]];

  const AccountantFiles = [AccountantFilesTemp[1], AccountantFilesTemp[2]];

  console.log(ManagementFilesTemp);

  const RequestManagementData = {
    id: rqstsDataById?.id,
    userId: rqstsDataById?.userId,
    organizationId: rqstsDataById?.organizationId,
    services: rqstsDataById?.services,
    dataChange: rqstsDataById?.dataChange,
    files: rqstsDataById?.files,
    stepCode: rqstsDataById?.stepCode,
    stepTask: rqstsDataById?.stepTask,
    reqType: rqstsDataById?.reqType,
    fullName: rqstsDataById?.fullName,
    tax: rqstsDataById?.tax,
    phone: rqstsDataById?.phone,
    email: rqstsDataById?.email,
    passport: rqstsDataById?.passport,
    role: rqstsDataById?.role,
    token: rqstsDataById?.token,
    certificateSeries: rqstsDataById?.certificateSeries,
    status: rqstsDataById?.status,
    password: rqstsDataById?.password,
  };

  const RequestAccountantData = {
    id: rqstsDataById?.id,
    userId: rqstsDataById?.userId,
    organizationId: rqstsDataById?.organizationId,
    services: rqstsDataById?.services,
    dataChange: rqstsDataById?.dataChange,
    files: rqstsDataById?.files,
    stepCode: rqstsDataById?.stepCode,
    stepTask: rqstsDataById?.stepTask,
    reqType: rqstsDataById?.reqType,
    fullName: rqstsDataById?.fullNameAccountant,
    tax: rqstsDataById?.taxAccountant,
    phone: rqstsDataById?.phoneAccountant,
    email: rqstsDataById?.emailAccountant,
    passport: rqstsDataById?.passportAccountant,
    role: rqstsDataById?.roleAccountant,
    token: rqstsDataById?.tokenAccountant,
    certificateSeries: rqstsDataById?.certificateSeries,
    status: rqstsDataById?.status,
    password: rqstsDataById?.passwordAccountant,
  };

  return (
    <>
      {" "}
      <section className="old-accountant">
        <TitleDocument title="Прошлый руководитель" />
        <div className="wrapper-cards">
          <UserOrOrganizationCard
            currentManager={currentManagement}
            currentUser={currentAccountant}
            title="Карточка пользователя"
            PDFViewerService={<PDFViewerService currentFiles={oldUsersFiles} />}
            // fileService={
            //   <CardFileService
            //     item={fileInfo[0]}
            //     rqstsDataById={rqstsDataById}
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
        <div className="wrapper-cards">
          <UserOrOrganizationCard
            currentUser={RequestManagementData}
            userType={uinfo?.uType}
            title="Карточка пользователя"
            PDFViewerService={
              <div className="wrapper-new-user-files">
                <PDFViewerService currentFiles={ManagementFiles} />
              </div>
            }
            checkUser={
              <div
                style={{
                  padding: "0px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <TextField label="ИНН" fullWidth />
                <TextField label="ФИО" fullWidth />

                <div
                  className="panel-check-user"
                  style={{ justifyContent: "end" }}
                >
                  <ButtonPanelControl
                    icon={
                      <PersonSearchIcon
                        sx={{ fontSize: "18px", fontWeight: "bold" }}
                      />
                    }
                    text="Проверить заявку"
                    activeSendButton={rqstsDataById?.status}
                    handleSubmit={handleCheckRequest}
                  />
                </div>
              </div>
            }
          />
          <UserOrOrganizationCard
            currentOrganization={currentOrganization}
            title="Карточка организации"
          />
        </div>
      </section>
      <section className="new-accountant">
        <TitleDocument title="Новый главный бухгалтер" />
        <div className="wrapper-cards">
          <UserOrOrganizationCard
            currentUser={RequestAccountantData}
            userType={uinfo?.uType}
            title="Карточка пользователя"
            PDFViewerService={
              <div className="wrapper-new-user-files">
                <PDFViewerService currentFiles={AccountantFiles} />
              </div>
            }
            checkUser={
              <div
                style={{
                  padding: "0px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <TextField label="ИНН" fullWidth />
                <TextField label="ФИО" fullWidth />

                <div
                  className="panel-check-user"
                  style={{ justifyContent: "end" }}
                >
                  <ButtonPanelControl
                    icon={
                      <PersonSearchIcon
                        sx={{ fontSize: "18px", fontWeight: "bold" }}
                      />
                    }
                    text="Проверить заявку"
                    activeSendButton={rqstsDataById?.status}
                  />
                </div>
              </div>
            }
          />
          <UserOrOrganizationCard
            currentOrganization={currentOrganization}
            title="Карточка организации"
          />
        </div>
      </section>
      {/* Рабочее пространство */}
      {uinfo?.uType !== "bo" && rqstsDataById?.status && (
        <WorkSpaceChangeOfChiefAccountantAndManagement
          currentUser={currentManagement}
          currentAccountant={currentAccountant}
          rqstsDataById={rqstsDataById}
          currentOrganization={currentOrganization}
        />
      )}
    </>
  );
};

export default ShowChangeChiefAccountantAndManagement;
