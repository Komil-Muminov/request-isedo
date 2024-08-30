import { Outlet } from "react-router-dom";
import { NavBottom } from "../NavBottom/NavBottom";
import { Register } from "../Register/Register";

const Account: React.FC = () => {
	return (
		<>
			<NavBottom />
			<Register />
			<Outlet />
		</>
	);
};

export default Account;
