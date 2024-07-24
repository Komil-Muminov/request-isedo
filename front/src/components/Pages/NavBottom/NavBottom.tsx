import "./NavBottom.css";
import { Link } from "react-router-dom";
export const NavBottom: React.FC = () => {
  return (
    <>
      <section className="sections navbottom__section">
        <div className="container">
          <div className="navbottom__content">
            <nav className="navbottom__links">
              <Link to="noLink" className="navbottom_item">
                Основные документы
              </Link>
              <Link to="noLink" className="navbottom_item">
                Первичные документы
              </Link>
              <Link to="noLink" className="navbottom_item">
                Письма
              </Link>
              <Link to="noLink" className="navbottom_item">
                Письма-V3
              </Link>
              <Link to="noLink" className="navbottom_item">
                Фин-Отчет
              </Link>
              <Link to="noLink" className="navbottom_item">
                Госуслуги
              </Link>
              <Link to="noLink" className="navbottom_item">
                Госуслуги 2
              </Link>
              <Link to="noLink" className="navbottom_item">
                Письма-V3.5
              </Link>
              <Link to="noLink" className="navbottom_item">
                Администрирование
              </Link>
              <Link to="noLink" className="navbottom_item">
                Заявки
              </Link>
              <Link to="noLink" className="navbottom_item">
                СРМ
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};
