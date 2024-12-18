import React from "react";
import TitleDocument from "../../../../UI/TitleDocument/TitleDocument";
import UserOrOrganizationCard from "../../../../UI/UserOrOrganizationCard/UserOrOrganizationCard";
import PDFViewerService from "../../../../UI/PDF Viewer Service/PDFViewerService";
import ButtonPanelControl from "../../../../UI/ButtonPanelControl/ButtonPanelControl";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { departments } from "../../../../API/Data/Departments/Departments";
import WorkSpaceTokenIssuance from "../../../../UI/WorkSpace/Workspace Token issuance/WorkSpaceTokenIssuance";
import WorkSpaceCertificateIssuance from "../../../../UI/WorkSpace/Workspace Certificate Issuance/WorkSpaceCertificateIssuance";

const ShowCertificateIssuance = ({
  currentOrganization,
  rqstsDataById,
  uinfo,
  currentUserRequest,
  handleCheckRequest,
  issuanceCertificateUser,
}: any) => {
  return (
    <>
      <section className="new-accountant">
        <TitleDocument title="Пользователь системы" />
        <div className="wrapper-cards">
          <UserOrOrganizationCard
            currentUser={issuanceCertificateUser}
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
        <WorkSpaceCertificateIssuance
          rqstsDataById={rqstsDataById}
          currentOrganization={currentOrganization}
          currentUserRequest={currentUserRequest}
        />
      )}
    </>
  );
};

export default ShowCertificateIssuance;
