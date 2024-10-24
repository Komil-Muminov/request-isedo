import { Outlet } from "react-router-dom";
import { NavBottom } from "../NavBottom/NavBottom";
import { Register } from "../Register/Register";
import { useQuery } from "@tanstack/react-query";
import { getRqsts, GetRqstsType } from "../../API/GetRqsts";
import { queryClient } from "../../../queryClient";
import { useEffect, useState } from "react";
import { getUsers, TGetUsers } from "../../API/GetUsers";
import { GetMeType } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader/Loader";
import { stepsOfBo, stepsOfKvd } from "../../API/Data/Steps/Steps";
import { useAuth } from "../../API/Hooks/useAuth";

const Account: React.FC = () => {
  const { getMe } = useAuth();

  const [rqstsData, setRqstsData] = useState<GetRqstsType[]>([]);

  const getRqsQuery = useQuery(
    {
      queryFn: () => getRqsts(),
      queryKey: ["requests"],
    },
    queryClient
  );

  useEffect(() => {
    if (getRqsQuery.status === "success") {
      setRqstsData(getRqsQuery.data);
    }
  }, [getRqsQuery]);

  // GET USERS

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

  // GET User By Id
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

  const steps =
    uinfo?.uType === "kvd"
      ? stepsOfKvd
      : uinfo?.uType === "bo"
      ? stepsOfBo
      : [];

  const filteredRqsts = Array.isArray(rqstsData)
    ? rqstsData.filter(
        (e: any) =>
          (uinfo?.uType !== "kvd" && uinfo?.userId === e.userId) ||
          e.stepCode > 0
      )
    : [];

  const rows =
    filteredRqsts &&
    filteredRqsts?.map((e: any) => {
      const stepFound = steps.find((step: any) => step.stepCode === e.stepCode);

      const organizationRequest = users?.find(
        (user: any) => user.id === e.userId
      );

      return {
        id: e.id,
        type: e.reqType,
        applicant: organizationRequest?.fullName,
        organization: organizationRequest?.orgName,
        date: e.dateTime,
        status: stepFound ? stepFound.stepName : "Неизвестный статус",
      };
    });

  if (uQuery.status === "pending") return <Loader />;
  if (uQuery.status === "error") {
    console.log(uQuery.error, usersQuery.error);
    return null;
  }

  const colors: any = {
    ["Оформление"]: "gray",
    ["Исполнение"]: "#e69600",
    ["Завершено"]: "green",
    ["Неизвестный статус"]: "red",
  };

  const requestHeaderName = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "type", headerName: "Тип", width: 150, editable: false },
    {
      field: "applicant",
      headerName: "Заявитель",
      width: 150,
      editable: false,
    },
    {
      field: "organization",
      headerName: "Организация",
      width: 150,
      editable: false,
    },
    { field: "date", headerName: "Дата", width: 110, editable: false },
    {
      field: "status",
      headerName: "Статус",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      flex: 1,
      cellClassName: "custom-cell", // Примените CSS-класс к ячейкам этого столбца
      renderCell: (params: any) => {
        const color = colors[params.value] || "gray"; // Цвет по умолчанию, если статус не найден
        return (
          <div
            style={{
              backgroundColor: color,
              color: "white",
              padding: "0 15px",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "35px",
            }}
          >
            {params.value}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <NavBottom />
      <Register rows={rows} columnsOfModules={requestHeaderName} />
      <Outlet />
    </>
  );
};

export default Account;
