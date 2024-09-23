// import { Outlet, useParams } from "react-router-dom";
// import { Suspense, lazy } from "react";
// import { LoaderPoints } from "../../../../UI/LoaderPoints";

// const DashboardChart = lazy(() => import("../Dashboard/DashboardChart"));
// const Barchart = lazy(() => import("../Barchart/Barchart"));

// const UchartDetails: React.FC = () => {
// 	const { chart } = useParams<{ chart: string }>();

// 	const renderChartComponent = () => {
// 		switch (chart) {
// 			case "dashboard":
// 				return <DashboardChart />;
// 			case "barchart":
// 				return <Barchart />;
// 			default:
// 				return <div>Выберите график</div>;
// 		}
// 	};

// 	return (
// 		<div className="uchart__details">
// 			<h2 className="uchart__details">UchartDetails</h2>
// 			<p className="uchart__details_desc">
// 				Здесь будут разные графики исходя из выбора пользователя
// 			</p>
// 			<Outlet />
// 		</div>
// 	);
// };

// export default UchartDetails;
