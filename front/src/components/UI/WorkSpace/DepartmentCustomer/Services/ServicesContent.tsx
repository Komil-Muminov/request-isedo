import { useState } from "react";
import ServicesList from "../../../Services/ServicesList";
import Services from "../../../Services/Services";

import "./ServicesContent.css";
import CertificateContent from "../Certificate/CertificateContent";

const ServicesContent = () => {
  const [showServicesList, setShowServicesList] = useState<boolean>(false);

  const handleShowServicesList = (state: boolean) => {
    setShowServicesList(state);
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
    </>
  );
};

export default ServicesContent;
