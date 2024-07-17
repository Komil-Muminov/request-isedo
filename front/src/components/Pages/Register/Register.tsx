import "./Register.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { Loader } from "../../UI/Loader/Loader";
import { getRqsts, GetRqsts } from "../../API/GetRqsts";

export const Register: React.FC = () => {
	const columns: GridColDef<(typeof rows)[number]>[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "firstName",
			headerName: "First name",
			width: 150,
			editable: true,
		},
		{
			field: "lastName",
			headerName: "Last name",
			width: 150,
			editable: true,
		},
		{
			field: "age",
			headerName: "Age",
			type: "number",
			width: 110,
			editable: true,
		},
		{
			field: "fullName",
			headerName: "Full name",
			description: "This column has a value getter and is not sortable.",
			sortable: false,
			width: 160,
			valueGetter: (value, row) =>
				`${row.firstName || ""} ${row.lastName || ""}`,
		},
	];

	const rows = [
		{ id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
		{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
		{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
		{ id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
		{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
		{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
		{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
		{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
		{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
	];

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

	return (
		<>
			<section className="sections register__section">
				<div className="container">
					{/* Надо в таблице показать данные */}
					{rqstsData?.length > 0 ? (
						rqstsData.map((item) => (
							<>
								<p>{item.boname}</p>
								<p>{item.accountant}</p>
								<p>{item.desc}</p>
							</>
						))
					) : (
						<>{getRqsQuery.error?.message}</>
					)}

					<div className="register__content km__content">
						<p className="km__info-text">* РЕЕСТР ---</p>
						<p className="km__info-text">* Блок с фильтрами</p>
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
