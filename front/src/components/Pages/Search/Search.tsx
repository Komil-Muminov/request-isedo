import "./Search.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
export const Search: React.FC<{ [key: string]: any }> = ({ rows }: any) => {
	const [search, setSearch] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	const filterByFirstName = rows.filter(
		(item) =>
			item.firstName && item.firstName.includes(search.toLowerCase().trim()),
	);

	return (
		<>
			<section className="sections search__section">
				<div className="container">
					<h2 className="sections__title search_title">Search component</h2>
					<div className="km__content search_content">
						<Box
							component="form"
							sx={{
								"& .MuiTextField-root": { m: 1, width: "25ch" },
							}}
							noValidate={false}
							autoComplete="off"
						>
							<TextField
								id="standard-search"
								label="Поиск..."
								type="search"
								onChange={handleChange}
								variant="standard"
							/>
						</Box>
					</div>
					{filterByFirstName.map((item) => (
						<Link key={item.id} to="/">
							{item.firstName}
						</Link>
					))}
				</div>
			</section>
		</>
	);
};
