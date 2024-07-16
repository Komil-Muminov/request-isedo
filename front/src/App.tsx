import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Pages/Navigation/Navigation";
import { Suspense, lazy } from "react";
import { Loader } from "./components/UI/Loader/Loader";
// import AddRequest from "./components/Pages/AddRequest/AddRequest";
// ------------------------------------------------------

// const LazyRegistrationPage = lazy(
// 	() => import("./components/Pages/Auth/Registration.tsx/Registarion"),
// );
// const LazyAuthorizationPage = lazy(
// 	() => import("./components/Pages/Auth/Authorization/Authorization"),
// );

// ------------------------------------------------------
const LazyAuthPage = lazy(() => import("./components/Pages/Auth/Auth/Auth"));
const LazyUserProfile = lazy(
	() => import("./components/Pages/UserProfile/Profile"),
);
const LazyAccount = lazy(() => import("./components/Pages/Account/Account"));
const LazyErrorPage = lazy(
	() => import("./components/Pages/ErrorPage/ErrorPage"),
);
const LazyAddRequest = lazy(
	() => import("./components/Pages/AddRequest/AddRequest"),
);
function App() {
	return (
		<>
			<Navigation />
			<Suspense fallback={<div>{<Loader />}</div>}>
				<Routes>
					<Route path="*" element={<LazyErrorPage />} />
					<Route path="/" element={<LazyAuthPage />} />
					<Route path="auth" element={<LazyAuthPage />} />
					<Route path="account" element={<LazyAccount />} />
					<Route path="uprofile" element={<LazyUserProfile />} />
					<Route path="addrequest" element={<LazyAddRequest />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
