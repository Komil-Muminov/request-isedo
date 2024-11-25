import "../WorkSpace.css";

import TitleDocument from "../../TitleDocument/TitleDocument";
import { departments } from "../../../API/Data/Departments/Departments";
import { useEffect, useState } from "react";
import { TDepartment } from "../../../API/Data/Departments/Departments";

import { GetMeType, useAuth } from "../../../API/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../../queryClient";
import { getCertificates, TCertificates } from "../../../API/GetCertificates";
import { getVPN, TVPN } from "../../../API/GetVPN";

import ProgressBar from "../../Progress-bar/Progress-bar";
import { getUsers, TGetUsers } from "../../../API/GetUsers";
import { getInvoices, TInvoices } from "../../../API/GetInvoices";
import DepartmentCustomer from "../Workspace Change Of Chief Accountant/DepartmentCustomer/DepartmentCustomer";
import InformationSecurity from "../Workspace Change Of Chief Accountant/Information Security/InformationSecurity";
import TechnicalServices from "../Workspace Change Of Chief Accountant/Department for technical services/TechnicalServices";
import DepartmentAccounting from "../Workspace Change Of Chief Accountant/Department of Accounting/DepartmentAccounting";

const WorkSpaceTokenIssuance = ({
  rqstsDataById,
  currentOrganization,
}: any) => {
  const changeOfAccountant = [departments[0], departments[3]];

  const [currentDepartmentStageOne, setCurrentDepartmentStageOne] =
    useState<TDepartment[]>(changeOfAccountant);

  const [users, setUsers] = useState<TGetUsers[] | null>(null);

  const usersQuery = useQuery(
    {
      queryFn: () => getUsers(),
      queryKey: ["users"],
    },
    queryClient
  );

  useEffect(() => {
    if (usersQuery.status === "success") {
      setUsers(usersQuery.data);
    }
  }, [usersQuery]);

  console.log(users);

  const { getMe } = useAuth();
  const uQuery = useQuery(
    {
      queryFn: () => getMe(),
      queryKey: ["users", "me"],
    },
    queryClient
  );

  const [uinfo, setUinfo] = useState<GetMeType | null>(null);

  useEffect(() => {
    if (uQuery.status === "success") {
      setUinfo(uQuery.data);
    }
  }, [uQuery.status, uQuery.data]);

  const handleTabClick = (
    item: any,
    currentDeparment: any,
    setCurrentDepartment: any
  ) => {
    const updatedArray = currentDeparment.map((department: any) => ({
      ...department,
      state: department.id === item.id ? true : false,
    }));

    setCurrentDepartment(updatedArray);
  };

  // Department Customer

  const showDepartmentCustomerStageOne = currentDepartmentStageOne.some(
    (e) => e.id === 1 && e.state === true
  );

  // Department Accounting

  const showDepartmentOfAccountingStageOne = currentDepartmentStageOne.some(
    (e) => e.id === 4 && e.state === true
  );

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

  const currentInvoice = invoices.find(
    (e) => e.requestId === rqstsDataById?.id
  );

  // Универсальная функция для вычисления процента выполнения отдела на каждом этапе
  const getDepartmentPercent = (
    item: { name: string },
    stage: number
  ): string => {
    switch (stage) {
      case 1:
        return (item.name === "Шуъба оид ба кор бо муштариён" &&
          rqstsDataById?.services.length > 0) ||
          (item.name === "Шуъба муҳосибот ва хоҷагӣ" && currentInvoice)
          ? "50"
          : "0";

      default:
        return "0";
    }
  };

  const departmentPercentStatus = [
    {
      name: "Шуъба оид ба кор бо муштариён",
    },
    {
      name: "Шуъба муҳосибот ва хоҷагӣ",
    },
  ];

  const calculateTotalPercent = (stage: number) => {
    const total = departmentPercentStatus
      .map((dept) => parseInt(getDepartmentPercent(dept, stage), 10)) // преобразуем строку в число
      .reduce((acc, percent) => acc + percent, 0);

    return total === 99 ? 100 : total; // для корректного отображения 100%
  };

  const getPercentStageValue = (item: any, stage: number) =>
    getDepartmentPercent(item, stage) === "0" ? "50" : "100";

  console.log(calculateTotalPercent(1));

  return (
    <section className="wrapper-work-space">
      <TitleDocument title="Обработка заявки" />
      <div className="workspace-content">
        {/* STAGE ONE */}
        {rqstsDataById?.stepCode > 0 && (
          <div className="navigation-tabs-stage-one">
            <ul className="wrapper-tabs">
              {currentDepartmentStageOne.map((e) => {
                return (
                  <li
                    key={e.id}
                    style={
                      {
                        "--percent-color": `${
                          getPercentStageValue(e, 1) === "50"
                            ? "#ff9800"
                            : "#41ff6f"
                        }`,
                        "--percent-width": `${getPercentStageValue(e, 1)}%`,
                      } as React.CSSProperties
                    } // Приведение типа
                    className={`tab percent-indicator ${
                      e?.state ? "active" : ""
                    }`}
                    onClick={() =>
                      handleTabClick(
                        e,
                        currentDepartmentStageOne,
                        setCurrentDepartmentStageOne
                      )
                    }
                  >
                    <p>{e.name}</p>
                    <p className="percent-title">
                      <ProgressBar
                        completed={
                          (Number(getPercentStageValue(e, 1)) / 100) *
                          currentDepartmentStageOne.length
                        }
                        total={currentDepartmentStageOne.length}
                        size={45}
                        item={e}
                      />
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {showDepartmentCustomerStageOne && rqstsDataById?.stepCode > 0 && (
          <DepartmentCustomer
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            executor={uinfo}
            stageThree={
              <div
                className="stage-title stage-indicator"
                style={
                  {
                    "--percent-stage-color": `${
                      calculateTotalPercent(1) === 0
                        ? "#ff4e4e"
                        : calculateTotalPercent(1) > 0 &&
                          calculateTotalPercent(1) < 100
                        ? "#ff9800"
                        : "#33c157"
                    }`,
                    "--percent-stage-height": `${calculateTotalPercent(1)}%`,
                  } as React.CSSProperties
                }
              >
                <p>
                  Этап 1 - выполнено:{" "}
                  <span
                    style={
                      {
                        "--percent-stage-color": `${
                          calculateTotalPercent(1) === 0
                            ? "#ff4e4e"
                            : calculateTotalPercent(1) > 0 &&
                              calculateTotalPercent(1) < 100
                            ? "#ff9800"
                            : "#33c157"
                        }`,
                      } as React.CSSProperties
                    }
                  >
                    {calculateTotalPercent(1)}%
                  </span>
                </p>
              </div>
            }
          />
        )}

        {showDepartmentOfAccountingStageOne &&
          rqstsDataById?.services.length > 0 && (
            <DepartmentAccounting
              rqstsDataById={rqstsDataById}
              currentOrganization={currentOrganization}
              executor={uinfo}
              stageThree={
                <div
                  className="stage-title stage-indicator"
                  style={
                    {
                      "--percent-stage-color": `${
                        calculateTotalPercent(1) === 0
                          ? "#ff4e4e"
                          : calculateTotalPercent(1) > 0 &&
                            calculateTotalPercent(1) < 100
                          ? "#ff9800"
                          : "#33c157"
                      }`,
                      "--percent-stage-height": `${calculateTotalPercent(1)}%`,
                    } as React.CSSProperties
                  }
                >
                  <p>
                    Этап 1 - выполнено:{" "}
                    <span
                      style={
                        {
                          "--percent-stage-color": `${
                            calculateTotalPercent(1) === 0
                              ? "#ff4e4e"
                              : calculateTotalPercent(1) > 0 &&
                                calculateTotalPercent(1) < 100
                              ? "#ff9800"
                              : "#33c157"
                          }`,
                        } as React.CSSProperties
                      }
                    >
                      {calculateTotalPercent(1)}%
                    </span>
                  </p>
                </div>
              }
            />
          )}
      </div>
    </section>
  );
};

export default WorkSpaceTokenIssuance;
