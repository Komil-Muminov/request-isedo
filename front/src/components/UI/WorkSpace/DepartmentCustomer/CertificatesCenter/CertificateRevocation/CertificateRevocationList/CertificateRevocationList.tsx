import "./CertificateRevocationList.css";

import { useState } from "react";

import GppBadIcon from "@mui/icons-material/GppBad";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import certificateIcon from "../../../../../../../assets/certificateIcons.png";

import closedHand from "../../../../../../../assets/closedhand.svg";
import pointingHand from "../../../../../../../assets/pointinghand.svg";

import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CertificateRevocationModal from "../CertificateRevocationModal/CertificateRevocationModal";
import ButtonPanelControl from "../../../../../ButtonPanelControl/ButtonPanelControl";

const CertificateRevocationList = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const [show, setShow] = useState<boolean>(false);

  const handleShow = (state: boolean) => {
    setShow(state);
  };

  console.log(show);

  return (
    <>
      <div className="certificate-content">
        <div className="panel-control-certificate-revocation">
          <div className="certificates-revocation-title">
            <CardMembershipIcon />
            <p>Отзыв сертификата</p>
          </div>
          <ButtonPanelControl
            icon={<GppBadIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
            text="Отозвать"
            handleShow={handleShow}
          />
        </div>
        <div className="table-container">
          <table className="table-certificate-list">
            <thead>
              <tr>
                <th>Код запроса</th>
                <th>Организация запроса</th>
                <th>Подразделение запроса</th>
                <th>Общее имя запроса</th>
                <th>Город запроса</th>
                <th>Область/республика запроса</th>
                <th>Действителен с</th>
                <th>Действителен до</th>
                <th>Экспорт</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  cursor: isMouseDown
                    ? `url(${closedHand}), auto`
                    : `url(${pointingHand}), auto`,
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // Для сброса состояния при выходе мыши
              >
                <td>
                  <div className="content">
                    <img src={certificateIcon} alt="" />
                    <p>57378</p>
                  </div>
                </td>
                <td>МТМУ №78 н Фирдавси</td>
                <td>030014613</td>
                <td>Бывшиев Бухгалтеров</td>
                <td>077152671/906360603</td>
                <td>Душанбе</td>
                <td>23.09.2023</td>
                <td>24.09.2024</td>
                <td>
                  <FileDownloadOutlinedIcon />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {show && <CertificateRevocationModal handleShow={handleShow} />}
    </>
  );
};

export default CertificateRevocationList;
