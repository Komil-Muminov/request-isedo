import { NavBottom } from "../NavBottom/NavBottom";
import { Region } from "../Region/Region";
import { Register } from "../Register/Register";
import { ZayavkiLinks } from "../ZayavkiLinks/ZayavkiLink";
import { useQuery } from "@tanstack/react-query";
// import { Routes, Route } from "react-router-dom";
const Account = () => {
	const querMe=useQuery({
		
	})
	return (
		<>
			<NavBottom />
			<ZayavkiLinks />
			<Region />
			<Register />
		</>
	);
};

export default Account;
