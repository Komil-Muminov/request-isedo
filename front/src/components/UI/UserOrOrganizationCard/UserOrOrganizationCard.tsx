import "./UserOrOrganizationCard.css";

import UserCard from "./UserCard/UserCard";
import OrganizationCard from "./OrganizationCard/OrganizationCard";

const UserOrOrganizationCard = ({
  currentUser,
  currentOrganization,
  title,
  fileService,
  newFileService,
  checkUser,
}: any) => {
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
      {/* <div className="new-card-service-content">{newFileService}</div> */}
      <div className="wrapper-card-file-service">{fileService}</div>
      {currentUser && checkUser}
    </div>
  );
};

export default UserOrOrganizationCard;
