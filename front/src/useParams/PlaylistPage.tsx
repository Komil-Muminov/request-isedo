// // PlaylistInfoPage.js
// import { Link, useParams } from "react-router-dom";
// import { PLAYLISTS } from "./data";
// export const PlaylistPage = () => {
// 	const { playlistId } = useParams();
// 	const playlist = PLAYLISTS.find((p) => p.id === Number(playlistId));

// 	if (!playlist) {
// 		return <div>Playlist not found!</div>;
// 	}

// 	return (
// 		<div>
// 			<h1>Playlist Info</h1>
// 			<p>Name: {playlist.name}</p>
// 			<p>Name: {playlist.genre}</p>

// 			<Link to={`/playlist?name=${playlist.name.toLowerCase()}`}>
// 				See more {playlist.name} playlists
// 			</Link>
// 		</div>
// 	);
// };
