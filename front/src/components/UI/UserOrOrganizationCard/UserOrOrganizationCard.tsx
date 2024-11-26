import "./UserOrOrganizationCard.css";

import UserCard from "./UserCard/UserCard";
import OrganizationCard from "./OrganizationCard/OrganizationCard";

const UserOrOrganizationCard = ({
  currentUser,
  currentManager,
  currentOrganization,
  title,
  fileService,
  newFileService,
  PDFViewerService,
  checkUser,
  requiredDocuments,
  requiredFile,
  handleFileUploadedStatus,
  uploadedFile,
  userType,
}: any) => {

  const currentFile = uploadedFile?.some(
    (e: any) => e.fileName === requiredFile
  );

  if (currentFile) handleFileUploadedStatus(currentFile);

  return (
    <div
      className={`wrapper-accountant ${
        title == "Карточка пользователя" ? "card-splitting" : ""
      }`}
    >
      <p className="card-title">{title}</p>
      {currentUser && <UserCard currentUser={currentUser} />}
      {currentManager && <UserCard currentUser={currentManager} />}
      {currentOrganization && (
        <OrganizationCard currentOrganization={currentOrganization} />
      )}
      {currentUser && currentOrganization && (
        <p className="card-documents">Необходимые документы</p>
      )}
      {newFileService && (
        <div className="new-card-service-content">{newFileService}</div>
      )}

      {requiredDocuments}
      {PDFViewerService && (
        <div className="wrapper-pdf-viewer-service">{PDFViewerService}</div>
      )}
      {/* <div className="wrapper-card-file-service">{fileService}</div> */}
      {userType !== "bo" && checkUser}
    </div>
  );
};

export default UserOrOrganizationCard;
