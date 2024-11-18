import { useEffect, useState } from "react";
import ServicesList from "../../../ServicesList/ServicesList";
import Services from "./Services/Services";

import "./DepartmentCustomer.css";
import CertificateContent from "./Certificate/CertificateContent";
import Token from "./Token/Token";
import TokenList from "../../../TokenList/TokenList";
import CertificateRevocation from "./CertificatesCenter/CertificateRevocation/CertificateRevocationList/CertificateRevocationList";

import InstallCertificate from "./Installing a certificate/InstallCertificate";
import CreateOrganizationCard from "./Create organization card/CreateOrganizationCard";
import { useQuery } from "@tanstack/react-query";
import {
  getCertificates,
  TCertificates,
} from "../../../../API/GetCertificates";

const DepartmentCustomer = ({
  rqstsDataById,
  currentOrganization,
  stageOne,
  stageTwo,
  stageThree,
  executor,
}: any) => {
  const [showServicesList, setShowServicesList] = useState<boolean>(false);

  const [showTokenList, setShowTokenList] = useState<boolean>(false);

  const handleShowServicesList = (state: boolean) => {
    setShowServicesList(state);
  };

  const handleShowTokenList = (state: boolean) => {
    setShowTokenList(state);
  };

  const getCertificateQuery = useQuery({
    queryFn: () => getCertificates(),
    queryKey: ["certificates"],
  });

  const [certificates, setCertificates] = useState<TCertificates[]>([]);

  useEffect(() => {
    if (getCertificateQuery.status === "success") {
      setCertificates(getCertificateQuery.data);
    }
  }, [getCertificateQuery]);

  const getCertificateUser = certificates.find(
    (cert) => cert.userName === rqstsDataById?.fullName
  );

  console.log();

  return (
    <>
      {stageOne && (
        <div className="column-stage">
          {stageOne}
          <CertificateRevocation
            rqstsDataById={rqstsDataById}
            certificates={certificates}
            executor={executor}
          />
        </div>
      )}

      {/* Данный компонент нужен для другого запроса "Создание карточки организации и идентификации в системе ISEDO" */}
      {/* {rqstsDataById?.stepTask === 3 && (
        <>
          <div className="column-stage">
            {stageTwo}
            <CreateOrganizationCard />
          </div>
        </>
      )} */}
      {stageTwo && (
        <>
          <div className="column-stage">
            {stageTwo}
            <InstallCertificate
              rqstsDataById={rqstsDataById}
              currentOrganization={currentOrganization}
              getCertificateUser={getCertificateUser}
              executor={executor}
            />
          </div>
        </>
      )}
      {stageThree && (
        <div className="column-stage">
          {stageThree}
          <Services
            handleShowServicesList={handleShowServicesList}
            rqstsDataById={rqstsDataById}
            executor={executor}
          />
        </div>
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
