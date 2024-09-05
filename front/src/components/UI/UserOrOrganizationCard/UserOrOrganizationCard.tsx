import "./UserOrOrganizationCard.css";

const UserOrOrganizationCard = ({ uinfo, CorporateFareIcon }: any) => {
  return (
    <div className="info-accountant">
      <div className="wrapper-info">
        <div className="wrapper-image">
          <img src={`http://localhost:3000${uinfo?.photo}`} alt="" />
          {CorporateFareIcon && <CorporateFareIcon />}
        </div>
        <div className="wrapper-text">
          <h2>Шарипов Амир</h2>
          <p>
            <span>ИНН:</span> 250001455
          </p>
          <p>
            <span>Номер телефона:</span> 88-000-86-71
          </p>
          <p>
            <span>E-mail адрес:</span> jsharipovamir@gmail.com
          </p>
          <p>
            <span>Паспорт:</span> A0644063
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserOrOrganizationCard;
