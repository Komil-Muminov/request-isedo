import React from "react";
import PassiveLoginTFMIS from "./Passive login of TFMIS/PassiveLoginTFMIS";
import CreateLoginTFMIS from "./Create Login of TFMIS/CreateLoginTFMIS";

const InformationSecurity = ({
  currentUser,
  rqstsDataById,
  currentOrganization,
  stageOne,
  stageTwo,
  executor,
}: any) => {
  return (
    <>
      <div className="column-stage">
        {stageOne}
        <PassiveLoginTFMIS currentUser={currentUser} executor={executor} />
      </div>
      {rqstsDataById?.stepTask > 3 && (
        <div className="column-stage">
          {stageTwo}
          <CreateLoginTFMIS
            rqstsDataById={rqstsDataById}
            currentUser={currentUser}
            currentOrganization={currentOrganization}
          />
        </div>
      )}
    </>
  );
};

export default InformationSecurity;
