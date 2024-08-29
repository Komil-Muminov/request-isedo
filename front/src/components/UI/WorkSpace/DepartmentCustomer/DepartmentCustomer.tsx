import { useState } from "react";
import ServicesList from "../../Services/ServicesList";
import Services from "../../Services/Services";

import "./DepartmentCustomer.css";

const DepartmentCustomer = () => {
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
    </>
  );
};

export default DepartmentCustomer;
