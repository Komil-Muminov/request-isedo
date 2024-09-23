import "./UserOrOrganizationCard.css";

const UserOrOrganizationCard = ({
  uinfo,
  CorporateFareIcon,
  title,
  fileService,
}: any) => {
  return (
    <div
      className={`wrapper-accountant ${
        title == "Карточка пользователя" ? "card-splitting" : ""
      }`}
    >
      <p className="card-title">{title}</p>
      <div className="info-accountant">
        <div className="wrapper-info">
          <div className="wrapper-image">
            {CorporateFareIcon ? (
              <CorporateFareIcon sx={{ fontSize: "100px" }} />
            ) : (
              <img src={`http://localhost:3000${uinfo?.photo}`} alt="" />
            )}
          </div>
          <div className="wrapper-text">
            <h2>{uinfo ? uinfo?.fullName : "ООО Центр ФИНТЕХ"}</h2>
            <p>
              <span>ИНН:</span> {uinfo ? uinfo?.tax : "040001802"}
            </p>
            <p>
              <span>Номер телефона:</span> {uinfo ? uinfo?.phone : "800 80 80"}
            </p>
            <p>
              <span>E-mail адрес:</span>{" "}
              {uinfo ? uinfo?.email : "center.fintex@gmail.com"}
            </p>
            {title === "Карточка пользователя" && (
              <p>
                <span>Паспорт:</span> A0644063
              </p>
            )}
          </div>
        </div>
      </div>
      {uinfo && <p className="card-documents">Необходимые документы</p>}
      <div className="wrapper-card-file-service">{fileService}</div>
    </div>
  );
};

export default UserOrOrganizationCard;
