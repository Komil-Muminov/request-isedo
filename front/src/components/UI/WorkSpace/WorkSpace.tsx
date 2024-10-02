import TitleDocument from "../TitleDocument/TitleDocument";
import "./WorkSpace.css";
import { departments } from "../../API/Data/Departments/Departments";
import { useState } from "react";
import { TDepartment } from "../../API/Data/Departments/Departments";
import DepartmentCustomer from "./DepartmentCustomer/DepartmentCustomer";
import InformationSecurity from "./Information Security/InformationSecurity";
import TechnicalServices from "./Department for technical services/TechnicalServices";

const WorkSpace = ({ currentUser }: any) => {
  const changeOfAccountant = [
    departments[0],
    departments[1],
    departments[2],
    departments[3],
  ];

  const [currentDepartment, setCurrentDepartment] =
    useState<TDepartment[]>(changeOfAccountant);

  const handleTabClick = (item: any) => {
    const updatedArray = currentDepartment.map((department) => ({
      ...department,
      state: department.id === item.id ? true : false,
    }));

    setCurrentDepartment(updatedArray);
  };

  const showDepartmentCustomer = currentDepartment.some(
    (e) => e.id === 1 && e.state === true
  );

  const showInformationSecurity = currentDepartment.some(
    (e) => e.id === 2 && e.state === true
  );

  const showTechnicalServices = currentDepartment.some(
    (e) => e.id === 3 && e.state === true
  );

  return (
    <section className="wrapper-work-space">
      <TitleDocument title="Рабочее пространство" />
      <div className="workspace-content">
        <div className="navigation-tabs">
          <ul className="wrapper-tabs">
            {currentDepartment.map((e) => {
              return (
                <li
                  key={e.id}
                  className={`tab ${e?.state ? "active" : ""}`}
                  onClick={() => handleTabClick(e)}
                >
                  {e.name}
                </li>
              );
            })}
          </ul>
        </div>
        {showDepartmentCustomer && <DepartmentCustomer />}
        {showInformationSecurity && (
          <InformationSecurity currentUser={currentUser} />
        )}
        {showTechnicalServices && <TechnicalServices />}
      </div>
    </section>
  );
};

export default WorkSpace;
