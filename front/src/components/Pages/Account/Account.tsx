import { NavBottom } from "../NavBottom/NavBottom";
import { Region } from "../Region/Region";
import { Register } from "../Register/Register";
import { ZayavkiLinks } from "../ZayavkiLinks/ZayavkiLink";
// import { Routes, Route } from "react-router-dom";
const Account = () => {
	return (
		<>
			<section className="sections">
				<div className="container">
					<div className="account__content">
						<NavBottom />
						<ZayavkiLinks />
						<Region />
						<Register />
					</div>
				</div>
			</section>
		</>
	);
};

export default Account;
