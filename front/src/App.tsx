// App.tsx
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "./components/UI/Loader/Loader";
import { Navigation } from "./components/Pages/Navigation/Navigation";

// Ленивые загрузки компонентов
const LazyAuthPage = lazy(() => import("./components/Pages/Auth/Auth/Auth"));
const LazyUserProfile = lazy(
	() => import("./components/Pages/UProfile/Profile"),
);
const LazyAccount = lazy(() => import("./components/Pages/Account/Account"));
const LazyAddRequest = lazy(
	() => import("./components/Pages/AddRequest/AddRequest"),
);
const LazyShowRequest = lazy(
	() => import("./components/Pages/ShowRequest/ShowRequest"),
);
const LazyMfrqst = lazy(() => import("./components/Pages/Mfrqst/Mfrqst"));
const LazyIdentification = lazy(
	() => import("./components/Pages/Identification/Identification"),
);
const LazyUnotify = lazy(
	() => import("./components/Pages/ReqUidentity/ReqUidentity"),
);
const LazyUdetails = lazy(
	() => import("./components/Pages/UProfile/Udetails/Udetails"),
);
const LazyDetailsPage = lazy(
	() => import("./components/Pages/UProfile/DetailsPage.tsx/ModulsDetails"),
);
const LazyErrorPage = lazy(
	() => import("./components/Pages/ErrorPage/ErrorPage"),
);

function App() {
	return (
		<>
			<header>
				<Navigation />
			</header>
			<main className="main">
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route path="*" element={<LazyErrorPage />} />
						<Route path="/" element={<LazyAuthPage />} />
						<Route path="auth" element={<LazyAuthPage />} />
						<Route path="/account/*" element={<LazyAccount />} />
						<Route path="/uprofile/*" element={<LazyUserProfile />}>
							<Route path="unotify" element={<LazyUnotify />} />
							<Route path="udetails" element={<LazyUdetails />} />
							<Route path="uidentity" element={<LazyIdentification />} />
							<Route path="details/:page" element={<LazyDetailsPage />} />
							{/* Добавьте маршруты для саблинков, если они у вас есть */}
						</Route>
						<Route path="/account/create" element={<LazyAddRequest />} />
						<Route path="/account/show/:id" element={<LazyShowRequest />} />
						<Route path="/mfrqst" element={<LazyMfrqst />} />
					</Routes>
				</Suspense>
			</main>
		</>
	);
}

export default App;
