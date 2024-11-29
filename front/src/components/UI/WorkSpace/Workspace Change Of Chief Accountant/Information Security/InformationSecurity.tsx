import React from "react";
import PassiveLoginTFMIS from "./Passive login of TFMIS/PassiveLoginTFMIS";
import CreateLoginTFMIS from "./Create Login of TFMIS/CreateLoginTFMIS";

const InformationSecurity = ({
  currentUser,
  currentAccountant,
  rqstsDataById,
  currentOrganization,
  stageOne,
  stageTwo,
  executor,
  currentCertificateUser,
  currentCertificateUserAccountant,
}: any) => {
  return (
    <>
      {stageOne && (
        <div className="column-stage">
          {stageOne}
          <PassiveLoginTFMIS
            currentUser={currentUser}
            currentAccountant={currentAccountant}
            executor={executor}
            rqstsDataById={rqstsDataById}
          />
        </div>
      )}
      {stageTwo && (
        <div className="column-stage">
          {stageTwo}
          <CreateLoginTFMIS
            rqstsDataById={rqstsDataById}
            currentUser={currentUser}
            currentOrganization={currentOrganization}
            executor={executor}
            currentCertificateUser={currentCertificateUser}
            currentCertificateUserAccountant={currentCertificateUserAccountant}
          />
        </div>
      )}
    </>
  );
};

export default InformationSecurity;
