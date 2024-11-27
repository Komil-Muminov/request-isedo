import CreateVPNTFMIS from "./Create VPN of TFMIS/CreateVPNTFMIS";
import "./Passive VPN of TFMIS/PassiveVPNTFMIS";
import PassiveVPNTFMIS from "./Passive VPN of TFMIS/PassiveVPNTFMIS";

const TechnicalServices = ({
  currentUser,
  rqstsDataById,
  currentOrganization,
  stageOne,
  stageTwo,
  executor,
}: any) => {
  return (
    <>
      {stageOne && (
        <div className="column-stage">
          {stageOne}
          <PassiveVPNTFMIS
            currentOrganization={currentOrganization}
            executor={executor}
            rqstsDataById={rqstsDataById}
          />
        </div>
      )}
      {stageTwo && (
        <div className="column-stage">
          {stageTwo}
          <CreateVPNTFMIS
            rqstsDataById={rqstsDataById}
            currentUser={currentUser}
            currentOrganization={currentOrganization}
            executor={executor}
          />
        </div>
      )}
    </>
  );
};

export default TechnicalServices;
