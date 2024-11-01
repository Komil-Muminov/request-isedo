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
import PercentIndicator from "../Percent Indicator/PercentIndicator";
import { getCertificates, TCertificates } from "../../API/GetCertificates";
import { getVPN, TVPN } from "../../API/GetVPN";

const WorkSpace = ({
  currentUser,
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

  // useEffect(() => {
  //   if (rqstsDataById?.services.length > 0) {
  //     setCurrentDepartmentStageOne((prevDepartments) => {
  //       // Проверяем, уже добавлен ли департамент
  //       const isDepartmentAdded = prevDepartments.some(
  //         (dept) => dept.id === departments[3].id
  //       );
  //       if (!isDepartmentAdded) {
  //         return [...prevDepartments, departments[3]];
  //       }
  //       return prevDepartments; // Возвращаем предыдущее состояние, если департамент уже есть
  //     });
  //   }
  // }, [rqstsDataById?.services]);

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

  const getPercent = (item: any) => {
    if (
      (item?.name === "Шуъба оид ба кор бо муштариён" &&
        getCertificateUser?.statusCode === 5) ||
      (item?.name === "Шуъба оид ба амнияти иттилоотӣ" &&
        currentUser?.status === false) ||
      (item?.name === "Шуъба оид ба хизматрасонии техникӣ" &&
        currentVPN?.status === false)
    ) {
      return "100";
    }
    return "0";
  };

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
                  {/* <>
                    <PercentIndicator percent={getPercent(e)} />
                  </> */}
                  <p className="percent-title">33%</p>
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
                data-content="100% - Этап 1"
              ></div>
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
                data-content="100% - Этап 1"
              ></div>
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
                data-content="100% - Этап 1"
              ></div>
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
                    className={`tab ${e?.state ? "active" : ""}`}
                    onClick={() =>
                      handleTabClick(
                        e,
                        currentDepartmentStageTwo,
                        setCurrentDepartmentStageTwo
                      )
                    }
                  >
                    {e.name}
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
              <div className="stage-title second-stage">
                <p>Этап 2</p>
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
              <div className="stage-title second-stage">
                <p>Этап 2</p>
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
              <div className="stage-title second-stage">
                <p>Этап 2</p>
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
                    className={`tab ${e?.state ? "active" : ""}`}
                    onClick={() =>
                      handleTabClick(
                        e,
                        currentDepartmentStageThree,
                        setCurrentDepartmentStageThree
                      )
                    }
                  >
                    {e.name}
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
              <div className="stage-title third-stage">
                <p>Этап 3</p>
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
