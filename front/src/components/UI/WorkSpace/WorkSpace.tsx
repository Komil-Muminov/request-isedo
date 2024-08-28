import TitleDocument from "../TitleDocument/TitleDocument";
import "./WorkSpace.css";
import { departments } from "../../API/Data/Departments/Departments";
import Services from "../Services/Services";
import { useState } from "react";
import ServicesList from "../Services/ServicesList";

const WorkSpace = () => {
  const changeOfAccountant = [
    departments[0],
    departments[1],
    departments[2],
    departments[3],
  ];

  // Данный функционал написан временно пока не будет создан переключатель true false для статуса в сервере
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const [showServicesList, setShowServicesList] = useState<boolean>(false);

  const handleShowServicesList = (state: boolean) => {
    setShowServicesList(state);
  };

  return (
    <section className="wrapper-work-space">
      <TitleDocument title="Рабочее пространство" />

      <div className="workspace-content">
        {showServicesList && (
          <ServicesList handleShowServicesList={handleShowServicesList} />
        )}
        {!showServicesList && (
          <>
            <div className="navigation-tabs">
              <ul className="wrapper-tabs">
                {changeOfAccountant.map((e) => {
                  return (
                    <li
                      key={e.id}
                      className={`tab ${activeTab === e.id ? "active" : ""}`}
                      onClick={() => handleTabClick(e.id)}
                    >
                      {e.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Services handleShowServicesList={handleShowServicesList} />
          </>
        )}
      </div>
    </section>
  );
};

export default WorkSpace;
