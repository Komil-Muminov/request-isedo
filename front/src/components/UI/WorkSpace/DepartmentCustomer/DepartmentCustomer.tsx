import { useState } from "react";
import ServicesList from "../../ServicesList/ServicesList";
import Services from "./Services/Services";

import "./DepartmentCustomer.css";
import CertificateContent from "./Certificate/CertificateContent";
import Token from "./Token/Token";
import TokenList from "../../TokenList/TokenList";
import CertificateRevocation from "./CertificatesCenter/CertificateRevocation/CertificateRevocationList/CertificateRevocationList";

const ServicesContent = () => {
  const [showServicesList, setShowServicesList] = useState<boolean>(false);

  const [showTokenList, setShowTokenList] = useState<boolean>(false);

  const handleShowServicesList = (state: boolean) => {
    setShowServicesList(state);
  };

  const handleShowTokenList = (state: boolean) => {
    setShowTokenList(state);
  };

  return (
    <>
      <CertificateRevocation />

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

export default ServicesContent;
