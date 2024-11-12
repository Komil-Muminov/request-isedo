import React from "react";
import TitleDocument from "../../../../UI/TitleDocument/TitleDocument";
import UserOrOrganizationCard from "../../../../UI/UserOrOrganizationCard/UserOrOrganizationCard";
import PDFViewerService from "../../../../UI/PDF Viewer Service/PDFViewerService";
import ButtonPanelControl from "../../../../UI/ButtonPanelControl/ButtonPanelControl";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const ShowChangeChiefAccountant = ({
  currentUser,
  fileInfo,
  currentOrganization,
  rqstsDataById,
  uinfo,
  disabledAddUserButton,
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
              <div className="panel-check-user">
                <ButtonPanelControl
                  icon={
                    <PersonSearchIcon
                      sx={{ fontSize: "18px", fontWeight: "bold" }}
                    />
                  }
                  text="Проверить заявку"
                  activeSendButton={disabledAddUserButton}
                />
              </div>
            }
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

export default ShowChangeChiefAccountant;
