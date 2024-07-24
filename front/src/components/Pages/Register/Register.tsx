import "./Register.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { getRqsts, GetRqsts } from "../../API/GetRqsts";
import { Logout } from "@mui/icons-material";
import { logout } from "../../API/Logout";
import Auth from "../Auth/Auth/Auth";

export const Register: React.FC = () => {
	const getRqsQuery = useQuery(
		{
			queryFn: () => getRqsts(),
			queryKey: ["requests"],
		},
		queryClient,
	);

	const [rqstsData, setRqstsData] = useState<GetRqsts[]>([]);
	useEffect(() => {
		if (getRqsQuery.status === "success") {
			// setData((prev) => [...prev, ...getRqsQuery.data]);
			setRqstsData(getRqsQuery.data);
		}
	}, [getRqsQuery.data, setRqstsData]);

	const rows = rqstsData.map((e) => {
		return {
			id: e.id,
			lastName: e.boname,
			firstName: e.accountant,
			age: e.desc,
		};
	});

	const columns: GridColDef<(typeof rows)[number]>[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "firstName",
			headerName: "First name",
			width: 150,
			editable: false,
		},
		{
			field: "lastName",
			headerName: "Last name",
			width: 150,
			editable: false,
		},
		{
			field: "age",
			headerName: "Age",
			type: "number",
			width: 110,
			editable: false,
		},
		{
			field: "fullName",
			headerName: "Full name",
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
					<div className="register__content km__content">
						<p className="km__info-text">* Блок с фильтрами</p>
						<p className="km__info-text">* РЕЕСТР ---</p>
						<Link
							to={"/addrequest"}
							className="btn addrequest_btn"
							type="btn submit_btn register_add-btn"
							onClick={() => console.log(`Переход`)}
						>
							Добавить
						</Link>
						{/* <Search rows={rows} /> */}
						<Box sx={{ height: 400, width: "100%" }}>
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
