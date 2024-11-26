import "./InvoiceCard.css";

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

const InvoiceCardList = ({ title, desc }: any) => {
  return (
    <li className="invoice-list">
      <p className="invoice-list-title">{title}</p>
      <p className="invoice-list-description">
        {desc ? desc : `${desc} не заполнен`}
      </p>
    </li>
  );
};

const InvoiceCard = ({ currentInvoice }: any) => {

  return (
    <div className="info-invoice">
      <div className="wrapper-info-invoice">
        <div className="wrapper-image-invoice">
          <PointOfSaleIcon sx={{ fontSize: "100px", color: "#1adea7" }} />
        </div>
        <ul className="invoice-info-list">
          <InvoiceCardList
            title="Номер счета"
            desc={currentInvoice?.invoiceNumber}
          />
          <InvoiceCardList
            title="Индексный номер"
            desc={currentInvoice?.indexNumber}
          />
          <InvoiceCardList
            title="Отправитель"
            desc={currentInvoice?.invoiceSender}
          />
          <InvoiceCardList
            title="ИНН отправителя"
            desc={currentInvoice?.invoiceSenderTax}
          />
          <InvoiceCardList
            title="Получатель"
            desc={currentInvoice?.invoiceReceiver}
          />
          <InvoiceCardList
            title="ИНН получателя"
            desc={currentInvoice?.invoiceReceiverTax}
          />
          <InvoiceCardList
            title="Общая сумма"
            desc={currentInvoice?.totalAmount}
          />
          <InvoiceCardList
            title="Дата выставления"
            desc={currentInvoice?.date}
          />
          <InvoiceCardList
            title="Комментарии"
            desc={currentInvoice?.comments}
          />
        </ul>
      </div>
    </div>
  );
};

export default InvoiceCard;
