import "./UserOrOrganizationCard.css";

import UserCard from "./UserCard/UserCard";
import OrganizationCard from "./OrganizationCard/OrganizationCard";

const UserOrOrganizationCard = ({
  currentUser,
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

  console.log(uploadedFile, requiredFile);

  if (currentFile) handleFileUploadedStatus(currentFile);

  return (
    <div
      className={`wrapper-accountant ${
        title == "Карточка пользователя" ? "card-splitting" : ""
      }`}
    >
      <p className="card-title">{title}</p>
      {currentUser && <UserCard currentUser={currentUser} />}
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
      <div className="wrapper-pdf-viewer-service">{PDFViewerService}</div>
      {/* <div className="wrapper-card-file-service">{fileService}</div> */}
      {userType !== "bo" && checkUser}
    </div>
  );
};

export default UserOrOrganizationCard;
