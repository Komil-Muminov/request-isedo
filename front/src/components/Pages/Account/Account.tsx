import { NavBottom } from "../NavBottom/NavBottom";
import { Region } from "../Region/Region";
import { Register } from "../Register/Register";
import { ZayavkiLinks } from "../ZayavkiLinks/ZayavkiLink";
import { Routes, Route, Link } from "react-router-dom";

const Account: React.FC = () => {
	return (
		<>
			<ZayavkiLinks />
			<NavBottom />
			<Region />
			<Register />
		</>
	);
};

export default Account;
