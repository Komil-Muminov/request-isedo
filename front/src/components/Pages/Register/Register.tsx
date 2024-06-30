import "./Register.css";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ButtonKM } from "../../UI/Button/ButtonKM";
import { Search } from "../Search/Search";
// import { SelectChangeEvent } from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

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
	return (
		<>
			<section className="sections register__section">
				<div className="container">
					<div className="register__content km__content">
						<p className="km__info-text">* РЕЕСТР</p>
						<p className="km__info-text">* Блок с фильтрами</p>
						<ButtonKM
							type="btn submit_btn register_add-btn"
							onClick={() => console.log(`Переход`)}
						>
							Добавить
						</ButtonKM>
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
