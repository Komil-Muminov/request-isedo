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
      type: e.orgname,
      applicant: e.accountant,
      organization: e.desc,
      date: e.desc,
      status: e.desc,
    };
  });

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "№", width: 90 },
    {
      field: "type",
      headerName: "Тип",
      width: 150,
      editable: false,
    },
    {
      field: "applicant",
      headerName: "Заявитель",
      width: 150,
      editable: false,
    },
    {
      field: "organization",
      headerName: "Организация",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "date",
      headerName: "Дата",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "status",
      headerName: "Статус",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 110,
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
                // height: 250,
                width: "100%",
                backgroundColor: "#fff",
                border: "2px solid #ededed",
                borderRadius: "40px",
                overflow: "hidden", // Добавьте это, чтобы границы применялись к контенту внутри Box
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
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  getRowClassName={() => "pointer-cursor"}
                />
              </Box>
            </Box>
          </div>
        </div>
      </section>
    </>
  );
};
