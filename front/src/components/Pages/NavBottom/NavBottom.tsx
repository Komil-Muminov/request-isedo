import "./NavBottom.css";
import { Link } from "react-router-dom";

import { moduls } from "../../API/Data/Moduls/Moduls";

export const NavBottom: React.FC = () => {
  return (
    <>
      <section className="sections navbottom__section">
        <div className="container">
          <div className="navbottom__content">
            <nav className="navbottom__links">
              {moduls.map((item) => {
                return (
                  <Link
                    key={item.id}
                    to={item.route}
                    className="navbottom_item"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};
