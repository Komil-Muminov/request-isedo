import ButtonPanelControl from "../../../ButtonPanelControl/ButtonPanelControl";
import ReceiptIcon from "@mui/icons-material/Receipt";

const CreateInvoice = () => {
  return (
    <div className="certificate-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          <p>Выписывание счета</p>
        </div>
      </div>
      <div className="panel-executor">
        <ButtonPanelControl
          icon={<ReceiptIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
          text="Выписать"
          //   handleSubmit={handleSubmit(onSubmit)}
          //   activeSendButton={newLoginUserId ? true : false}
        />
      </div>
    </div>
  );
};

export default CreateInvoice;
