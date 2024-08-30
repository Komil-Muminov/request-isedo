import { useState } from "react";
import ServicesList from "../../ServicesList/ServicesList";
import Services from "./Services/Services";

import "./DepartmentCustomer.css";
import CertificateContent from "./Certificate/CertificateContent";
import Token from "./Token/Token";

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
      {showServicesList && (
        <ServicesList handleShowServicesList={handleShowServicesList} />
      )}
      {!showServicesList && (
        <Services handleShowServicesList={handleShowServicesList} />
      )}
      {!showServicesList && <CertificateContent />}
      <Token handleShowTokenList={handleShowTokenList} />
    </>
  );
};

export default ServicesContent;
