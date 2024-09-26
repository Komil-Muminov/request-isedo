import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { getRqsts, GetRqstsType } from "../../API/GetRqsts";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TuneIcon from "@mui/icons-material/Tune";
import { useNavigate } from "react-router-dom";
import { GetMeType, useAuth } from "../../API/Hooks/useAuth";
import "./Register.css";
import { Loader } from "../../UI/Loader/Loader";
import { stepsOfBo, stepsOfKvd } from "../../API/Data/Steps/Steps";
import { getUsers, TGetUsers } from "../../API/GetUsers";

export const Register: React.FC = () => {
  const getRqsQuery = useQuery(
    {
      queryFn: () => getRqsts(),
      queryKey: ["requests"],
    },
    queryClient
  );

  const [rqstsData, setRqstsData] = useState<GetRqstsType[]>([]);

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

  if (uQuery.status === "pending") return <Loader />;
  if (uQuery.status === "error") {
    console.log(uQuery.error, usersQuery.error);
    return null;
  }

  const steps =
    uinfo?.uType === "kvd"
      ? stepsOfKvd
      : uinfo?.uType === "bo"
      ? stepsOfBo
      : [];

  // Фильтруем заявки только для пользователей с типом 'kvd' и статусом 'Исполнение'
  const filteredRqsts = rqstsData.filter(
    (e) => uinfo?.uType !== "kvd" || e.stepCode === 1
  );

  const rows = filteredRqsts.map((e) => {
    const stepFound = steps.find((step) => step.stepCode === e.stepCode);
    const organizationRequest = users?.find((user) => user.id === e.userId);

    return {
      id: e.id,
      type: e.reqType,
      applicant: organizationRequest?.fullName,
      organization: organizationRequest?.orgName,
      date: e.dateTime,
      status: stepFound ? stepFound.stepName : "Неизвестный статус",
    };
  });

  const colors: any = {
    ["Оформление"]: "gray",
    ["Исполнение"]: "#e69600",
    ["Завершено"]: "green",
    ["Неизвестный статус"]: "red",
  };

  const columns: GridColDef[] = [
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
      renderCell: (params) => {
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

  // Добавляем Link в каждый лист таблицы
  const handleRowClick = (params: any) => {
    navigate(`/account/show/${params.row.id}`);
  };

  useEffect(() => {
    if (getRqsQuery.status === "success") {
      setRqstsData(getRqsQuery.data);
    }
  }, [getRqsQuery]);

  const { getMe } = useAuth();
  const uTypeQuery = useQuery(
    {
      queryFn: () => getMe(),
      queryKey: ["registerGetMe"],
    },
    queryClient
  );
  const navigate = useNavigate();
  return (
    <>
      <section className="sections register__section">
        <div className="container">
          <div className="register__content">
            {/* <p className="km__info-text">* Блок с фильтрами</p>
						<p className="km__info-text">* РЕЕСТР ---</p> */}
            <div className="panel-control-register">
              <div className="filter-and-add">
                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    gap: 1,
                    backgroundColor: "#607d8b",
                    "&:hover": {
                      backgroundColor: "#516874",
                    },
                  }}
                >
                  <TuneIcon />
                  <p>Фильтр</p>
                </Button>
                <Link
                  to={"/account/create"}
                  type="btn submit_btn register_add-btn"
                  onClick={() => console.log(`Переход`)}
                >
                  <Button
                    variant="contained"
                    className={
                      uTypeQuery.data?.uType === "kvd" ? "utype_hidden" : ""
                    }
                    sx={{
                      display: "flex",
                      gap: "5px",
                      backgroundColor: "#607d8b",
                      "&:hover": {
                        backgroundColor: "#516874",
                      },
                    }}
                  >
                    <NoteAddIcon />
                    <p>Добавить</p>
                  </Button>
                </Link>
              </div>
            </div>
            {/* <Search rows={rows} /> */}
            <Box
              sx={{
                // height: 250,
                width: "100%",
                backgroundColor: "#fff",
                border: "2px solid #ededed",
                borderRadius: "40px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <DataGrid
                  columns={columns}
                  rows={rows}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[10]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  getRowClassName={() => "pointer-cursor"}
                  onRowClick={handleRowClick}
                  sx={{
                    minHeight: "180px",
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontWeight: "bold",
                    },
                  }}
                />
              </Box>
            </Box>
          </div>
        </div>
      </section>
    </>
  );
};
