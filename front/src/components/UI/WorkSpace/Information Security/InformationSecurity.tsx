import React from "react";
import PassiveLoginTFMIS from "./Passive login of TFMIS/PassiveLoginTFMIS";
import CreateLoginTFMIS from "./Create Login of TFMIS/CreateLoginTFMIS";

const InformationSecurity = ({
  currentUser,
  rqstsDataById,
  currentOrganization,
  stageOne,
  stageTwo,
}: any) => {
  return (
    <>
      <div className="column-stage">
        {stageOne}
        <PassiveLoginTFMIS currentUser={currentUser} />
      </div>
      {rqstsDataById?.stepTask >= 3 && (
        <div className="column-stage">
          {stageTwo}
          <CreateLoginTFMIS
            rqstsDataById={rqstsDataById}
            currentUser={currentUser}
            currentOrganization={currentOrganization}
            //   currentOrganization={currentOrganization}
            //   getCertificateUser={getCertificateUser}
          />
        </div>
      )}
    </>
  );
};

export default InformationSecurity;
