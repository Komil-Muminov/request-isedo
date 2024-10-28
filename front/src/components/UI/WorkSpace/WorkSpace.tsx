import TitleDocument from "../TitleDocument/TitleDocument";
import "./WorkSpace.css";
import { departments } from "../../API/Data/Departments/Departments";
import { useEffect, useState } from "react";
import { TDepartment } from "../../API/Data/Departments/Departments";
import DepartmentCustomer from "./DepartmentCustomer/DepartmentCustomer";

import TechnicalServices from "./Department for technical services/TechnicalServices";
import InformationSecurity from "./Information Security/InformationSecurity";
import DepartmentAccounting from "./Department of Accounting/DepartmentAccounting";
import { GetMeType, useAuth } from "../../API/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";

const WorkSpace = ({
  currentUser,
  rqstsDataById,
  currentOrganization,
}: any) => {
  const changeOfAccountant = [departments[0], departments[1], departments[2]];

  const [currentDepartment, setCurrentDepartment] =
    useState<TDepartment[]>(changeOfAccountant);

  // useEffect(() => {
  //   if (rqstsDataById?.stepTask > 0) {
  //     setCurrentDepartment((prevDepartments) => {
  //       const newDepartments = [departments[1], departments[2]];
  //       const combinedDepartments = [...prevDepartments, ...newDepartments];

  //       // Удаляем дубликаты, оставляя уникальные элементы
  //       const uniqueDepartments = Array.from(
  //         new Set(combinedDepartments.map((dept) => dept.id))
  //       ).map((id) => combinedDepartments.find((dept) => dept.id === id));

  //       return uniqueDepartments;
  //     });
  //   }
  // }, [rqstsDataById?.stepTask]);

  const { getMe } = useAuth();
  const uQuery = useQuery(
    {
      queryFn: () => getMe(),
      queryKey: ["users", "me"],
    },
    queryClient
  );

  const [uinfo, setUinfo] = useState<GetMeType | null>(null);
  // const [expanded, setExpanded] = useState<number | false>(false);

  useEffect(() => {
    if (uQuery.status === "success") {
      setUinfo(uQuery.data);
    }
  }, [uQuery.status, uQuery.data]);

  console.log(currentDepartment);

  const handleTabClick = (item: any) => {
    const updatedArray = currentDepartment.map((department) => ({
      ...department,
      state: department.id === item.id ? true : false,
    }));

    setCurrentDepartment(updatedArray);
  };

  useEffect(() => {
    if (rqstsDataById?.services.length > 0) {
      setCurrentDepartment((prevDepartments) => {
        // Проверяем, уже добавлен ли департамент
        const isDepartmentAdded = prevDepartments.some(
          (dept) => dept.id === departments[3].id
        );
        if (!isDepartmentAdded) {
          return [...prevDepartments, departments[3]];
        }
        return prevDepartments; // Возвращаем предыдущее состояние, если департамент уже есть
      });
    }
  }, [rqstsDataById?.services]);

  const showDepartmentCustomer = currentDepartment.some(
    (e) => e.id === 1 && e.state === true
  );

  const showInformationSecurity = currentDepartment.some(
    (e) => e.id === 2 && e.state === true
  );

  const showTechnicalServices = currentDepartment.some(
    (e) => e.id === 3 && e.state === true
  );

  const showDepartmentOfAccounting = currentDepartment.some(
    (e) => e.id === 4 && e.state === true
  );

  return (
    <section className="wrapper-work-space">
      <TitleDocument title="Обработка заявки" />
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

        {showDepartmentCustomer && (
          <DepartmentCustomer
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            executor={uinfo}
            stageOne={
              <div className="stage-title">
                <p>Этап 1</p>
              </div>
            }
            stageTwo={
              <div className="stage-title second-stage">
                <p>Этап 2</p>
              </div>
            }
            stageThree={
              <div className="stage-title third-stage">
                <p>Этап 3</p>
              </div>
            }
          />
        )}
        {showInformationSecurity && (
          <InformationSecurity
            currentUser={currentUser}
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            executor={uinfo}
            stageOne={
              <div className="stage-title">
                <p>Этап 1</p>
              </div>
            }
            stageTwo={
              <div className="stage-title second-stage">
                <p>Этап 2</p>
              </div>
            }
          />
        )}
        {showTechnicalServices && (
          <TechnicalServices
            currentUser={currentUser}
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            executor={uinfo}
            stageOne={
              <div className="stage-title">
                <p>Этап 1</p>
              </div>
            }
            stageTwo={
              <div className="stage-title second-stage">
                <p>Этап 2</p>
              </div>
            }
          />
        )}
        {showDepartmentOfAccounting && (
          <DepartmentAccounting
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            stageOne={
              <div className="stage-title">
                <p>Этап 3</p>
              </div>
            }
          />
        )}
      </div>
    </section>
  );
};

export default WorkSpace;
