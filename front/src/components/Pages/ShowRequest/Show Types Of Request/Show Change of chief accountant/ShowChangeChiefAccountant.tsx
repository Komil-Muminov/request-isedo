import React from "react";
import TitleDocument from "../../../../UI/TitleDocument/TitleDocument";
import UserOrOrganizationCard from "../../../../UI/UserOrOrganizationCard/UserOrOrganizationCard";
import PDFViewerService from "../../../../UI/PDF Viewer Service/PDFViewerService";
import ButtonPanelControl from "../../../../UI/ButtonPanelControl/ButtonPanelControl";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { departments } from "../../../../API/Data/Departments/Departments";
import WorkSpaceChangeOfChiefAccountant from "../../../../UI/WorkSpace/Workspace Change Of Chief Accountant/WorkSpaceChangeOfChiefAccountant";
import { TextField } from "@mui/material";

const ShowChangeChiefAccountant = ({
  currentUser,
  fileInfo,
  currentOrganization,
  rqstsDataById,
  uinfo,
  handleCheckRequest,
}: any) => {
  return (
    <>
      {" "}
      <section className="old-accountant">
        <TitleDocument title="Прошлый главный бухгалтер" />
        <div className="wrapper-cards">
          <UserOrOrganizationCard
            currentUser={currentUser}
            title="Карточка пользователя"
            PDFViewerService={<PDFViewerService item={fileInfo[0]} />}
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
        <TitleDocument title="Новый главный бухгалтер" />
        <div className="wrapper-cards">
          <UserOrOrganizationCard
            currentUser={rqstsDataById}
            userType={uinfo?.uType}
            title="Карточка пользователя"
            PDFViewerService={
              <div className="wrapper-new-user-files">
                <PDFViewerService
                  currentFiles={rqstsDataById?.files}
                  hideFirstItem={true}
                />
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
      {/* Рабочее пространство */}
      {uinfo?.uType !== "bo" && rqstsDataById?.status && (
        <WorkSpaceChangeOfChiefAccountant
          currentUser={currentUser}
          rqstsDataById={rqstsDataById}
          currentOrganization={currentOrganization}
        />
      )}
    </>
  );
};

export default ShowChangeChiefAccountant;
