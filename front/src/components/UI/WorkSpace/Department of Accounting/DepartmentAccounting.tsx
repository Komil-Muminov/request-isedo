import CreateInvoice from "./Create Invoice/CreateInvoice";
import "./DepartmentAccounting.css";

const DepartmentAccounting = ({
  //   currentUser,
  rqstsDataById,
  currentOrganization,
  stageThree,
  executor,
}: any) => {
  return (
    <>
      {stageThree && (
        <div className="column-stage">
          {stageThree}
          <CreateInvoice
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            executor={executor}
          />
        </div>
      )}
    </>
  );
};

export default DepartmentAccounting;
