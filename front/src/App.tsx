import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Pages/Navigation/Navigation";
import { Suspense, lazy } from "react";
import { Loader } from "./components/UI/Loader";

const LazyRegistrationPage = lazy(
	() => import("./components/Pages/Auth/Registration.tsx/Registarion"),
);

const LazyAccount = lazy(() => import("./components/Pages/Account/Account"));

const LazyErrorPage = lazy(
	() => import("./components/Pages/ErrorPage/ErrorPage"),
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
					<Route path="*" element={<LazyErrorPage />} />
					<Route path="/" element={<LazyAccount />} />
					<Route path="/auth" element={<LazyAuthPage />} />
					<Route path="/auth" element={<LazyAuthPage />} />
					<Route path="authorization" element={<LazyAuthorizationPage />} />
					<Route path="registration" element={<LazyRegistrationPage />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
