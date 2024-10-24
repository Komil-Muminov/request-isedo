import "./ZayavkiLinks.css";
import { Link } from "react-router-dom";
export const ZayavkiLinks: React.FC = () => {
  // Путь компонента
  // const location = useLocation();

  return (
    <>
      <section className="sections zayavkilinks__section">
        <div className="container">
          <div className="zayavkilinks__content">
            {/* <p className="url_location">{location.pathname}</p> */}
            {/* <Link to={location.pathname}>{location.pathname}</Link> */}
            <nav className="zayavkilinks__nav">
              <Link to="/requests/mfrqst" className="zayavki_nav-links">
                МФРТ
              </Link>
              <Link to="/mfrqst" className="zayavki_nav-links">
                БО
              </Link>
              <Link to="/mfrqst" className="zayavki_nav-links">
                КО
              </Link>
              <Link to="/mfrqst" className="zayavki_nav-links">
                Физ Лица
              </Link>
              <Link to="" className="zayavki_nav-links">
                Отчёты
              </Link>
              <Link to="/mfrqst" className="zayavki_nav-links">
                Поиск
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};
