import { Button } from "@mui/material";
import "./Services.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface TProps {
  handleShowServicesList: (value: boolean) => void;
}

const Services = ({ handleShowServicesList }: TProps) => {
  return (
    <div className="service-content">
      <div className="panel-control-service">
        <Button
          onClick={() => handleShowServicesList(true)}
          variant="text"
          className="add-services"
        >
          <AddCircleIcon />
          <p>Услуги</p>
        </Button>
        <div className="services-info">
          <p>
            Количество: <span>2</span>
          </p>
          <p>
            На сумму: <span>TJS 1 435,20</span>
          </p>
        </div>
      </div>
      <table className="table-service">
        <thead>
          <tr>
            <th>Услуга</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Единица измерения</th>
            <th>Тип получателя</th>
            <th>Налог</th>
            <th>Сумма налога</th>
            <th>Итого</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              14.2. Дароз кардани бақайдгирӣ дар маркази сертификатсиякунонӣ пас
              аз анҷоми 1 сол: Додани сертификат бе токен (1-50 воҳид)
            </td>
            <td>120,00</td>
            <td>2000</td>
            <td>Солона (1 воҳид)</td>
            <td>Бюджетные учреждения</td>
            <td>НДС</td>
            <td>36,00</td>
            <td>276,00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Services;
