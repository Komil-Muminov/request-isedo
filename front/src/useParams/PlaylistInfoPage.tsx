// // PlaylistPage.js
// import React from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import { PLAYLISTS } from "./data";

// export const PlaylistInfoPage = () => {
// 	const [searchParams, setSearchParams] = useSearchParams();

// 	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;
// 		searchParams.set(name, value.toLowerCase().trim());
// 		setSearchParams(searchParams);
// 	};

// 	const searchValueName = searchParams.get("name") || "";
// 	const searchValueGenre = searchParams.get("genre") || "";

// 	const filterByResult = PLAYLISTS.filter(
// 		(item) =>
// 			item.name.toLowerCase().includes(searchValueName.toLowerCase().trim()) &&
// 			item.name.toLowerCase().includes(searchValueGenre.toLowerCase().trim()),
// 	);

// 	return (
// 		<div>
// 			<h1>PlaylistPage useSearchParams</h1>
// 			<div>
// 				<input
// 					name="name"
// 					type="text"
// 					value={searchValueName}
// 					onChange={handleSearch}
// 					placeholder="Search by name"
// 				/>
// 				<input
// 					name="genre"
// 					type="text"
// 					value={searchValueGenre}
// 					onChange={handleSearch}
// 					placeholder="Search by genre"
// 				/>
// 			</div>
// 			{filterByResult.length > 0 ? (
// 				<>
// 					<p>Found: {filterByResult.length} playlists</p>
// 					{filterByResult.map((item) => (
// 						<div key={item.id}>
// 							<Link to={`/playlist/${item.id}`}>
// 								{item.name} - {item.genre}
// 							</Link>
// 						</div>
// 					))}
// 				</>
// 			) : (
// 				<p>No playlists found</p>
// 			)}
// 		</div>
// 	);
// };
