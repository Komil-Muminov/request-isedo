import "./App.css";
import { Routes, Route } from "react-router-dom";
import Registration from "./components/Pages/Auth/Registration.tsx/Registarion";
import Authorization from "./components/Pages/Auth/Authorization/Authorization";
import Auth from "./components/Pages/Auth/Auth/Auth";
import { Navigation } from "./components/Pages/Navigation/Navigation";
import { Suspense, lazy } from "react";
import { Loader } from "./components/UI/Loader";
import { NavBottom } from "./components/Pages/NavBottom/NavBottom";
import { ZayavkiLinks } from "./components/Pages/ZayavkiLinks/ZayavkiLink";
import { Region } from "./components/Pages/Region/Region";
import { Register } from "./components/Pages/Register/Register";
import { Search } from "./components/Pages/Search/Search";

const LazyRegistrationPage = lazy(
	() => import("./components/Pages/Auth/Registration.tsx/Registarion"),
);
const LazyAuthorizationPage = lazy(
	() => import("./components/Pages/Auth/Authorization/Authorization"),
);
const LazyAuthPage = lazy(() => import("./components/Pages/Auth/Auth/Auth"));

function App() {
	return (
		<>
			<Navigation />
			<Suspense fallback={<div>{<Loader />}</div>}>
				<Routes>
					<Route path="*" element={<LazyAuthPage />} />
					<Route path="auth" element={<Auth />} />
					<Route path="authorization" element={<LazyAuthorizationPage />} />
					<Route path="registration" element={<LazyRegistrationPage />} />
					<Route path="authorization" element={<Authorization />} />
				</Routes>
			</Suspense>
			{/* <NavBottom />
			<ZayavkiLinks />
			<Region />
			<Register /> */}
		</>
	);
}

export default App;
