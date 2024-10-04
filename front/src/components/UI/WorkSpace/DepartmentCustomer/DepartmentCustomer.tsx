import { useState } from "react";
import ServicesList from "../../ServicesList/ServicesList";
import Services from "./Services/Services";

import "./DepartmentCustomer.css";
import CertificateContent from "./Certificate/CertificateContent";
import Token from "./Token/Token";
import TokenList from "../../TokenList/TokenList";
import CertificateRevocation from "./CertificatesCenter/CertificateRevocation/CertificateRevocationList/CertificateRevocationList";

import InstallCertificate from "./Installing a certificate/InstallCertificate";
import CreateOrganizationCard from "./Create organization card/CreateOrganizationCard";

const DepartmentCustomer = ({ rqstsDataById, currentOrganization, stageOne, stageTwo }: any) => {
  const [showServicesList, setShowServicesList] = useState<boolean>(false);

  const [showTokenList, setShowTokenList] = useState<boolean>(false);

  const handleShowServicesList = (state: boolean) => {
    setShowServicesList(state);
  };

  const handleShowTokenList = (state: boolean) => {
    setShowTokenList(state);
  };

  console.log(rqstsDataById);

  return (
    <>
      <div className="column-stage">
        {stageOne}
        <CertificateRevocation />
      </div>
      {/* Данный компонент нужен для другого запроса "Создание карточки организации и идентификации в системе ISEDO" */}
      {/* {rqstsDataById?.stepTask === 3 && (
        <>
          <div className="column-stage">
            {stageTwo}
            <CreateOrganizationCard />
          </div>
        </>
      )} */}
      {rqstsDataById?.stepTask === 3 && (
        <>
          <div className="column-stage">
            {stageTwo}
            <InstallCertificate rqstsDataById={rqstsDataById} currentOrganization={currentOrganization}/>
          </div>
        </>
      )}

      {/* Закрывается при нажатии на кнопку Сохранить */}
      {/* {showServicesList && (
        <ServicesList handleShowServicesList={handleShowServicesList} />
      )} */}
      {/* Открывает список ServicesList при нажатии на кнопку Услуги */}
      {/* {!showServicesList && !showTokenList && (
        <Services handleShowServicesList={handleShowServicesList} />
      )} */}
      {/* Закрывает блок CertificateContent при открытие ServicesList */}
      {/* {!showServicesList && !showTokenList && <CertificateContent />} */}
      {/* Закрывает Token при нажатии на кнопку Токен */}
      {/* {!showTokenList && !showServicesList && (
        <Token
          setShowTokenList={setShowTokenList}
          handleShowTokenList={handleShowTokenList}
        />
      )} */}
      {/* Открывает TokenList при нажатии на кнопку Токен */}
      {/* {showTokenList && <TokenList handleShowTokenList={handleShowTokenList} />} */}
    </>
  );
};

export default DepartmentCustomer;
