import { NavBottom } from "../NavBottom/NavBottom";
import { Region } from "../Region/Region";
import { Register } from "../Register/Register";
import { ZayavkiLinks } from "../ZayavkiLinks/ZayavkiLink";

import { LogType } from "../../Hooks/useAuth";

import { Navigation } from "../Navigation/Navigation";
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
