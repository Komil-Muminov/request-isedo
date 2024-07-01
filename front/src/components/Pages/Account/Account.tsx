import { NavBottom } from "../NavBottom/NavBottom";
import { Region } from "../Region/Region";
import { Register } from "../Register/Register";
import { ZayavkiLinks } from "../ZayavkiLinks/ZayavkiLink";
import { useQuery } from "@tanstack/react-query";
import { RegType, useAuth } from "../../Hooks/useAuth";
import { LogType } from "../../Hooks/useAuth";
import { queryClient } from "../../../queryClient";
import { Loader } from "../../UI/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
import Auth from "../Auth/Auth/Auth";
import { Navigation } from "../Navigation/Navigation";
// import { Routes, Route } from "react-router-dom";
const Account: React.FC<LogType> = ({ username, password }) => {
	return (
		<>
			<Navigation username={username} />
			<NavBottom />
			<ZayavkiLinks />
			<Region />
			<Register />
		</>
	);
};

export default Account;
