import TitleDocument from "../../TitleDocument/TitleDocument";
import "../WorkSpace.css";
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

const WorkSpaceChangeOfChiefAccountantAndManagement = ({
  currentUser,
  currentAccountant,
  rqstsDataById,
  currentOrganization,
}: any) => {
  const changeOfAccountant = [departments[0], departments[1], departments[2]];

  const [currentDepartmentStageOne, setCurrentDepartmentStageOne] =
    useState<TDepartment[]>(changeOfAccountant);

  const [currentDepartmentStageTwo, setCurrentDepartmentStageTwo] = useState<
    TDepartment[]
  >(currentDepartmentStageOne);

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

  const currentNewUser = users?.find(
    (e) => e.fullName === rqstsDataById?.fullName
  );

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

  const showDepartmentCustomerStageTwo = currentDepartmentStageTwo.some(
    (e) => e.id === 1 && e.state === true
  );

  const showDepartmentCustomerStageThree = currentDepartmentStageThree.some(
    (e) => e.id === 1 && e.state === true
  );

  // Information Security
  const showInformationSecurityStageOne = currentDepartmentStageOne.some(
    (e) => e.id === 2 && e.state === true
  );

  const showInformationSecurityStageTwo = currentDepartmentStageTwo.some(
    (e) => e.id === 2 && e.state === true
  );

  // TechnicalServices

  const showTechnicalServicesStageOne = currentDepartmentStageOne.some(
    (e) => e.id === 3 && e.state === true
  );
  const showTechnicalServicesStageTwo = currentDepartmentStageTwo.some(
    (e) => e.id === 3 && e.state === true
  );

  // Department Accounting

  const showDepartmentOfAccountingStageThree = currentDepartmentStageThree.some(
    (e) => e.id === 4 && e.state === true
  );

  const [certificates, setCertificates] = useState<TCertificates[]>([]);

  const getCertificateQuery = useQuery({
    queryFn: () => getCertificates(),
    queryKey: ["certificates"],
  });

  useEffect(() => {
    if (getCertificateQuery.status === "success") {
      setCertificates(getCertificateQuery.data);
    }
  }, [getCertificateQuery]);

  const getCertificateUser = certificates.find(
    (cert) => cert.userId !== rqstsDataById?.userId
  );

  const getCertificateNewUser = certificates.find(
    (cert) => cert.userId === rqstsDataById?.userId
  );

  const currentCertificateUser = certificates.find(
    (cert) => cert.userName === rqstsDataById?.fullName
  );

  console.log(currentCertificateUser);

  const currentDepartmentCustomer = currentDepartmentStageOne.find(
    (e) => e.state === true
  );

  const getVpnQuery = useQuery(
    {
      queryFn: () => getVPN(),
      queryKey: ["vpn"],
    },
    queryClient
  );

  const [vpn, setVpn] = useState<TVPN[]>([]);

  useEffect(() => {
    if (getVpnQuery.status === "success") {
      setVpn(getVpnQuery.data);
    }
  }, [getVpnQuery]);

  const currentVPN = vpn.find((v) => {
    return currentOrganization?.userIds.includes(v.userId);
  });

  const currentNewVPN = vpn.find((v) => rqstsDataById?.fullName === v.fullName);

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
          getCertificateUser?.statusCode === 5) ||
          (item.name === "Шуъба оид ба амнияти иттилоотӣ" &&
            currentUser?.status === false) ||
          (item.name === "Шуъба оид ба хизматрасонии техникӣ" &&
            currentVPN?.status === false)
          ? "33"
          : "0";

      case 2:
        return (item.name === "Шуъба оид ба кор бо муштариён" &&
          currentCertificateUser) ||
          (item.name === "Шуъба оид ба амнияти иттилоотӣ" &&
            currentNewUser?.status === true) ||
          (item.name === "Шуъба оид ба хизматрасонии техникӣ" &&
            currentNewVPN?.status === true)
          ? "33"
          : "0";

      case 3:
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
      name: "Шуъба оид ба амнияти иттилоотӣ",
    },
    {
      name: "Шуъба оид ба хизматрасонии техникӣ",
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
        {showDepartmentCustomerStageOne && (
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
            // stageThree={
            //   <div className="stage-title third-stage">
            //     <p>Этап 3</p>
            //   </div>
            // }
          />
        )}
        {showInformationSecurityStageOne && (
          <InformationSecurity
            currentUser={currentUser}
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
        {showTechnicalServicesStageOne && (
          <TechnicalServices
            currentUser={currentUser}
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

        {/* STAGE TWO */}
        {rqstsDataById?.stepTask > 2 && (
          <div className="navigation-tabs-stage-two">
            <ul className="wrapper-tabs">
              {currentDepartmentStageTwo.map((e) => {
                return (
                  <li
                    key={e.id}
                    style={
                      {
                        "--percent-color": `${
                          getPercentStageValue(e, 2) === "50"
                            ? "#ff9800"
                            : "#41ff6f"
                        }`,
                        "--percent-width": `${getPercentStageValue(e, 2)}%`,
                      } as React.CSSProperties
                    } // Приведение типа
                    className={`tab percent-indicator ${
                      e?.state ? "active" : ""
                    }`}
                    onClick={() =>
                      handleTabClick(
                        e,
                        currentDepartmentStageTwo,
                        setCurrentDepartmentStageTwo
                      )
                    }
                  >
                    <p>{e.name}</p>
                    <p className="percent-title">
                      <ProgressBar
                        completed={
                          (Number(getPercentStageValue(e, 2)) / 100) *
                          currentDepartmentStageTwo.length
                        }
                        total={currentDepartmentStageTwo.length}
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

        {showDepartmentCustomerStageTwo && rqstsDataById?.stepTask > 2 && (
          <DepartmentCustomer
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            executor={uinfo}
            stageTwo={
              <div
                className="stage-title stage-indicator"
                style={
                  {
                    "--percent-stage-color": `${
                      calculateTotalPercent(2) === 0
                        ? "#ff4e4e"
                        : calculateTotalPercent(2) > 0 &&
                          calculateTotalPercent(2) < 100
                        ? "#ff9800"
                        : "#33c157"
                    }`,
                    "--percent-stage-height": `${calculateTotalPercent(2)}%`,
                  } as React.CSSProperties
                }
              >
                <p>
                  Этап 2 - выполнено:{" "}
                  <span
                    style={
                      {
                        "--percent-stage-color": `${
                          calculateTotalPercent(2) === 0
                            ? "#ff4e4e"
                            : calculateTotalPercent(2) > 0 &&
                              calculateTotalPercent(2) < 100
                            ? "#ff9800"
                            : "#33c157"
                        }`,
                      } as React.CSSProperties
                    }
                  >
                    {calculateTotalPercent(2)}%
                  </span>
                </p>
              </div>
            }
          />
        )}
        {showInformationSecurityStageTwo && rqstsDataById?.stepTask > 2 && (
          <InformationSecurity
            currentUser={currentUser}
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            executor={uinfo}
            stageTwo={
              <div
                className="stage-title stage-indicator"
                style={
                  {
                    "--percent-stage-color": `${
                      calculateTotalPercent(2) === 0
                        ? "#ff4e4e"
                        : calculateTotalPercent(2) > 0 &&
                          calculateTotalPercent(2) < 100
                        ? "#ff9800"
                        : "#33c157"
                    }`,
                    "--percent-stage-height": `${calculateTotalPercent(2)}%`,
                  } as React.CSSProperties
                }
              >
                <p>
                  Этап 2 - выполнено:{" "}
                  <span
                    style={
                      {
                        "--percent-stage-color": `${
                          calculateTotalPercent(2) === 0
                            ? "#ff4e4e"
                            : calculateTotalPercent(2) > 0 &&
                              calculateTotalPercent(2) < 100
                            ? "#ff9800"
                            : "#33c157"
                        }`,
                      } as React.CSSProperties
                    }
                  >
                    {calculateTotalPercent(2)}%
                  </span>
                </p>
              </div>
            }
          />
        )}

        {showTechnicalServicesStageTwo && rqstsDataById?.stepTask > 2 && (
          <TechnicalServices
            currentUser={currentUser}
            rqstsDataById={rqstsDataById}
            currentOrganization={currentOrganization}
            executor={uinfo}
            stageTwo={
              <div
                className="stage-title stage-indicator"
                style={
                  {
                    "--percent-stage-color": `${
                      calculateTotalPercent(2) === 0
                        ? "#ff4e4e"
                        : calculateTotalPercent(2) > 0 &&
                          calculateTotalPercent(2) < 100
                        ? "#ff9800"
                        : "#33c157"
                    }`,
                    "--percent-stage-height": `${calculateTotalPercent(2)}%`,
                  } as React.CSSProperties
                }
              >
                <p>
                  Этап 2 - выполнено:{" "}
                  <span
                    style={
                      {
                        "--percent-stage-color": `${
                          calculateTotalPercent(2) === 0
                            ? "#ff4e4e"
                            : calculateTotalPercent(2) > 0 &&
                              calculateTotalPercent(2) < 100
                            ? "#ff9800"
                            : "#33c157"
                        }`,
                      } as React.CSSProperties
                    }
                  >
                    {calculateTotalPercent(2)}%
                  </span>
                </p>
              </div>
            }
          />
        )}

        {/* STAGE THREE */}
        {rqstsDataById?.stepTask > 5 && (
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

        {showDepartmentCustomerStageThree && rqstsDataById?.stepTask > 5 && (
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
                  Этап 3 - выполнено:{" "}
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
                    Этап 3 - выполнено:{" "}
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

export default WorkSpaceChangeOfChiefAccountantAndManagement;
