import "./UserOrOrganizationCard.css";
import sampleImage from "../../../../../back/uploads/929493.png";

const UserOrOrganizationCard = ({
  uinfo,
  CorporateFareIcon,
  title,
  fileService,
}: any) => {
  console.log(sampleImage);

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
              <img
                src={
                  uinfo?.photo
                    ? `http://localhost:3000${uinfo?.photo}`
                    : sampleImage
                }
                alt=""
              />
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
                <span>Паспорт:</span> {uinfo ? uinfo?.passport : ""}
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
