import { NavBottom } from "../NavBottom/NavBottom";
import { Region } from "../Region/Region";
import { Register } from "../Register/Register";
import { ZayavkiLinks } from "../ZayavkiLinks/ZayavkiLink";

import { LogType } from "../../API/Hooks/useAuth";

const Account: React.FC<LogType> = () => {
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
