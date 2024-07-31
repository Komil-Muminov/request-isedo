import "./Register.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { getRqsts, GetRqsts } from "../../API/GetRqsts";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

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
      lastName: e.orgname,
      firstName: e.accountant,
      age: e.desc,
    };
  });

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "№", width: 90 },
    {
      field: "firstName",
      headerName: "Дата",
      width: 150,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Тип",
      width: 150,
      editable: false,
    },
    {
      field: "age",
      headerName: "Исполнитель",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "fullName",
      headerName: "Регион",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  return (
    <>
      <section className="sections register__section">
        <div className="container">
          <div className="register__content">
            {/* <p className="km__info-text">* Блок с фильтрами</p>
						<p className="km__info-text">* РЕЕСТР ---</p> */}
            <Link
              to={"/addrequest"}
              className="btn addrequest_btn"
              type="btn submit_btn register_add-btn"
              onClick={() => console.log(`Переход`)}
            >
              <AddCircleOutlineOutlinedIcon />
              <p> Добавить</p>
            </Link>
            {/* <Search rows={rows} /> */}
            <Box
              sx={{
                height: 400,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "40px",
              }}
            >
              <DataGrid
                columns={columns}
                rows={rows}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </div>
        </div>
      </section>
    </>
  );
};
