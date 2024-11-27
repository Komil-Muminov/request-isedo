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

const WorkSpaceTokenCertificateIssuance = ({
  rqstsDataById,
  currentOrganization,
  currentUserRequest,
}: any) => {
  const changeOfAccountant = [departments[0], departments[1]];

  const [currentDepartmentStageOne, setCurrentDepartmentStageOne] =
    useState<TDepartment[]>(changeOfAccountant);

  const [currentDepartmentStageThree, setCurrentDepartmentStageThree] =
    useState<TDepartment[]>([departments[0], departments[3]]);

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

  const showDepartmentCustomerStageThree = currentDepartmentStageThree.some(
    (e) => e.id === 1 && e.state === true
  );

  // Department Information Security

  const showInformationSecurityStageOne = currentDepartmentStageOne.some(
    (e) => e.id === 2 && e.state === true
  );

  // Department Accounting

  const showDepartmentOfAccountingStageThree = currentDepartmentStageThree.some(
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
          rqstsDataById?.stepTask >= 1) ||
          (item.name === "Шуъба оид ба амнияти иттилоотӣ" &&
            rqstsDataById?.stepTask >= 2)
          ? "50"
          : "0";

      case 3:
        return (item.name === "Шуъба оид ба кор бо муштариён" &&
          rqstsDataById?.services.length > 0) ||
          (item.name === "Шуъба муҳосибот ва хоҷагӣ" &&
            rqstsDataById?.stepCode > 2)
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
      name: "Шуъба оид ба амнияти иттилоотӣ",
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
            stageOne={
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

        {showInformationSecurityStageOne && rqstsDataById?.stepTask > 0 && (
          <InformationSecurity
            currentUser={currentUserRequest}
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            executor={uinfo}
            stageOne={
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
            // stageTwo={
            //   <div className="stage-title second-stage">
            //     <p>Этап 2</p>
            //   </div>
            // }
          />
        )}

        {/* STAGE THREE */}
        {rqstsDataById?.stepTask > 1 && (
          <div className="navigation-tabs-stage-three">
            <ul className="wrapper-tabs">
              {currentDepartmentStageThree.map((e) => {
                return (
                  <li
                    key={e.id}
                    style={
                      {
                        "--percent-color": `${
                          getPercentStageValue(e, 3) === "50"
                            ? "#ff9800"
                            : "#41ff6f"
                        }`,
                        "--percent-width": `${getPercentStageValue(e, 3)}%`,
                      } as React.CSSProperties
                    } // Приведение типа
                    className={`tab percent-indicator ${
                      e?.state ? "active" : ""
                    }`}
                    onClick={() =>
                      handleTabClick(
                        e,
                        currentDepartmentStageThree,
                        setCurrentDepartmentStageThree
                      )
                    }
                  >
                    <p>{e.name}</p>
                    <p className="percent-title">
                      <ProgressBar
                        completed={
                          (Number(getPercentStageValue(e, 3)) / 100) *
                          currentDepartmentStageThree.length
                        }
                        total={currentDepartmentStageThree.length}
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

        {showDepartmentCustomerStageThree && rqstsDataById?.stepTask > 1 && (
          <DepartmentCustomer
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            executor={uinfo}
            defaultService={1}
            stageThree={
              <div
                className="stage-title stage-indicator"
                style={
                  {
                    "--percent-stage-color": `${
                      calculateTotalPercent(3) === 0
                        ? "#ff4e4e"
                        : calculateTotalPercent(3) > 0 &&
                          calculateTotalPercent(3) < 100
                        ? "#ff9800"
                        : "#33c157"
                    }`,
                    "--percent-stage-height": `${calculateTotalPercent(3)}%`,
                  } as React.CSSProperties
                }
              >
                <p>
                  Этап 2 - выполнено:{" "}
                  <span
                    style={
                      {
                        "--percent-stage-color": `${
                          calculateTotalPercent(3) === 0
                            ? "#ff4e4e"
                            : calculateTotalPercent(3) > 0 &&
                              calculateTotalPercent(3) < 100
                            ? "#ff9800"
                            : "#33c157"
                        }`,
                      } as React.CSSProperties
                    }
                  >
                    {calculateTotalPercent(3)}%
                  </span>
                </p>
              </div>
            }
          />
        )}

        {showDepartmentOfAccountingStageThree &&
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
                        calculateTotalPercent(3) === 0
                          ? "#ff4e4e"
                          : calculateTotalPercent(3) > 0 &&
                            calculateTotalPercent(3) < 100
                          ? "#ff9800"
                          : "#33c157"
                      }`,
                      "--percent-stage-height": `${calculateTotalPercent(3)}%`,
                    } as React.CSSProperties
                  }
                >
                  <p>
                    Этап 2 - выполнено:{" "}
                    <span
                      style={
                        {
                          "--percent-stage-color": `${
                            calculateTotalPercent(3) === 0
                              ? "#ff4e4e"
                              : calculateTotalPercent(3) > 0 &&
                                calculateTotalPercent(3) < 100
                              ? "#ff9800"
                              : "#33c157"
                          }`,
                        } as React.CSSProperties
                      }
                    >
                      {calculateTotalPercent(3)}%
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

export default WorkSpaceTokenCertificateIssuance;
