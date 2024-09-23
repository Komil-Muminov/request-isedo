import { Outlet } from "react-router-dom";
import { NavBottom } from "../NavBottom/NavBottom";
import { Register } from "../Register/Register";
import WebToolBox from "../../UI/WebTool/WebToolBox";

const Account: React.FC = () => {
	return (
		<>
			<NavBottom />
			<Register />
			<Outlet />
			<WebToolBox />
		</>
	);
};

export default Account;
