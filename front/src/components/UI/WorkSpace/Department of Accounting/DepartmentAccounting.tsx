import CreateInvoice from "./Create Invoice/CreateInvoice";
import "./DepartmentAccounting.css";

const DepartmentAccounting = ({
  //   currentUser,
  rqstsDataById,
  currentOrganization,
  stageOne,
  stageTwo,
}: any) => {
  return (
    <>
      <div className="column-stage">
        {stageOne}
        <CreateInvoice rqstsDataById={rqstsDataById} currentOrganization={currentOrganization}/>
      </div>
    </>
  );
};

export default DepartmentAccounting;
