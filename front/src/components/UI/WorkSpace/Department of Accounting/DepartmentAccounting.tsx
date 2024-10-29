import CreateInvoice from "./Create Invoice/CreateInvoice";
import "./DepartmentAccounting.css";

const DepartmentAccounting = ({
  //   currentUser,
  rqstsDataById,
  currentOrganization,
  stageOne,
  stageTwo,
  executor
}: any) => {
  return (
    <>
      <div className="column-stage">
        {stageOne}
        <CreateInvoice rqstsDataById={rqstsDataById} currentOrganization={currentOrganization} executor={executor}/>
      </div>
    </>
  );
};

export default DepartmentAccounting;
