import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, useLocation, useParams } from "react-router-dom";
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

export const Register = ({ rows, columnsOfModules }: any) => {
  console.log(columnsOfModules);

  const columns: any = columnsOfModules;

  const location = useLocation();

  console.log(location);

  // Добавляем Link в каждый лист таблицы
  const handleRowClick = (params: any) => {
    navigate(`${location.pathname}/show/${params.row.id}`);
  };

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
                  to={`${location.pathname}/create`}
                  type="btn submit_btn register_add-btn"
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
