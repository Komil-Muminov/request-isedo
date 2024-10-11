import CreateVPNTFMIS from "./Create VPN of TFMIS/CreateVPNTFMIS";
import "./Passive VPN of TFMIS/PassiveVPNTFMIS";
import PassiveVPNTFMIS from "./Passive VPN of TFMIS/PassiveVPNTFMIS";

const TechnicalServices = ({
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
        <PassiveVPNTFMIS currentOrganization={currentOrganization} />
      </div>
      {rqstsDataById?.stepTask > 3 && (
        <div className="column-stage">
          {stageTwo}
          <CreateVPNTFMIS
            rqstsDataById={rqstsDataById}
            currentUser={currentUser}
            currentOrganization={currentOrganization}
          />
        </div>
      )}
    </>
  );
};

export default TechnicalServices;
