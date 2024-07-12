import { NavBottom } from "../NavBottom/NavBottom";
import { Region } from "../Region/Region";
import { Register } from "../Register/Register";
import { ZayavkiLinks } from "../ZayavkiLinks/ZayavkiLink";

const Account: React.FC = () => {
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
