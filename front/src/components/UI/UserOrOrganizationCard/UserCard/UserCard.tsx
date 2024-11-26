import "../UserOrOrganizationCard.css";
import sampleImage from "../../../../../../back/uploads/929493.png";

const UserCard = ({ currentUser }: any) => {
  return (
    <div className="info-accountant">
      <div className="wrapper-info">
        <div className="wrapper-image">
          <img
            src={
              currentUser?.photo
                ? `http://localhost:3000/uploads/${currentUser?.photo}`
                : sampleImage
            }
            alt=""
          />
        </div>
        <div className="wrapper-text">
          <h2>{currentUser ? currentUser?.fullName : "Имя не заполнено"}</h2>
          <p>
            <span>ИНН:</span>{" "}
            {currentUser ? currentUser?.tax : "ИНН не заполнен"}
          </p>
          <p>
            <span>Номер телефона:</span>{" "}
            {currentUser ? currentUser?.phone : "Номер не заполнен"}
          </p>
          <p>
            <span>E-mail адрес:</span>{" "}
            {currentUser ? currentUser?.email : "Почта не заполнена"}
          </p>
          <p>
            <span>Паспорт:</span>{" "}
            {currentUser ? currentUser?.passport : "Паспорт не заполнен"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
