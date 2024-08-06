import "./Register.css";
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { getRqsts, GetRqsts } from "../../API/GetRqsts";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TuneIcon from "@mui/icons-material/Tune";

export const Register: React.FC = () => {
  const getRqsQuery = useQuery(
    {
      queryFn: () => getRqsts(),
      queryKey: ["requests"],
    },
    queryClient
  );

  const [rqstsData, setRqstsData] = useState<GetRqsts[]>([]);

  useEffect(() => {
    if (getRqsQuery.status === "success") {
      setRqstsData(getRqsQuery.data);
    }
  }, [getRqsQuery.status === "success", rqstsData]);

  const rows = rqstsData.map((e) => {
    return {
      id: e.id,
      type: e.orgname,
      applicant: e.accountant,
      organization: e.desc,
      date: e.desc,
      status: e.desc,
    };
  });

  const colors: any = {
    Pending: "blue",
    Approved: "green",
    Rejected: "red",
    OnHold: "orange",
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
              padding: "0 10px",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "35px",
              maxWidth: "100px",
              width: "100%",
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
      <section className="sections register__section">
        <div className="container">
          <div className="register__content">
            {/* <p className="km__info-text">* Блок с фильтрами</p>
						<p className="km__info-text">* РЕЕСТР ---</p> */}
            <div className="panel-control">
              <div className="filter-and-add">
                <Button variant="contained" sx={{ display: "flex", gap: 1 }}>
                  <TuneIcon />
                  <p>Фильтр</p>
                </Button>
                <Link
                  to={"/addrequest"}
                  className="btn addrequest_btn"
                  type="btn submit_btn register_add-btn"
                  onClick={() => console.log(`Переход`)}
                >
                  <NoteAddIcon />
                  <p> Добавить</p>
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
                  sx={{
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
