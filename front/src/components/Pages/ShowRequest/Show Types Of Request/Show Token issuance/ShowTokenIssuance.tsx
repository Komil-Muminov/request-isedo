import React from "react";
import TitleDocument from "../../../../UI/TitleDocument/TitleDocument";
import UserOrOrganizationCard from "../../../../UI/UserOrOrganizationCard/UserOrOrganizationCard";
import PDFViewerService from "../../../../UI/PDF Viewer Service/PDFViewerService";
import ButtonPanelControl from "../../../../UI/ButtonPanelControl/ButtonPanelControl";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkSpace from "../../../../UI/WorkSpace/WorkSpace";
import { departments } from "../../../../API/Data/Departments/Departments";

const ShowTokenIssuance = ({
  currentOrganization,
  rqstsDataById,
  uinfo,
  disabledAddUserButton,
  currentUser,
}: any) => {
  return (
    <>
      <section className="new-accountant">
        <TitleDocument title="Пользователь системы" />
        <div className="wrapper-cards">
          <UserOrOrganizationCard
            currentUser={rqstsDataById}
            userType={uinfo?.uType}
            title="Карточка пользователя"
          />
          <UserOrOrganizationCard
            currentOrganization={currentOrganization}
            title="Карточка организации"
          />
        </div>
      </section>
      {/* Рабочее пространство */}
      {uinfo?.uType !== "bo" && (
        <WorkSpace
          currentUser={currentUser}
          rqstsDataById={rqstsDataById}
          currentOrganization={currentOrganization}
          departmentsList={[departments[0]]}
        />
      )}
    </>
  );
};

export default ShowTokenIssuance;
