import "./CreateInvoice.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import ButtonPanelControl from "../../../../ButtonPanelControl/ButtonPanelControl";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { postPdfData } from "../../../../../API/PostPdfData";
import { getServices, TServices } from "../../../../../API/GetServices";
import { queryClient } from "../../../../../../queryClient";
import { useEffect, useState } from "react";
import ServiceCard from "../../DepartmentCustomer/Services/ServiceCard/ServiceCard";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import BackupIcon from "@mui/icons-material/Backup";
import { getInvoices, TInvoices } from "../../../../../API/GetInvoices";
import { postInvoices } from "../../../../../API/PostInvoices";
import InvoiceCard from "../Invoice Card/InvoiceCard";
import { putRqstsById, PutRqstsByIdType } from "../../../../../API/PutRqstById";
import FileService from "../../../../File Services/FileService";
import PDFViewerService from "../../../../PDF Viewer Service/PDFViewerService";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { invoiceDocuments } from "../../../../../API/Data/Invoices Documents/InvoicesDocuments";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CreateInvoice = ({
  rqstsDataById,
  currentOrganization,
  executor,
}: any) => {
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

  const getServicesQuery = useQuery(
    {
      queryFn: () => getServices(),
      queryKey: ["services"],
    },
    queryClient
  );

  const [services, setServices] = useState<TServices[]>([]);

  useEffect(() => {
    if (getServicesQuery.status === "success") {
      setServices(getServicesQuery.data);
    }
  }, [getServicesQuery]);

  const servicesFilteredByRequestId = services.filter((currentService) => {
    return rqstsDataById?.services.includes(currentService.id);
  });

  const servicesList = services.filter((e) => {
    return rqstsDataById?.services.some((service: any) => service === e.id);
  });

  const totalSum = servicesFilteredByRequestId.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.total;
    },
    0
  );

  // Пока что не нужен
  const renderCurrentServiceList = () => {
    // Проверяем, есть ли объекты в servicesList
    if (servicesList.length > 0) {
      return servicesList.map((e) => {
        return <ServiceCard key={e.id} service={e} />;
      });
    } else if (servicesFilteredByRequestId.length > 0) {
      // Если servicesList пуст, рендерим servicesFilteredByRequestId
      return servicesFilteredByRequestId.map((e) => {
        return <ServiceCard key={e.id} service={e} />;
      });
    } else {
      return null;
    }
  };

  interface FileType {
    fileName: string;
  }

  const [files, setFiles] = useState<FileType[]>([]);

  const handleGetFile = (file: File) => {
    const sizeInBytes = file.size; // Размер в байтах
    const sizeInKB = (sizeInBytes / 1024).toFixed(2); // Преобразуем в КБ (строка)
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2); // Преобразуем в МБ (строка)

    // Преобразуем строки с числами в числа для сравнения
    const fileSize =
      parseFloat(sizeInKB) < 1000 ? `${sizeInKB} КБ` : `${sizeInMB} МБ`;

    const fileName = file.name.split(".")[0];

    const fileType = file.type.split("/")[1]; // Например, "pdf" из "application/pdf"

    const newFile = {
      id: new Date().getTime(),
      fileName: `${fileName}.`,
      size: fileSize,
      type: fileType,
    };

    if (newFile.fileName) {
      setFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  // POST INVOICE MUTATION

  const posInvoicesMutation = useMutation({
    mutationFn: (data: TInvoices) => postInvoices(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["invoices"] }),
  });

  const putRqstsByIdMutation = useMutation(
    {
      mutationFn: (data: PutRqstsByIdType) => putRqstsById(data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`request-${rqstsDataById?.id}`],
        });
      },
    },
    queryClient
  );

  const onSubmit = (data: TInvoices) => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, "0")}.${String(
      now.getMonth() + 1
    ).padStart(2, "0")}.${now.getFullYear()} в ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const updateReqData = {
      ...data,
      dateChange: formattedDate,
      requestId: rqstsDataById?.id,
      files: files,
    };

    posInvoicesMutation.mutate(updateReqData);

    const handleCurrentStepCode = () => {
      if (rqstsDataById?.reqType === "Выдача токена") {
        return rqstsDataById.stepCode + 2;
      }

      if (rqstsDataById?.reqType === "Выдача сертификата") {
        return rqstsDataById.stepCode + 2;
      }

      if (rqstsDataById?.reqType === "Выдача токена и сертификата") {
        return rqstsDataById.stepCode + 2;
      }

      return rqstsDataById.stepCode + 1;
    };

    if (rqstsDataById)
      putRqstsByIdMutation.mutate({
        ...rqstsDataById,
        stepCode: handleCurrentStepCode(),
      });
  };

  // GET INVOICE QUERY

  const [invoices, setInvoices] = useState<TInvoices[]>([]);

  const getInvoicesQuery = useQuery(
    {
      queryFn: () => getInvoices(),
      queryKey: ["invoices"],
    },
    queryClient
  );

  useEffect(() => {
    if (getInvoicesQuery.status === "success") {
      setInvoices(getInvoicesQuery.data);
    }
  }, [getInvoicesQuery]);

  const defaultValues = {
    invoiceNumber: "BI624770",
    indexNumber: 5967,
    invoiceSender: `КОРХОНАИ ВОҲИДИ ДАВЛАТИИ "МАРКАЗИ ТЕХНОЛОГИЯҲОИ ИТТИЛООТИИ МОЛИЯВӢ"`,
    invoiceSenderTax: "010088992",
    invoiceReceiver: currentOrganization?.name,
    invoiceReceiverTax: currentOrganization?.tax,
    comments: "",
    totalAmount: totalSum,
    date: "2024-10-08",
  };

  const { register, handleSubmit, reset } = useForm<any>({
    defaultValues: defaultValues,
  });

  // Используем useEffect для обновления формы, когда totalSum доступен
  useEffect(() => {
    if (totalSum > 0) {
      reset(defaultValues);
    }
  }, [totalSum, reset]);

  const currentInvoice = invoices.find(
    (inv) => inv.requestId === rqstsDataById?.id
  );

  const disabledCreateInvoiceButton = invoices.some(
    (inv) => inv.requestId === rqstsDataById?.id
  );

  const firstFileStatus = files.some(
    (e) => e.fileName === invoiceDocuments[0]?.name
  );
  // const secondFileStatus = files.some(
  //   (e) => e.fileName === invoiceDocuments[1]?.name
  // );
  // const thirdFileStatus = files.some(
  //   (e) => e.fileName === invoiceDocuments[2]?.name
  // );

  return (
    <div className="certificate-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          <p>Выписывание счета</p>
        </div>
        <p style={{ fontWeight: "bold" }}>
          Общая сумма: <span style={{ fontWeight: "normal" }}>{totalSum}c</span>
        </p>
      </div>
      {/* <input type="file" accept=".pdf" onChange={handleFileUpload} /> */}
      <ul className="wrapper-service">
        <div className="wrapper-new-user-files">
          <PDFViewerService title="Замима" hideFirstItem={true} />
        </div>
      </ul>
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          <p>Налоговый счет</p>
        </div>
      </div>
      {!disabledCreateInvoiceButton && (
        <div className="inputs-list install-certificate-inputs-list">
          <TextField
            {...register("invoiceNumber")}
            id="invoiceNumber"
            type="text"
            className="request_inp"
            label="Номер счета"
          />
          <TextField
            {...register("indexNumber")}
            type="text"
            id="indexNumber"
            className="request_inp"
            label="Индексный номер"
          />
          <TextField
            {...register("invoiceSender")}
            id="invoiceSender"
            type="text"
            className="request_inp"
            label="Отправитель"
          />
          <TextField
            {...register("invoiceSenderTax")}
            id="invoiceSenderTax"
            type="text"
            className="request_inp"
            label="ИНН отправителя"
          />
          <TextField
            {...register("invoiceReceiver")}
            id="invoiceReceiver"
            type="text"
            className="request_inp"
            label="Получатель"
          />
          <TextField
            {...register("invoiceReceiverTax")}
            id="invoiceReceiverTax"
            type="text"
            className="request_inp"
            label="ИНН получателя"
          />
          <TextField
            {...register("totalAmount")}
            id="totalAmount"
            type="text"
            className="request_inp"
            label="Общая сумма"
          />
          <TextField
            {...register("date")}
            id="date"
            type="date"
            className="request_inp"
            label="Дата выставления"
          />
          <TextField
            {...register("comments")}
            id="comments"
            type="text"
            className="request_inp"
            label="Комментарии"
          />
          <FileService handleGetFile={handleGetFile} />
          <ul className="required-documents">
            <p>Необходимые документы:</p>
            <li>
              {firstFileStatus ? (
                <CheckCircleOutlineIcon sx={{ color: "green" }} />
              ) : (
                <HighlightOffIcon sx={{ color: "red" }} />
              )}
              <p>{invoiceDocuments[0]?.name}</p>
            </li>
            {/* <li>
              {secondFileStatus ? (
                <CheckCircleOutlineIcon sx={{ color: "green" }} />
              ) : (
                <HighlightOffIcon sx={{ color: "red" }} />
              )}
              <p>{invoiceDocuments[1]?.name}</p>
            </li> */}
            {/* <li>
                {thirdFileStatus ? (
                  <CheckCircleOutlineIcon sx={{ color: "green" }} />
                ) : (
                  <HighlightOffIcon sx={{ color: "red" }} />
                )}
                <p>{invoiceDocuments[2]?.name}</p>
              </li> */}
          </ul>
        </div>
      )}
      {disabledCreateInvoiceButton && (
        <InvoiceCard currentInvoice={currentInvoice} />
      )}
      {currentInvoice && currentInvoice?.files.length > 0 && (
        <div className="file-list">
          <PDFViewerService currentFiles={currentInvoice?.files} />
        </div>
      )}
      <div className="panel-buttons">
        {currentInvoice && (
          <div className="wrapper-show-executor">
            <p className="show-executor-title">
              Исполнитель: <span>{executor?.fullName}</span>
            </p>
            <p className="show-executor-title">
              Время: <span>{currentInvoice?.dateChange}</span>
            </p>
          </div>
        )}
        <div className="panel-executor">
          <ButtonPanelControl
            icon={<ReceiptIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
            text="Выписать"
            handleSubmit={handleSubmit(onSubmit)}
            activeSendButton={disabledCreateInvoiceButton}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
