import { useMutation, useQuery } from "@tanstack/react-query";
import ButtonPanelControl from "../../../ButtonPanelControl/ButtonPanelControl";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { postPdfData } from "../../../../API/PostPdfData";
import { getServices, TServices } from "../../../../API/GetServices";
import { queryClient } from "../../../../../queryClient";
import { useEffect, useState } from "react";
import ServiceCard from "../../DepartmentCustomer/Services/ServiceCard/ServiceCard";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import BackupIcon from "@mui/icons-material/Backup";
import { getInvoices, TInvoices } from "../../../../API/GetInvoices";

const CreateInvoice = ({ rqstsDataById, currentOrganization }: any) => {
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

  const servicesFilteredByRequestId = services.filter(
    (e) => e.reqType === rqstsDataById?.reqType
  );

  const servicesList = services.filter((e) => {
    return rqstsDataById?.services.some((service: any) => service === e.id);
  });

  const totalSum = servicesFilteredByRequestId.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.total;
    },
    0
  );

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

  const getInvoicesQuery = useQuery(
    {
      queryFn: () => getInvoices(),
      queryKey: ["invoices"],
    },
    queryClient
  );

  const [invoices, setInvoices] = useState<TInvoices[]>([]);

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

  console.log(invoices);

  return (
    <div className="certificate-content">
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          <p>Выписывание счета</p>
        </div>
      </div>
      {/* <input type="file" accept=".pdf" onChange={handleFileUpload} /> */}
      <ul className="wrapper-service">{renderCurrentServiceList()}</ul>
      <div className="panel-control-certificate-revocation">
        <div className="certificates-revocation-title">
          <p>Налоговый счет</p>
        </div>
      </div>
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
      </div>
      <div className="panel-executor">
        <ButtonPanelControl
          icon={<BackupIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
          text="Импортировать СФ"
        />
        <ButtonPanelControl
          icon={<ReceiptIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
          text="Выписать"
        />
      </div>
    </div>
  );
};

export default CreateInvoice;
