import { useMutation } from "@tanstack/react-query";
import ButtonPanelControl from "../../../ButtonPanelControl/ButtonPanelControl";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { postPdfData } from "../../../../API/PostPdfData";

const CreateInvoice = () => {
  // Используем useMutation для вызова postPdfData
  const uploadPdfMutation = useMutation({
    mutationFn: (file: File) => postPdfData(file),
    onSuccess: (data) => {
      console.log("PDF data extracted: ", data); // Можно обработать или отобразить полученные данные
    },
    onError: (error) => {
      console.error("Upload failed: ", error);
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      console.log("File selected:", file); // Логируем файл
      uploadPdfMutation.mutate(file); // Отправляем файл на сервер
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="certificate-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          <p>Выписывание счета</p>
        </div>
      </div>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
      <div className="panel-executor">
        <ButtonPanelControl
          icon={<ReceiptIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
          text="Выписать"
        />
      </div>
    </div>
  );
};

export default CreateInvoice;
